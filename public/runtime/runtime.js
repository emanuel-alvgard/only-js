import * as dom from "./dom.mjs";
import * as virtual from "./virtual.mjs";

// @
export function setup(context) {

    return runtime = {
    
        // EVENTS
        SETUP: true,

        // DATA
        context: context,
        _views: {},
        _systems: {},

        // INTERFACE
        view(id, api) {

            if (id in context.runtime._views) { return context.runtime._views[id]; }
            
            let view;

            // RENDERING API
            if (api === "dom") { dom.setup(view); }
            else if (api === "webgl") {}
            else if (api === "webgpu") {}
            
            context.runtime._views[id] = view;
            return view;
        },

        system(id, sys) {
            if (id in context.runtime._systems) { return context.runtime._systems[id]; }
            sys.setup(context);
            context.runtime._systems[id] = sys.update;
            return;
        },
    }
}


// @DONE
function _collect(context) {
    let ids = Object.keys(context.runtime._views);
    for (let i=0; i < ids.length; i++) {
        let id = ids[i];
        context.runtime._views[id].collect();
    }
}

// @DONE
function _update(context) {
    let ids = Object.keys(context.runtime._systems);
    for (let i=0; i < ids.length; i++) {
        let id = ids[i];
        context.runtime._systems[id]();
    }
}

// @DONE
function _render(context) {
    let ids = Object.keys(context.runtime._views);
    for (let i=0; i < ids.length; i++) {
        let id = ids[i];
        context.runtime._views[id].update();
    }
}




// @DONE
export function run(context) {

    _collect(context);
    _update(context);
    _render(context);

    window.requestAnimationFrame(() => { run(context); });
}






// app 
    // context
        // views
            // elements
            // sounds
        // systems



    // internal interface
        // graphics interface
            // views
                // elements
                // tags
        // audio interface
    // external interface
        // http