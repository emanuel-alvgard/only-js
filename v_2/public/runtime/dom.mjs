// @DONE
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



// @DONE
function _update(view) {

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



// @DONE
export function setup(view) {

    // EVENTS
    view.SETUP = true;
    view.FORMAT_SWITCH = false;
    view.ORIENTATION_SWITCH = false;

    // DATA
    view.root = document.createElement("div"),
    view.width = document.documentElement.clientWidth;
    view.height = window.innerHeight;
    view.scroll_y = window.scrollY;
    view.format = "";
    view.orientation = "";

    document.body.style.margin = "0px"

    view._target = {
        
        _elements: {},

        element(id, type, virtual) {
            
            let node = document.createElement(type);

            node.style.position = "absolute";
            node.style.margin = "0px";

            node.onmouseover = () => { virtual.mouse_hover = true; }
            node.onmouseleave = () => {  virtual.mouse_hover = false; }
            node.onmousedown = () => { virtual.mouse_down = true; }
            node.onmouseup = () => { virtual.mouse_up = true; }

            this._elements[id] = node;
            view.root.append(node);
        },

        collect() { _collect(view); },

        update() { _update(view); }

    }
    document.body.append(view.root);
}



