const http = require("../lib/http.js")
const util = require("../lib/util.js")
const fs_builtin = require("fs")

// @DONE
exports.component = async (context, incoming) => {

    // make explicit else 404 page
    incoming.result = await fs_builtin.promises.readFile("../public/app.html")
    incoming.response.writeHead(200, {
        'Content-Length': Buffer.from(incoming.result).length,
        'Content-Type': "text/html"
    })
}