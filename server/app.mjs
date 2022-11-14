// BUILTIN
import * as fs_builtin from "fs";

// TOOLS
import * as http from "./tools/http.mjs";
import * as structure from "./tools/structure.mjs";
import * as watch from "./tools/watch.mjs";

// ROUTE
import file  from "./routes/file.mjs";
import api from "./routes/api.mjs";
import page from "./routes/page.mjs";

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
// build step (ESBuild) should be done here. all .mjs files in ../client
// this app watches all .mjs files and rebuilds on modification
// gets minified and put in ../build/scripts then they are
// read into memory, gzipped (zlib.gzip) and cached in the context.
// the router may need to function a bit differently than it is now

watch.files("../client", [".mjs"], [], () => { console.log("updated") });

/*
esbuild.build({
    loader: { 
        ".js": "js",
        ".mjs": "js" 
    },
    entryPoints: ["./src/client/app.mjs"],
    bundle: false,
    minify: true,
    outdir: "./build",
    write: true,
    allowOverwrite: true,
})
*/

run();

