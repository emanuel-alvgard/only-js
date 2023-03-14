import * as dom from "./dom.js"
import * as fetch from "./fetch.js"

// @DONE
function _run(context) {

        if (context.RUN === false) { return }

        let time = performance.now()
        context.delta = (time - context.time) / 1000
        context.time = time

        context._location._switch()

        //let s = performance.now()
        for (const id in context._views) { context._views[id].collect() }
        for (const id in context._components) { context._components[id](context) }
        for (const id in context._views) { context._views[id].update() }
        //console.log(performance.now() - s)

        // RESET EVENTS
        for (const id in context._json) { context._json[id].DONE = false }
        for (const id in context._fonts) { context._fonts[id].DONE = false }
        for (const id in context._images) { context._images[id].DONE = false }

        context.SETUP = false
        context._location.SWITCH = false

        window.requestAnimationFrame(() => { _run(context) })

}

// @DONE
export function setup() {

    const context = {
    
        // EVENTS
        SETUP: true,
        RUN: false,

        // DATA
        _location: {
            _stack: [],
            _prev: null,
            path: null,
            data: null,
            SWITCH: false,
            back: (data=null) => { 
                context._location._data = data
                context._location._pop = true
                return context._location
            },

            _push: false,
            _pop: false,
            _path: null,
            _data: null,
            _switch: () => {
                if (context._location._push) {
                    context._location._prev = context._location.path
                    context._location._stack.push(context._location.path)
                    context._location.path = context._location._path
                    context._location.data = context._location._data
                    context._location.SWITCH = true
                    context._location._push = false
                    return
                }
                if (context._location._pop) {
                    context._location._prev = context._location.path
                    context._location.path = context._location._stack.pop()
                    context._location.data = context._location._data
                    context._location.SWITCH = true
                    context._location._pop = false
                    return
                }
            }
        },

        time: performance.now(),
        delta: 0.0,

        _json: {},
        _images: {},
        _fonts: {},
        _views: {},
        _components: {},

        // INTERFACE
        location(path=null, data=null) {
            if (path === null) { return context._location }
            if (path !== context._location.path) {
                context._location._path = path
                context._location._data = data
                context._location._push = true
            }
            return context._location
        },

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
            else {
                context._fonts[id] = {
                    DONE: false,
                    data: null
                }
                fetch.font(id, path, (f) => { 
                    context._fonts[id].data = f
                    context._fonts[id].DONE = true    
                })
            }
            return context._fonts[id]
        },

        // @DONE
        image(id, path=null) {

            let reload = false

            if (id in context._images) { 
                if (path !== null && path !== context._images[id].path) {
                    context._images[id].path = path
                    reload = true
                }
            }
            else {
                context._images[id] = {
                    DONE: false,
                    path: path,
                    data: null,
                    reload(path=null) {
                        if (path !== null) { context._images[id].path = path }
                        fetch.image(context._images[id].path, (i) => { 
                            context._images[id].data = i
                            context._images[id].DONE = true
                        })
                        return context._images[id]
                    }
                }
                if (path !== null) { reload = true }
            }

            if (reload) {
                fetch.image(path, (i) => { 
                    context._images[id].data = i
                    context._images[id].DONE = true
                })
            }

            return context._images[id]
        },



        // @DONE
        json(id, path=null, message={}) { 

            if (id in context._json) {
                if (path === null) { return context._json[id] } 
                else { context._json[id].path = path }
                if (context._json[id].RUN) { return context._json[id] }
            }
            else {
                context._json[id] = {
                    DONE: false,
                    RUN: false,
                    path: path,
                    data: null,
                }
                if (path === null) { return context._json[id] }
            }

            context._json[id].RUN = true
            fetch.json(path, message, (i) => { 
                context._json[id].data = i
                context._json[id].DONE = true
                context._json[id].RUN = false
            })
            
            return context._json[id]
        },



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