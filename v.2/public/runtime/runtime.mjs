// @ADD
// animations
// intersection
// swap left and top html css properties for translate x,y
// add fixed_left(pos) function to element
// fixed_top
// nice system for fetching and using fonts
// most common css properties to runtime



// @
export function setup(context) {

    context.runtime = {
    
        views: {},
        systems: [],

        view(id, target) {
            
            if (id in views) { return views[id]; }
            views[id] = {
        
                // DATA
                _target: target,
        
                // ELEMENTS
                _element: {},
                _tag: {},
        
                // INTERFACE
                element(id, type) { return _element(context, id, type); },
                tag(id) { return _tag(context, id); },
                show() {},
                hide() {},
                remove() {}
        
            }

            /*
            switch(target) {
                case "html":
                    
                    // EVENTS
                    LOAD: 1,
                    FORMAT_SWITCH: 0,
                    ORIENTATION_SWITCH: 0,

                    // DATA
                    views[id].root = document.getElementsByClassName("runtime-root")[0],
                    width: document.documentElement.clientWidth,
                    height: window.innerHeight,
                    scroll_y: window.scrollY,
                    format: "",
                    orientation: "",
            }
            */

        },

        system(func) {
            systems.push(func);
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




// @ADD

/*
let animation = {
    
    element: 0,
    property: "",
    start: 0,
    end: 0,
    time: 0,
    delay: 0,
    curve: [],
    event: 0,

    running: 0,
    timer: 0,
    progress: 0,
    sample: 0
};

// CALCULATING DELTA FOR ANIMATIONS
    let previous_cycle = perfomance.now();
    setInterval(() => {
        let current_cycle = performance.now();
        delta = current_cycle - previous_cycle;
        previous_cycle = current_cycle;
    });


*/




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