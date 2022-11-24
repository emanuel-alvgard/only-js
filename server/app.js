// BUILTIN
const fs_builtin = require("fs");
const zlib_builtin = require("node:zlib");

// TOOLS
const http = require("./_runtime/tools/http.js");
const util = require("./_runtime/tools/util.js");
const dir = require("./_runtime/tools/dir.js");

// ROUTE
const file = require("./components/file.js");
const api = require("./components/api.js");
const page = require("./components/page.js");

// NPM
const esbuild = require("./_runtime/node_modules/esbuild");

const mode = process.argv[2];
const platform = process.platform;
if (mode === "dev") {}
else if (mode === "live") {}
else { console.log("Please enter execution mode: (dev / live)."); process.exit(); }

console.log("Server v.1.0.0 (" + platform + ") (" + mode + ")");
console.log("Type 'help' for avalible commands.");




let context = {
    client_reload: false,
    protocol: "https://",
    config: JSON.parse(fs_builtin.readFileSync("../config.json")),
};

if (mode === "dev") {
    context.protocol = "http://";
    context.config.app.domain = "localhost:" + context.config.app.port;
}

let routes = [
    file.component,
    file.component,
    file.component, 
    api.component,
    page.component
]

let triggers = [
    "/build/",
    "/robots.txt",
    "/sitemap.xml",
    "/api",
    "/",
]



// RUNTIME SUPPORT FOR API AUTH


// DATABASE (key:value store a bit like redis)
// JSON based and directory structured.
// always caches index.json from all directories
// always caches database structure and fills
// the cache with as many files as possible within the set cache limit
// on a write to a certain file that file is flushed from the cache


// SIMPLE SOLUTION FOR SETTING UP WEBSOCKETS

// IF DEV MODE
// HOT RELOADING SETUP
let html_index = fs_builtin.readFileSync("../build/index.html").toString()
let reload_script = fs_builtin.readFileSync("./_runtime/client_reload.js").toString()

let pointer = { position:0, previous:0 }
while (pointer.position < html_index.length) {
    if (util.string(html_index, "</body>", pointer)) { console.log(pointer.position); break; }
    pointer.position ++
}

let html_start = html_index.substring(0, pointer.previous)
let html_end = html_index.substring(pointer.previous, html_index.length-1)

let new_html = 
    html_start +
    '<script type="module" src="../client/app.js"></script>' + // /build/scripts/app.js if live mode
    "<script>" + 
    reload_script + 
    "</script>" +
    html_end

let index_route = triggers.indexOf("/")
if (index_route > -1) { 
    routes[index_route] = async (context, incoming) => {
        incoming.result = new_html
        incoming.response.writeHead(200, {
            'Content-Length': Buffer.from(incoming.result).length,
            'Content-Type': "text/html"
        });
    }
}

triggers[0] = "/client/" // if dev mode
triggers.unshift("/client_reload")
routes.unshift(async (context, incoming) => {

    let result = { done: false, fail: false }
    
    let i = setInterval(() => {
        if (context.client_reload) { 
            context.client_reload = false
            result.done = true
            clearInterval(i)
        }
        // @ADD check if sockets destroyed and clear interval
    }, 10);

    await util.wait(result)
    
    incoming.response.writeHead(200, {
        'Content-Length': Buffer.from(incoming.result).length,
        'Content-Type': "text/html"
    })
})

let router = http.router(context, routes, triggers);
http.server(context.config.app.port, router);


// inject script tag in index.html that send xhr request every 100ms 
// when build step is completed server responds with a reload on where
// script calls location.reload()
// reroute index.html to index_dev
// create route function for reload

// BASE64 LOADING IMAGE
// inject base64 img tag in index.html


// JSON COMPRESSION
// json() api calls are automatically compressed to gzip


// BUILD STEP WITH CACHING
// @MOVE into _runtime


// REBUILD / RELOAD
let cache;

dir.watch("../client", [".js"], ["node_modules"], () => {

    // REBUILD
    let build = ["../client/app.js"]
    //dir.collect("../client", [".js"], ["node_modules"], build);
    
    let start = performance.now()
    
    let minified = esbuild.buildSync({
        loader: { ".js": "js" },
        entryPoints: build,
        bundle: true,
        minify: true,
        outdir: "../build/scripts",
        write: false,
        allowOverwrite: true,
    })

    esbuild.buildSync({
        loader: { ".js": "js" },
        entryPoints: build,
        bundle: true,
        minify: true,
        outdir: "../build/scripts",
        write: true,
        allowOverwrite: true,
    })

    let gzipped = []
    let size = 0

    minified.outputFiles.forEach(file => {
        let result = zlib_builtin.gzipSync(file.text)
        size += result.byteLength
        gzipped.push(result)
    })

    // switch cache

    console.log(((performance.now() - start) / 1000) + " ms")

    // RELOAD
    context.client_reload = true

});
