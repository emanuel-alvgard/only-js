// BUILTIN
import * as fs_builtin from "fs";

// TOOLS
import * as http from "../tools/http.mjs";
import * as structure from "../tools/structure.mjs";

// @DONE
export default async (context, incoming) => {

    // make explicit else 404 page
    incoming.result = await fs_builtin.promises.readFile("../public/app.html");
    incoming.response.writeHead(200, {
        'Content-Length': Buffer.from(incoming.result).length,
        'Content-Type': "text/html"
    });
}