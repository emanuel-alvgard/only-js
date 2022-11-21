import * as dom from "./dom.js";

// @DONE
function _collect(context) {
    let ids = Object.keys(context._views);
    for (let i=0; i < ids.length; i++) {
        let id = ids[i];
        context._views[id].collect();
    }
}

// @DONE
function _update(context) {
    let ids = Object.keys(context._components);
    for (let i=0; i < ids.length; i++) {
        let id = ids[i];
        context._components[id]();
    }
}

// @DONE
function _render(context) {
    let ids = Object.keys(context._views);
    for (let i=0; i < ids.length; i++) {
        let id = ids[i];
        context._views[id].update();
    }
}


// @DONE
export function setup() {

    const context = {
    
        // EVENTS
        SETUP: true,

        // DATA
        time: performance.now(),
        delta: 0.0,

        _images: {},
        _fonts: {},
        _views: {},
        _components: {},

            // INTERFACE
        view(id, api="dom") {

            let view;

            //if (id in data._views) { view = data._views[id]; }

            // RENDERING API
            if (api === "dom") { view = dom.setup(data); }
            else if (api === "canvas") {}
            else if (api === "webgl") {}
            else if (api === "webgpu") {}
            
            data._views[id] = view;
            return view;
        },
        image() {},
        font() {},
        json() {},

        component(id, func) {
            
            if (id in context._components) { return context._components[id]; }
            context._components[id] = func;
            return;
        },

        run() { //@EDIT to start() & stop()

            let time = performance.now();
            context.delta = (time - context.time) / 1000;
            context.time = time;

            _collect(context);
            _update(context);
            _render(context);
        
            window.requestAnimationFrame(() => { run(); });
        }
    }
    return context;
}