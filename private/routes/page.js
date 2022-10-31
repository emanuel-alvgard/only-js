const http = require("../tools/http.js");
const util = require("../tools/util.js");
const fs_builtin = require("fs");

// @DONE
async function route(context, incoming) {

    // make explicit else 404 page
    incoming.result = await fs_builtin.promises.readFile("../public/app.html");
    incoming.response.writeHead(200, {
        'Content-Length': Buffer.from(incoming.result).length,
        'Content-Type': "text/html"
    });
}

exports.route = route;