import * as dom from "./dom.js"
import * as asset from "./asset.js"

// @DONE
function _run(context) {

    if (context.RUN === false) { return }

    let time = performance.now()
    context.delta = (time - context.time) / 1000
    context.time = time

    for (const id in context._views) { context._views[id].collect() }
    //let s = performance.now()
    for (const id in context._components) { context._components[id](context) }
    //console.log(performance.now() - s)
    for (const id in context._views) { context._views[id].update() }

    // RESET EVENTS
    for (const id in context._fonts) { context._fonts[id].DONE = false }
    for (const id in context._images) { context._images[id].DONE = false }

    context.SETUP = false
    context.location.SWITCH = false

    window.requestAnimationFrame(() => { _run(context) })
}

// @DONE
export function setup() {

    const context = {
    
        // EVENTS
        SETUP: true,
        RUN: false,

        // DATA
        location: { 
            path: "",
            SWITCH: false,
            switch(p) { 
                if (p !== context.location.path) { 
                context.location.path = p; 
                context.location.SWITCH = true
                return
            }} 
        },
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
            if (api === "dom") { context._views[id] = dom.setup(context, id) }
            else if (api === "canvas") {}
            else if (api === "webgl") {}
            else if (api === "webgpu") {}
            
            return context._views[id]
        },

        // @DONE
        font(id, path=null) {
            if (id in context._fonts) { return context._fonts[id] }
            if (path === null) { return null }
            context._fonts[id] = {
                DONE: false,
                data: null
            }
            asset.font(id, path, (f) => { 
                context._fonts[id].data = f
                context._fonts[id].DONE = true    
            })
            return context._fonts[id]
        },

        // @DONE
        image(id, path=null) {

            if (id in context._images) { return context._images[id] }
            if (path === null) { return null }
            
            context._images[id] = {
                DONE: false,
                path: path,
                data: null,
                reload(path=null) {
                    if (path !== null) { context._images[id].path = path }
                    asset.image(context._images[id].path, (i) => { 
                        context._images[id].data = i
                        context._images[id].DONE = true    
                    })
                    return context._images[id]
                }
            }

            asset.image(path, (i) => { 
                context._images[id].data = i
                context._images[id].DONE = true    
            })
            return context._images[id]
        },

        // @
        json(id, path) {},

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