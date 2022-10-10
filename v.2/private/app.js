// BUILTIN
const fs_builtin = require("fs");

// TOOLS
const http = require("./tools/http.js");
const structure = require("./tools/structure.js");

// ROUTE
const file = require("./routes/file.js");
const api = require("./routes/api.js");
const page = require("./routes/page.js");



const mode = process.argv[2];
const platform = process.platform;
if (mode === "dev") {}
else if (mode === "live") {}
else { console.log("Please enter execution mode: (dev / live)."); process.exit(); }

console.log("Server v.1.0.0 (" + platform + ") (" + mode + ")");
console.log("Type 'help' for avalible commands.");

function run() {
    
    let context = {
        timeout: 45,
        protocol: "https://",
        config: JSON.parse(fs_builtin.readFileSync("../config.json")),
        orders: structure.buffer_create(100)
    };


    
    // REMOVE TIMEOUTS AND COMPLETE
    let prev_time = performance.now();
    setInterval(() => {
        let time = performance.now();
        for (let i=0; i < context.orders.data.length; i++) {
            let order = context.orders.data[i];
            if (order === null) { continue; }
            order.timer += (time - prev_time);
            if (order.timer / 1000 > context.timeout || order.complete === true) {
                structure.buffer_remove(i, context.orders);
                console.log("Order removed.");
            }
        }
        prev_time = time;
    }, 100);



    if (mode === "dev") {
        context.protocol = "http://";
        context.config.app.domain = "localhost:" + context.config.app.port;
    }

    let routes = [
        file.route,
        file.route,
        file.route, 
        api.route,
        page.route
    ];
    
    let triggers = [
        "/public/",
        "/robots.txt",
        "/sitemap.xml",
        "/api",
        "/",
    ]; 
    
    let router = http.router(context, routes, triggers);
    http.server(context.config.app.port, router);
} 

run();

