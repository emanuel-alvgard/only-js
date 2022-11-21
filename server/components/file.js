const fs_builtin = require("fs");
const util = require("../_runtime/tools/util.js");

// @DONE
exports.component = async (context, incoming) => { // @ADD config

    const types = {
        js: "text/javascript",
        mjs: "text/javascript",
        html: "text/html",
        svg: "image/svg+xml"
    }

    let path = "..";  
    let file_type = util.filetype(incoming.url);
    let content_type = "";
    if (file_type in types) { content_type = types[file_type]; }

    switch (incoming.url) {
        case "/robots.txt": path += "/build/search/robots.txt"; break;
        case "/sitemap.xml": path += "/build/search/sitemap.xml"; break;
        default: path += incoming.url;
    }

    // @ADD check context.cache first

    try { incoming.result = await fs_builtin.promises.readFile(path); } catch(e) {}
    incoming.response.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Content-Length': Buffer.from(incoming.result).length,
        'Content-Type': content_type
    });
}