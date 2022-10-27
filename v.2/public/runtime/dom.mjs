/*
function _html_tree(context, html) {

    for (let i=0; i < html.length; i++) {
        
        let object = html[i].classList;
        if (object.length === 0) { continue; }
        _element(context, object[0]); // change to .id later
        
        if (html[i].children.length > 0 ) { 
            _html_tree(context, html[i].children); 
        }
    }
    return;
}

_html_tree(context, context.view.root.children);
context.view.root.style.opacity = "1.0";
*/



// @NOT
function _update(view) {

    // COLLECT
    // EVENTS / DATA
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
    
    // LAYOUTS
    if (view.FORMAT_SWITCH) {
        let element = view._element.object;
        for (let i=0; i < element.length; i++) {
            element[i]._width = 0;
            element[i]._height = 0;
            element[i]._left = 0;
            element[i]._top = 0;
            element[i]._font_size = 0;
            element[i]._font_type = null;
        }
    }

    let format = view._layout.format;
    let layout = view._layout.func;

    for (let i=0; i < layout.length; i++) {
        if (format[i] === null) {  layout[i](); }
        else if (format[i] === view.format) { layout[i](); }  
    }
    

    // UPDATE
    // ELEMENTS
    let element = view._element.object;
    let html = view._html.object;

    for (let i=0; i < element.length; i++) {
        
        if (element[i]._width !== 0) { html[i].style.width = element[i]._width + "px"; }
        else { html[i].style.width = "auto"; }
        
        if (element[i]._height !== 0) { html[i].style.height = element[i]._height + "px"; }
        else { html[i].style.height = "auto"; }
        
        html[i].style.left = element[i]._left + "px";
        html[i].style.top = element[i]._top + "px";
        
        // text
        html[i].style.paddingLeft = element[i]._padding_left + "px";
        html[i].style.paddingRight = element[i]._padding_right + "px";
        html[i].style.paddingTop = element[i]._padding_top + "px";
        html[i].style.paddingBottom = element[i]._padding_bottom + "px";

        if (element[i]._font_size !== 0) { html[i].style.fontSize = element[i]._font_size + "px"; }
        if (element[i]._font_type !== null) { html[i].style.fontFamily = element[i]._font_type; }


        // RESET EVENTS
        view.LOAD = 0;
        view.FORMAT_SWITCH = 0;
        view.ORIENTATION_SWITCH = 0;

        element[i].mouse_down = 0;
        element[i].mouse_up = 0;
    }
}



export function setup(view) {
    switch(target) { // move into dom.mjs a
        case "dom":
            view._target = {
                
                // EVENTS
                SETUP: true,
                FORMAT_SWITCH: false,
                ORIENTATION_SWITCH: false,

                // DATA
                root: document.createElement("div"),
                width: document.documentElement.clientWidth,
                height: window.innerHeight,
                scroll_y: window.scrollY,
                format: "",
                orientation: "",
                _elements: {},

                element(id, type) {
                    this._elements[id] = this.root.append(document.createElement(type));
                },

                collect() {},

                render() { _update(view); }

            };
            
            document.body.append(view._target.root);
            
        break;
    }
}



