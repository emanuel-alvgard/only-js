import * as dom from "./dom.js";

// @DONE
function _collect(context) {
    let ids = Object.keys(context._views)
    for (let i=0; i < ids.length; i++) {
        let id = ids[i]
        context._views[id].collect()
    }
}

// @DONE
function _update(context) {
    let ids = Object.keys(context._components)
    for (let i=0; i < ids.length; i++) {
        let id = ids[i]
        context._components[id](context)
    }
}

// @DONE
function _render(context) {
    let ids = Object.keys(context._views)
    for (let i=0; i < ids.length; i++) {
        let id = ids[i]
        context._views[id].update()
    }
}

// @DONE
function _run(context) {

    if (context.RUN === false) { return }

    let time = performance.now()
    context.delta = (time - context.time) / 1000
    context.time = time

    _collect(context)
    _update(context)
    _render(context)

    context.SETUP = false

    window.requestAnimationFrame(() => { _run(context) })
}

// @DONE
export function setup() {

    const context = {
    
        // EVENTS
        SETUP: true,
        RUN: false,

        // DATA
        time: performance.now(),
        delta: 0.0,

        _images: {},
        _fonts: {},
        _views: {},
        _components: {},

        // INTERFACE
        // @DONE
        view(id, api="dom") {

            if (id in context._views) { return context._views[id] }

            // RENDERING API
            if (api === "dom") { context._views[id] = dom.setup(context) }
            else if (api === "canvas") {}
            else if (api === "webgl") {}
            else if (api === "webgpu") {}
            
            return context._views[id]
        },

        image() {},
        font() {},
        json() {},

        // @DONE
        component(id, func) {
            
            if (id in context._components) { return context._components[id] }
            context._components[id] = func
            return
        },

        // @DONE
        start() { 
            context.RUN = true 
            _run(context)
        },

        // @DONE
        stop() {
            context.RUN = false
        },
    }
    
    return context
}