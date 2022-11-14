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

function run() {
    
    let context = {
        protocol: "https://",
        config: JSON.parse(fs_builtin.readFileSync("../config.json")),
    };

    if (mode === "dev") {
        context.protocol = "http://";
        context.config.app.domain = "localhost:" + context.config.app.port;
    }

    let routes = [
        file,
        file,
        file, 
        api,
        page
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

// HOT RELOADING (dev)
// inject script tag in index.html that send xhr request every 100ms 
// when build step is completed server responds with a reload on where
// script calls location.reload()

// BASE64 LOADING IMAGE
// inject base64 img tag in index.html





// BUILD STEP WITH CACHING
// @MOVE into _runtime
let cache;

dir.watch("../client", [".mjs"], ["node_modules"], () => {

    let build = []
    dir.collect("../client", [".mjs"], ["node_modules"], build);
    
    let start = performance.now()
    
    let minified = esbuild.buildSync({
        loader: { 
            ".js": "js",
            ".mjs": "js" 
        },
        entryPoints: build,
        bundle: false,
        minify: true,
        outdir: "../build/scripts",
        write: false,
        allowOverwrite: true,
    })

    esbuild.buildSync({
        loader: { 
            ".js": "js",
            ".mjs": "js" 
        },
        entryPoints: build,
        bundle: false,
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

});

run();

