const util = require("../tools/util.js");
const fs_builtin = require("fs");
const https_builtin = require("https");
const http = require("../tools/http.js");
const structure = require("../tools/structure.js");
const crypto_builtin = require("crypto");

// @OBS
// for testing Openssl must be of version 1.1.1q
// rejectUnautorized must be set to false
// download qrcode npm





// @DONE
function AOS_index_of(array, property, value) {
    for (let i=0; i < array.length; i++) {
        if (array[i] === null) { continue; }
        if (array[i][property] === value) {
            return i;
        }
    }
    return -1;
} 

// @DONE
function bankid_result() {
    return {
        done: 0,
        fail: 0,
        data: "",
        parsed: {}
    }
}

// @DONE
function auth_options(data) {
    return {
        host: "appapi2.bankid.com",
        path: "/rp/v5.1/auth",
        rejectUnauthorized: false,
        pfx: fs_builtin.readFileSync("../documents/cert.p12"),
        passphrase: "8YDa=A<y>u9ivAmA",
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(JSON.stringify(data))
        }
    }
}



// @DONE
function collect_options(data) {
    return {
        host: "appapi2.bankid.com",
        path: "/rp/v5.1/collect",
        rejectUnauthorized: false,
        pfx: fs_builtin.readFileSync("../documents/cert.p12"),
        passphrase: "8YDa=A<y>u9ivAmA",
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(JSON.stringify(data))
        }
    }
}


// @DONE
async function bankid_request(options, data, result) {

    result.done = 0;
    result.fail = 0;
    result.data = "";
    result.parsed = {};

    let req = https_builtin.request(options, function (res) {
        
        res.setEncoding("utf-8");
        res.on('data', function (d) {
            result.data += d.toString();
        });

        res.on('end', function () {
            result.done = 1;
            return;
        });
    });

    req.on('error', function (e) {
        result.fail = 1;
        //console.log(e);
        return
    });
    
    if (options.method === "POST") { req.write(JSON.stringify(data)); }
    req.end();

    let error = { message: "" };
    error.message = "fail";
    await util.wait(result, error);
}





// @DONE
async function _auth(context, index, result) {

    let text = await fs_builtin.promises.readFile("../documents/avtal.txt");
    let buff = new Buffer.from(text);
    let text64 = buff.toString("base64");

    let data = {
        endUserIp: context.orders.data[index].ip,
        userVisibleData: text64
    }

    await bankid_request(auth_options(data), data, result);
    result.parsed = JSON.parse(result.data);
    return;
}






// @DONE
async function _autostart(context, index, result) {

    let collect_message = {
        orderRef: context.orders.data[index].orderRef
    }

    let timer = 0.0;
    let prev_time = performance.now();

    let collect = bankid_result();
    let collect_poll = setInterval(() => {

        let time = performance.now();
        timer += (time - prev_time);

        if (result.done === 1) { clearInterval(collect_poll); }
        bankid_request(collect_options(collect_message), collect_message, collect).then(() => {
            collect.parsed = JSON.parse(collect.data);
            
            // COMPLETE
            if (collect.parsed.status === "complete") { 
                result.parsed = collect.parsed;
                result.done = 1; 
                clearInterval(collect_poll); 
            }

            // FAILED
            if (collect.parsed.status === "failed") {
                result.parsed = collect.parsed;
                result.done = 1;
                clearInterval(collect_poll); 
            }

            // TIMEOUT
            if ((timer / 1000) > 7) {
                result.parsed = collect.parsed;
                result.parsed.status = "timeout";
                result.done = 1;
                clearInterval(collect_poll);
            }
        })

        prev_time = time;

    }, 2000);

    return util.wait(result, { message: ""});
}




// @DONE
function _response(context, incoming, result, remove_order=false) {
    
    if (remove_order) { context.orders.data[result.index].complete = true; }
    
    incoming.result = JSON.stringify(result);
    incoming.response.writeHead(200, {
        'Content-Length': Buffer.from(incoming.result).length,
        'Content-Type': "application/json"
    });
}


























