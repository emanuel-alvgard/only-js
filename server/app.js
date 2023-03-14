// BUILTIN
const fs_builtin = require("fs");
const zlib_builtin = require("node:zlib");

// TOOLS
const http = require("./components/lib/http.js")
const util = require("./components/lib/util.js")
const dir = require("./components/lib/dir.js")
const database = require("./components/lib/database.js")

// ROUTE
const file = require("./components/public/file.js")
const api = require("./components/public/api.js")
const page = require("./components/public/page.js")

// NPM
const esbuild = require("./_runtime/node_modules/esbuild")

const mode = process.argv[2];
const platform = process.platform;
if (mode === "dev") {}
else if (mode === "live") {}
else { console.log("Please enter execution mode: (dev / live)."); process.exit(); }

console.log("Server v.1.0.0 (" + platform + ") (" + mode + ")");
console.log("Type 'help' for avalible commands.");


let context = {
    time: performance.now(),
    delta: 0.0,
    db: database("./db", 1000),

    // ACTIVE USERS
    token_timeout: 3_600_000, // 1h
    active_tokens: [],
    active_users: [],
    active_timers: [],

    protocol: "https://",
    config: JSON.parse(fs_builtin.readFileSync("../config.json")),
}

if (mode === "dev") {
    context.protocol = "http://";
    context.config.domain = "localhost:" + context.config.port;
}

let routes = [
    file.component,
    file.component,
    file.component, 
    api,
    page.component
]

let triggers = [
    "/client/",
    "/robots.txt",
    "/sitemap.xml",
    "/api/",
    "/",
]

// TIMERS
const _interval = 1000
setInterval(()=>{

    let time = performance.now()
    context.delta = (time - context.time) / 1000
    context.time = time

    // ACTIVE USERS
    for (let i=0; i < context.active_timers.length; i++) {
        context.active_timers[i] += context.delta * _interval
        if (context.active_timers[i] >= context.token_timeout) {
            context.active_timers.splice(i, 1)
            context.active_tokens.splice(i, 1)
            context.active_users.splice(i, 1)
            i --
        }
    }

}, _interval)




// IF DEV MODE
// HOT RELOADING SETUP

let html_index = fs_builtin.readFileSync("../client/app.html").toString()
let reload_script = ""
let export_script = ""

if (mode === "dev") {
    reload_script = fs_builtin.readFileSync("./_runtime/client_reload.js").toString()
    export_script = fs_builtin.readFileSync("./_runtime/client_export.js").toString()
}

let pointer = { position:0, previous:0 }
while (pointer.position < html_index.length) {
    if (util.string(html_index, "</body>", pointer)) { break; }
    pointer.position ++
}

let html_start = html_index.substring(0, pointer.previous)
let html_end = html_index.substring(pointer.previous, html_index.length)

_html = 
    html_start +
    "<script>" + 
    reload_script + 
    "</script>" +
    "<script>" + 
    export_script + 
    "</script>" +
    html_end

let index_route = triggers.indexOf("/")
if (index_route > -1) { 
    routes[index_route] = async (context, incoming) => {
        incoming.result = _html
        incoming.response.writeHead(200, {
            'Content-Length': Buffer.from(incoming.result).length,
            'Content-Type': "text/html"
        });
    }
}

if (mode === "dev") {
    
    context.client_reload = false
    triggers.unshift("/client_reload")
    routes.unshift(async (context, incoming) => {

        let result = { done: false, fail: false }
        
        let i = setInterval(() => {
            if (context.client_reload) { 
                context.client_reload = false
                result.done = true
                clearInterval(i)
            }
        }, 50)

        await util.wait(result)

        incoming.response.writeHead(200, {
            'Content-Length': Buffer.from(incoming.result).length,
            'Content-Type': "text/html"
        })
    })
}

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

// @FIX reloading should always make a safe swap where in the case of a invalid reload 
// the server keeps the old data
// @ADD proper error handling for zero down time

dir.watch("../client", [".js"], ["node_modules"], 50, () => {

    // REBUILD
    let build = ["../client/app.js"]
    //dir.collect("../client", [".js"], ["node_modules"], build);
    
    /*
    let start = performance.now()
    let minified

    try {
        minified = esbuild.buildSync({
            loader: { ".js": "js" },
            entryPoints: build,
            bundle: true,
            minify: true,
            write: false,
            allowOverwrite: true,
        })
    }
    catch (e) {}
    */

    //console.log(minified)

    /*
    esbuild.buildSync({
        loader: { ".js": "js" },
        entryPoints: build,
        bundle: true,
        minify: true,
        outdir: "../build/scripts",
        write: true,
        allowOverwrite: true,
    })
    */

    /*

    let gzipped = []
    let size = 0
    
    try {
        minified.outputFiles.forEach(file => {
            let result = zlib_builtin.gzipSync(file.text)
            size += result.byteLength
            gzipped.push(result)
        })
    }
    catch (e) {}

    console.log(size)
    
    */

    // switch cache

    //console.log(((performance.now() - start) / 1000) + " ms")

    // RELOAD
    context.client_reload = true

})

let router = http.router(context, routes, triggers)
http.server(context.config.port, router)


// @ADD interval that backsup /db