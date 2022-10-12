const fs_builtin = require("fs");
const util = require("../tools/util.js");

// @DONE
async function route(context, incoming) { // @ADD config

    const types = {
        mjs: "text/javascript",
        html: "text/html",
        svg: "image/svg+xml"
    }

    let path = "..";  
    let file_type = util.filetype(incoming.url);
    let content_type = "";
    if (file_type in types) { content_type = types[file_type]; }

    console.log(incoming.url);
    console.log(content_type);

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