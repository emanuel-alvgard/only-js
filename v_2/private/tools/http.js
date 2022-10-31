const http_builtin = require("http");
const util = require("./util.js");

let error = new Error("");
let message = "FAIL: http.";

// @DONE
function setup() {

    let data = {

        done: 0,
        fail: 0,
        responses: { value: 0 },
        raw: [],
        parsed: [],
        formatted: {} // change to array?
    }

    return data;
}

// @DONE
async function get(urls, result) {
    
    for (let i = 0; i < urls.length; i++) {

        result.raw.push({ string: "" });
        result.parsed.push({});
        
        let options = { 
            method: "GET",
            headers: {
                "Content-Length": Buffer.from(urls[i]).length
            }
        };

        let req = http_builtin.request(urls[i], options, function (res) {

            res.setEncoding("utf-8");
            res.on('data', function (data) {
                result.raw[i].string += data.toString();
                return;
            });

            res.on('end', function () {
                result.responses.value += 1;
                return;
            });
        });

        req.on('error', function (e) {
            result.fail = 1;
        });
        
        req.end();
    }
    
    error.message = message + "get(" + urls + ")";
    let condition = (task) => { if (task.responses.value === urls.length) { task.done = 1; }} 
    await util.wait(result, error, condition);

}

// @DONE
async function set(method, type, messages, urls, result) {

    for (let i = 0; i < urls.length; i++) {

        result.raw.push({ string: "" });
        result.parsed.push({});
        
        let options = { 
            method: method, 
            headers: {
                "Content-Type": type,
                "Content-Length": Buffer.from(messages[i]).length
            }
        };

        let req = http_builtin.request(urls[i], options, function (res) {
            
            res.setEncoding("utf-8");
            res.on('data', function (data) {
                result.raw[i].string += data.toString();
                return;
            });

            res.on('end', function () {
                result.responses.value += 1;
                return;
            });
        });

        req.on('error', function () {
            result.fail = 1;
        });
        
        req.write(messages[i]);
        req.end();
    }
    
    error.message = message + "set(" + urls + ")";
    let condition = (task) => { if (task.responses.value === urls.length) { task.done = 1; }} 
    await util.wait(result, error, condition);
}

// @DONE
function parse(result, func) {

    for (let i = 0; i < result.raw.length; i++) {
        Object.assign(result.parsed[i], func(result.raw[i].string));
    }

    return;
}

// @DONE
function server(port, router) {

    let result = http_builtin.createServer(router);
    result.listen(port);
    
    return result;
}

// @DONE
function router(context, routes=[], triggers=[]) {
    
    async function request(req, res) {
        
        let incoming = {
            type: "external",
            request: req,
            response: res,
            host: req.headers.host,
            
            method: req.method,
            url: req.url,
            pointer: { position: 0, lenght: 0},

            data: "",
            result: ""
        }

        req.on("data", function (d) {
            incoming.data += d.toString();
        });

        req.on("end", async function () {
            res.statusCode = 404;
            let index = util.match(incoming.url, triggers, "/");
            try { await routes[index](context, incoming); } catch (e) { console.log(e); }
            res.end(incoming.result);
        });
    }
    return request;
}

// @EXPORT
exports.setup = setup;
exports.get = get;
exports.set = set;
exports.parse = parse;
exports.server = server;
exports.router = router;