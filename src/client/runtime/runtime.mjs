import * as dom from "./dom.mjs";

// @DONE
function _collect(runtime) {
    let ids = Object.keys(runtime._views);
    for (let i=0; i < ids.length; i++) {
        let id = ids[i];
        runtime._views[id].collect();
    }
}

// @DONE
function _update(runtime) {
    let ids = Object.keys(runtime._components);
    for (let i=0; i < ids.length; i++) {
        let id = ids[i];
        runtime._components[id]();
    }
}

// @DONE
function _render(runtime) {
    let ids = Object.keys(runtime._views);
    for (let i=0; i < ids.length; i++) {
        let id = ids[i];
        runtime._views[id].update();
    }
}



// @DONE
export function setup(context) {

    const runtime = {
    
        // EVENTS
        SETUP: true,

        // DATA
        context: context,
        time: performance.now(),
        delta: 0.0,
        _views: {},
        _components: {},

        // INTERFACE
        view(id, api) {

            if (id in runtime._views) { return runtime._views[id]; }
            
            let view;

            // RENDERING API
            if (api === "dom") { dom.setup(view); }
            else if (api === "canvas") {}
            else if (api === "webgl") {}
            else if (api === "webgpu") {}
            
            runtime._views[id] = view;
            return view;
        },

        component(id, func) {
            
            if (id in runtime._components) { return runtime._components[id]; }
            
            runtime._components[id] = func;
            return;
        },

        run() {

            let time = performance.now();
            runtime.delta = (time - runtime.time) / 1000;
            runtime.time = time;

            _collect(runtime);
            _update(runtime);
            _render(runtime);
        
            window.requestAnimationFrame(() => { run(); });
        }
    }

    return runtime;
}