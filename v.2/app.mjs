import * as runtime from "./runtime.mjs";
import * as view from "./view.mjs";

const CONTEXT = {
    view: 0,
    views: [],
    controllers: [] // view._layout should be CONTEXT.controllers instead
}

runtime.setup(CONTEXT);
runtime.run(CONTEXT);