// @
async function route(context, incoming) { 

    let parts = util.parts(incoming.url, "/");
    let orders = context.orders.data;



    // AUTH
    if (parts[1] === "auth" && incoming.method === "POST" && parts.length === 2) {

        // CREATE RESULT
        let result = {
            index: 0,
            timer: 0.0,
            status: "",
            orderRef: "",
            autoStartToken: ""
        }

        // CHECK IP
        let ip = incoming.request.headers['x-forwarded-for'] || incoming.request.socket.remoteAddress;
        let i = AOS_index_of(orders, "ip", ip);
        if ( i !== -1) {
            result.status = "busy";
            result.timer = context.timeout - Math.round(orders[i].timer / 1000); 
            return _response(context, incoming, result); 
        }

        // CREATE ORDER
        let current = await structure.buffer_add({
            complete: false,
            timer: 0.0,
            ip: ip,
            orderTime: 0,
            orderRef: "",
            autoStartToken: "",
            qrStartToken: "",
            qrStartSecret: "",
            result: {}
        }, context.orders);

        result.index = current;
        
        // SEND AUTH REQUEST
        let auth = bankid_result();
        await _auth(context, current, auth);

        if ("errorCode" in auth.parsed) {
            //console.log(auth.parsed.errorCode);
            result.status = "failed";
            return _response(context, incoming, result, true); 
        }     

        // UPDATE ORDER
        orders[current].orderTime = performance.now();
        orders[current].orderRef = auth.parsed.orderRef;
        orders[current].autoStartToken = auth.parsed.autoStartToken;
        orders[current].qrStartToken = auth.parsed.qrStartToken;
        orders[current].qrStartSecret = auth.parsed.qrStartSecret;

        // UPDATE RESULT
        result.status = "autostart";
        result.orderRef = orders[current].orderRef;
        result.autoStartToken = orders[current].autoStartToken;


        return _response(context, incoming, result); 
    }











    // AUTOSTART
    if (parts[1] === "autostart" && incoming.method === "POST" && parts.length === 2) {
        
        // CREATE RESULT
        let result = {
            index: 0,
            timer: 0.0,
            status: "",
            orderRef: "",
        }

        // CHECK ORDER REF
        let data = JSON.parse(incoming.data);
        if ("orderRef" in data === false) { 
            result.status = "failed";
            return _response(context, incoming, result);
        }
        let i = AOS_index_of(orders, "orderRef", data.orderRef);
        if ( i === -1) {
            //console.log("OrderRef does not exist."); 
            result.status = "failed"; 
            return _response(context, incoming, result); 
        }

        result.index = data.index;
        result.timer = data.timer;
        result.orderRef = data.orderRef;

        // COLLECT SIGN STATUS / 2.s
        let collect_result = bankid_result();
        await _autostart(context, result.index, collect_result);

        if (collect_result.parsed.status === "failed") {
            result.status = "failed";
            return _response(context, incoming, result, true); 
        }

        if (collect_result.parsed.status === "complete") {
            result.status = "complete"; 
            orders[result.index].result = collect_result.parsed.completionData;
        }

        if (collect_result.parsed.status === "timeout") { 
            result.status = "qr"; 
        }
        
        _response(context, incoming, result);
    }   












    
    // QR
    if (parts[1] === "qr" && incoming.method === "POST" && parts.length === 2) {


        // CREATE RESULT
        let result = {
            index: 0,
            timer: 0.0,
            status: "",
            orderRef: "",
            qr: ""
        }

        // CHECK ORDER REF
        let data = JSON.parse(incoming.data);
        if ("orderRef" in data === false) { 
            result.status = "failed";
            return _response(context, incoming, result);
        }
        let i = AOS_index_of(orders, "orderRef", data.orderRef);
        if ( i === -1) {
            //console.log("OrderRef does not exist."); 
            result.status = "failed"; 
            return _response(context, incoming, result); 
        }

        result.index = data.index;
        result.timer = data.timer;
        result.orderRef = data.orderRef;

        // TRY COLLECTION SIGN RESULT
        let collect_message = { orderRef: data.orderRef }
    
        let collect_result = bankid_result();
        await bankid_request(
            collect_options(collect_message), 
            collect_message, 
            collect_result
        );
        collect_result.parsed = JSON.parse(collect_result.data);

        // GENERATE QR DATA
        if (collect_result.parsed.status === "pending") {

            let order = orders[data.index];

            let qr_time = Math.round((performance.now() - order.orderTime) / 1000).toString();
            let qr_auth_code = 
                crypto_builtin.createHmac("sha256", order.qrStartSecret).
                update(qr_time).
                digest("hex");

            let qr_data = "bankid." + order.qrStartToken + "." + qr_time + "." + qr_auth_code;
            result.status = "pending";
            result.qr = qr_data;
        }

        if (collect_result.parsed.status === "complete") { 
            result.status = "complete";
            orders[result.index].result = collect_result.parsed.completionData; 
        }

        if (collect_result.parsed.status === "failed") { 
            result.status = "failed"; 
            _response(context, incoming, result, true); 
        }

        return _response(context, incoming, result); 
    }























    // SAVE
    if (parts[1] === "save" && incoming.method === "POST" && parts.length === 2) {

        // CREATE RESULT
        let result = {
            index: 0,
            status: "",
        }

        // CHECK ORDER REF
        let data = JSON.parse(incoming.data);
        if ("orderRef" in data === false) { 
            result.status = "failed";
            return _response(context, incoming, result);
        }
        let i = AOS_index_of(orders, "orderRef", data.orderRef);
        if ( i === -1) {
            //console.log("OrderRef does not exist."); 
            result.status = "failed"; 
            return _response(context, incoming, result); 
        }

        result.index = data.index;
        let form = data.form_data;
        let order = orders[result.index].result;

        let cms_set = "http://127.0.0.1:" + context.config.db.port + "/items/customer/?access_token=" + context.config.db.token;
        let message = JSON.stringify({
        type: form.type,
        first_name: order.user.givenName,
        last_name: order.user.surname,
        org_number: form.org,
        email: form.email,
        country: form.country,
        bank: form.bank,
        ip_address: order.device.ipAddress,
        personal_number: order.user.personalNumber,
        signature: order.signature
        });
        
        // POST REQUEST
        await http.set("POST", "application/json", [message], [cms_set], http.setup());

        _response(context, incoming, result, true);
        return;
    }
}


exports.route = route;