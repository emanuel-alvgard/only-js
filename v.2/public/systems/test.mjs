import * as runtime from "./runtime/runtime.mjs";

let button;

runtime.system(function(context) {

    if (context.LOAD) {
        button = element();
    }

});