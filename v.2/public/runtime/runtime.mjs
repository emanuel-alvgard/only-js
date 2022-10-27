import * as dom_module from "./dom.mjs";
import * as view_module from "./view.mjs";

// @DONE
export function setup(context) {

    if ("runtime" in context) { return; }

    context.runtime = {
    
        // EVENTS
        SETUP: true,

        // DATA
        _views: {},
        _systems: {},

        // INTERFACE
        view(id, target="dom") {

            if (id in context.runtime._views) { return context.runtime._views[id]; }
            
            let view = {
        
                // DATA
                _target: null,
                _elements: {},
                _tags: {},
        
                // INTERFACE
                element(id, type="div") {
                    if (id in view._elements) { return view._elements[id]; }
                    let virtual = view_module.element(view, id);
                    view._target.element(id, type, virtual);
                    return virtual;
                },
                tag(id) { 
                    if (id in view._tags) { return view._tags[id]; } 
                    return view_module.tag(context, view, id); 
                }
            }

            // RENDER TARGET
            if (target === "dom") { dom_module.setup(view); }
            
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
        context.runtime._views[id]._target.collect();
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
        context.runtime._views[id]._target.update();
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