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
    
        systems: [],
        views: [],

        view(target) {

        },

        system(func) {

        }
    }

    /*
    context.view = {

        // EVENTS
        LOAD: 1,
        FORMAT_SWITCH: 0,
        ORIENTATION_SWITCH: 0,

        // DATA
        target: "html",
        root: document.getElementsByClassName("runtime-root")[0],
        width: document.documentElement.clientWidth,
        height: window.innerHeight,
        scroll_y: window.scrollY,
        format: "",
        orientation: "",

        _layout: { // change into controllers? and move out to context
            format: [], // change into a trigger function that returns a boolean 
            func: [] 
        },

        _html: {
            id: [],
            object: []
        },

        _element: {
            id: [],
            object: []
        },

        _tag: {
            id: [], 
            object: []
        },

        // INTERFACE
        layout(func, format=null) { return _layout(context, func, format); },
        element(id, type) { return _element(context, id, type); },
        tag(id) { return _tag(context, id); },
        html(id, type) { return _html(context, id, type); },
        show() {},
        hide() {},
        remove() {}

    }
    */

    return;
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