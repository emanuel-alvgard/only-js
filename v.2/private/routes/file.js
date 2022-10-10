const fs_builtin = require("fs");
const util = require("../tools/util.js");

// @DONE
async function route(context, incoming) { // @ADD config

    let path = "..";  
    let type = util.filetype(incoming.url);
    let content_type = "";
    if (type === ".svg") { content_type = "image/svg+xml"; }

    switch (incoming.url) {
        case "/robots.txt": path += "/public/robots.txt"; break;
        case "/sitemap.xml": path += "/public/sitemap.xml"; break;
        default: path += incoming.url;
    }

    try { incoming.result = await fs_builtin.promises.readFile(path); } catch(e) {}
    incoming.response.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Content-Length': Buffer.from(incoming.result).length,
        'Content-Type': content_type
    });
}

exports.route = route;