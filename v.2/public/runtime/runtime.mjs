// @ADD
// animations
// intersection
// swap left and top html css properties for translate x,y
// add fixed_left(pos) function to element
// fixed_top
// nice system for fetching and using fonts
// most common css properties to runtime

import * as view_module from "./view.mjs";

// @
export function setup(context) {

    context.runtime = {
    
        views: {},
        systems: {},

        view(id, target) {
            
            if (id in this.views) { return this.views[id]; }
            
            let view = {
        
                // DATA
                _target: target,
                elements: {},
                tags: {},
        
                // INTERFACE
                element(id, type) { return view_module.element(this, context, id, type); },
                tag(id) { return _tag(this, context, id); }
            }

            
            switch(target) {
                case "html":
                    view._target = {
                        
                        // EVENTS
                        LOAD: 1,
                        FORMAT_SWITCH: 0,
                        ORIENTATION_SWITCH: 0,

                        // DATA
                        root: document.body.append(document.createElement("div").classList.add("runtime-root")),
                        width: document.documentElement.clientWidth,
                        height: window.innerHeight,
                        scroll_y: window.scrollY,
                        format: "",
                        orientation: "",

                    }; break;
            }
            
            this.views[id] = view;
            return;
        },

        system(id, func) {
        }
    }
}





// @DONE
export function run(context) {

    // collect render target state
    // execute all systems
    // update all render targets

    window.requestAnimationFrame(() => { run(context); });
}




// app 
    // context
    // internal interface
        // graphics interface
            // view
                // layout
                // element
        // audio interface
    // external interface
        // http