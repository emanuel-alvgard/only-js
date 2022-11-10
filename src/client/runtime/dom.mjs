import * as virtual from "./virtual.mjs";

// @
function _collect(view) {

    // format
    if (view.width < 1000) {
        if (view.format === "desktop") { view.FORMAT_SWITCH = 1; } 
        view.format = "mobile";
    }
    if (view.width > 1000) {
        if (view.format === "mobile") { view.FORMAT_SWITCH = 1; } 
        view.format = "desktop";
    }

    // orientation
    if (view.width < window.innerHeight) { 
        if (view.orientation === "horizontal") { view.ORIENTATION_SWITCH = 1; }
        view.orientation = "vertical";  
    }
    if (view.width > window.innerHeight) { 
        if (view.orientation === "vertical") { view.ORIENTATION_SWITCH  = 1; }
        view.orientation = "horizontal";  
    }

    // dimension
    if (view.format === "desktop") {
        view.width =  document.documentElement.clientWidth;
        view.height = window.innerHeight;
        view.scroll_y = window.scrollY;
    }

    if (view.format === "mobile") {
        if (view.FORMAT_SWITCH || view.ORIENTATION_SWITCH) { view.height = window.innerHeight; }
        view.width =  document.documentElement.clientWidth;
        view.scroll_y = window.scrollY;
    }

    // elements
    let ids = Object.keys(view._virtual);

    for (let i=0; i < ids.length; i++) {
        let virtual = view._virtual[i];
        let real = view._real[i];
        if (virtual._auto_w) { virtual._w = real.clientWidth; }
        if (virtual._auto_h) { virtual._h = real.clientHeight; }
    }

}



// @
function _update(view) {

    let ids = Object.keys(view._elements);

    for (let i=0; i < ids.length; i++) {

        let id = ids[i];
        let element = view._elements[id];
        let node = view._target._elements[id];

        if (element.update) {
        
            if (element._width !== 0) { node.style.width = element._width + "px"; } //@HERE
            else { node.style.width = "auto"; }
            
            if (element._height !== 0) { node.style.height = element._height + "px"; }
            else { node.style.height = "auto"; }
            
            node.style.transform = "translate(" + element._left + "px," + element._top + "px)"; // this gets affected by .viewport transform
            
            // text
            node.style.paddingLeft = element._padding_left + "px";
            node.style.paddingRight = element._padding_right + "px";
            node.style.paddingTop = element._padding_top + "px";
            node.style.paddingBottom = element._padding_bottom + "px";

            if (element._font_size !== 0) { node.style.fontSize = element._font_size + "px"; }
            if (element._font_type !== null) { node.style.fontFamily = element._font_type; }

            // visibility
            if (element._visible) { node.style.display = "initial"; }
            else { node.style.display = "none"; }
        }

        // RESET EVENTS
        element.MOUSE_DOWN = false;
        element.MOUSE_UP = false;
        element.UPDATE = false;
    }

    // RESET EVENTS
    view.SETUP = 0;
    view.FORMAT_SWITCH = 0;
    view.ORIENTATION_SWITCH = 0;
}



// @HERE @EDIT must return a new view instead of mutating incoming
export function setup(context) {

    const view = {

        SETUP: true,
        FORMAT_SWITCH: false,
        ORIENTATION_SWITCH: false,

        viewport: null,
        time: performance.now(),
        delta: 0.0,
        root: null,
        format: "",
        orientation: "",

        _virtual: {},
        _real: {},

        // @DONE
        virtual(id) {
            if (id in view._virtual) { return view._virtual[id]; }
            return virtual.element(context, id);
        },
        
        // @HERE
        real(id, type, virtual) {

            if (id in view._real) { return view._real[id]; }
        
            let element = document.createElement(type);
    
            element.style.position = "absolute";
            element.style.margin = "0px";
            element.style.padding = "0px";
    
            // @CHECK if this should be here?? maybe swap out for custom intersection system
            element.onmouseover = () => { virtual.mouse_hover = true; }
            element.onmouseleave = () => {  virtual.mouse_hover = false; }
            element.onmousedown = () => { virtual.mouse_down = true; }
            element.onmouseup = () => { virtual.mouse_up = true; }
    
            this._elements[id] = element;
            view.root.append(element);
        },

        // @DONE
        element(id, type="div") {
            let virtual = virtual.element(context, id);
            view.real(id, type, virtual);
            return virtual;
        },

        // @DONE
        collect() { _collect(view); },

        // @DONE
        update() { _update(view); },

        show() {},
        hide() {}
    }

    view.root = view.element("root")
    document.body.append(view.root);

    return view
}

