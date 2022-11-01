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
}



// @
function _update(view) {

    // @ADD adjust all output values according to viewport transformation

    let ids = Object.keys(view._elements);

    for (let i=0; i < ids.length; i++) {

        let id = ids[i];
        let element = view._elements[id];
        let node = view._target._elements[id];

        if (element.update) {
        
            if (element._width !== 0) { node.style.width = element._width + "px"; }
            else { node.style.width = "auto"; }
            
            if (element._height !== 0) { node.style.height = element._height + "px"; }
            else { node.style.height = "auto"; }
            
            node.style.transform = "translate(" + element._left + "px," + element._top + "px)";
            
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
        element.mouse_down = false;
        element.mouse_up = false;
        element.update = false;
    }

    // RESET EVENTS
    view.LOAD = 0;
    view.FORMAT_SWITCH = 0;
    view.ORIENTATION_SWITCH = 0;
}



// @HERE
export function setup(view) {

    view = {

        SETUP: true,
        FORMAT_SWITCH: false,
        ORIENTATION_SWITCH: false,

        viewport: null,
        root: document.createElement("div"),
        width: document.documentElement.clientWidth,
        height: window.innerHeight,
        scroll_y: window.scrollY,
        format: "",
        orientation: "",

        _virtual: {},
        _real: {},
        _groups: {},

        virtual() {},
        
        real (id, type, virtual) {
        
            let element = document.createElement(type);
    
            element.style.position = "absolute";
            element.style.margin = "0px";
    
            element.onmouseover = () => { virtual.mouse_hover = true; }
            element.onmouseleave = () => {  virtual.mouse_hover = false; }
            element.onmousedown = () => { virtual.mouse_down = true; }
            element.onmouseup = () => { virtual.mouse_up = true; }
    
            this._elements[id] = element;
            view.root.append(element);
        },

        entity() {},

        group() {},

        collect() {},

        update() {}

    }



    // EVENTS
    view.SETUP = true;
    view.FORMAT_SWITCH = false;
    view.ORIENTATION_SWITCH = false;

    // DATA
    view.viewport = null; // whatever virtual entity's transform, and other post processing settings if present, if null there's no transformation
    view.root = document.createElement("div"),
    view.width = document.documentElement.clientWidth;
    view.height = window.innerHeight;
    view.scroll_y = window.scrollY;
    view.format = "";
    view.orientation = "";

    document.body.style.margin = "0px" // put stuff like this inside app.html

    view.real = (id, type, virtual) => {
        
        let element = document.createElement(type);

        // set everything explicitly here
        element.style.position = "absolute";
        element.style.margin = "0px";

        element.onmouseover = () => { virtual.mouse_hover = true; }
        element.onmouseleave = () => {  virtual.mouse_hover = false; }
        element.onmousedown = () => { virtual.mouse_down = true; }
        element.onmouseup = () => { virtual.mouse_up = true; }

        this._elements[id] = element;
        view.root.append(element);
    },


     // INTERFACE
     entity(id, type="div") { // rename to virtual
        if (id in view._elements) { return view._elements[id]; }
        let virtual = view_module.element(view, id);
        view.target(id, type, virtual);
        return virtual;
    },
    element() {}, // always creates virtual element and dom element
    group(id) { 
        if (id in view._tags) { return view._tags[id]; } 
        return view_module.tag(context, view, id); 
    },
    collect() {},
    update() {}


    view.collect() { _collect(view); },

    view.update() { _update(view); }

    }
    document.body.append(view.root);
}



