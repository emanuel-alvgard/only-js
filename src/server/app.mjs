// BUILTIN
import * as fs_builtin from "fs";

// TOOLS
import * as http from "./tools/http.mjs";
import * as structure from "./tools/structure.mjs";

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

run();

