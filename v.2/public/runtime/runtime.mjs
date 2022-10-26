// @ADD
// animations
// intersection
// swap left and top html css properties for translate x,y
// add fixed_left(pos) function to element
// fixed_top
// nice system for fetching and using fonts
// most common css properties to runtime
import * as dom_module from "./dom.mjs";
import * as view_module from "./view.mjs";

// @
export function setup(context) {

    if (runtime in context) { return; }

    context.runtime = {
    
        // EVENTS
        SETUP: true,

        // DATA
        _views: {},
        _systems: {},

        // INTERFACE
        view(id, target="dom") {
            
            if (id in this._views) { return this._views[id]; }
            
            let view = {
        
                // DATA
                target,
                _elements: {},
                _tags: {},
        
                // INTERFACE
                element(id, type="div") {
                    if (id in this._elements) { return this._elements[id]; } 
                    this._target.element(id, type);
                    //return view_module.element(context, this, id, type); 
                },
                tag(id) { 
                    if (id in this._tags) { return this._tags[id]; } 
                    return view_module.tag(context, this, id); 
                }
            }

            // a target must expose setup() and update()
            
            
            this._views[id] = view;
            return view;
        },

        system(id, update) {
        }
    }
}



function _collect() {} // collect current view target state

function _update() {} // execute all systems to update view state

function _render() {} // render view state onto view target




// @DONE
export function run(context) {

    _collect();
    _update();
    _render();

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