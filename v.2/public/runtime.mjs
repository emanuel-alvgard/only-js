// @ADD
// animations
// intersection
// swap left and top html css properties for translate x,y
// add fixed_left(pos) function to element
// fixed_top
// nice system for fetching and using fonts
// most common css properties to runtime

// FONTS
let _fonts = {
    target: 3,
    loaded: 0,
}

//let roboto_400 = new FontFace("roboto_400", "url(https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu4mxK.woff2)");
//let roboto_mono_700 = new FontFace("roboto_mono_700", "url(https://fonts.gstatic.com/s/robotomono/v21/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_Of2_ROW4.woff2)");
//let roboto_900 = new FontFace("roboto_900", "url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmYUtfBBc4.woff2)");
//let libre_bodoni_700 = new FontFace("libre_bodoni_700", "url(https://fonts.gstatic.com/s/librebodoni/v2/_Xm--H45qDWDYULr5OfyZudXzSBgY2oMBGte6GpY8WvTcQ.woff2)");
let montserrat_light = new FontFace("montserrat_light", "url(https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCs16Hw5aXo.woff2)");
let montserrat_regular = new FontFace("montserrat_regular", "url(https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Hw5aXo.woff2)");
let montserrat_bold = new FontFace("montserrat_bold", "url(https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCuM73w5aXo.woff2)");
let lato_light = new FontFace("lato_light", "url(https://fonts.gstatic.com/s/lato/v23/S6u9w4BMUTPHh7USSwiPGQ.woff2) format('woff2')");
let lato_bold = new FontFace("lato_bold", "url(https://fonts.gstatic.com/s/lato/v23/S6u9w4BMUTPHh6UVSwiPGQ.woff2)");
let secular_one_regular = new FontFace("secular_one_regular", "url(https://fonts.gstatic.com/s/secularone/v11/8QINdiTajsj_87rMuMdKyqDiOOg.woff2)");
let oswald_bold = new FontFace("oswald_bold", "url(https://fonts.gstatic.com/s/oswald/v49/TK3_WkUHHAIjg75cFRf3bXL8LICs1xZosUZiZQ.woff2)");

// @ADD integrate above into this function
async function font(f) {
    await f.load();
    document.fonts.add(f);
    _fonts.loaded += 1;
}

//font(roboto_400);
//font(roboto_mono_700);
//font(libre_bodoni_700);
//font(roboto_900);
font(montserrat_light);
font(montserrat_regular);
font(montserrat_bold);
font(lato_light);
font(lato_bold);
font(secular_one_regular);
font(oswald_bold);




// @DONE
function _min(object, property, value=null) {
    if (value !== null) {
        if (object[property] < value) {
            object[property] = value; 
        }
    }
}

// @DONE
function _max(object, property, value=null) {
    if (value !== null) {
        if (object[property] > value) {
            object[property] = value; 
        }
    }
}



// @DONE
function _layout(context, func, format=null) {
    context.view._layout.format.push(format);
    context.view._layout.func.push(func);
    return;
}


// @DONE
function _html(context, id, type) {
    
    let html = context.view._html;
    let exist = html.id.indexOf(id);
    if (exist !== -1) { return html.object[exist]; }

    let root = context.view.root;
    exist = root.getElementsByClassName(id);
    let object;

    if (exist.length === 0) { 
        object = document.createElement(type);
        object.classList.add(id);
        root.append(object);
    }
    else {
        object = exist[0];
    }

    html.id.push(id);
    html.object.push(object);

    return object; 

}


// @DONE
function _element(context, id, type="div") {

    let element = context.view._element;
    let exist = element.id.indexOf(id);
    if (exist !== -1) { return element.object[exist]; }

    _html(context, id, type);

    let html = context.view._html.object;
    let index = element.object.length;

    element.id.push(id);
    element.object.push({
        
        // EVENTS
        mouse_hover: 0,
        mouse_down: 0,
        mouse_up: 0,

        // DATA
        _tag: { id: [] },
        _left: 0,
        _top: 0,
        _width: 0,
        _height: 0,
        _font_size: 0,
        _font_type: null,
        _padding_left: 0,
        _padding_right: 0,
        _padding_top: 0,
        _padding_bottom: 0,

        // INTERFACE
        tag(object) { this._tag.id.push(object.id); return this; },

        // dimension
        width(w=null, min=null, max=null) {
            if (w !== null) { 
                this._width = w; 
                _min(this, "_width", min);
                _max(this, "_width", max);
                return this;
            } 
            if (this._width === 0) { return html[index].clientWidth; }
            else { return this._width; }
        },
        height(h=null, min=null, max=null) { 
            if (h !== null) { 
                this._height = h; 
                _min(this, "_height", min);
                _max(this, "_height", max);
                return this; 
            }
            if (this._height === 0) { return html[index].clientHeight; }
            else { return this._height; }
        },

        // position
        left(l=null, min=null, max=null) { 
            if (l !== null) { this._left = l; return this; } 
            return this._left; 
        },
        top(t=null, min=null, max=null) { 
            if (t !== null) { this._top = t; return this; }
            return this._top; 
        },
        right(r=null, min=null, max=null) {
            if (r !== null) { this._left = r - this.width(); return this; }
            return this._left + this.width(); 
        },
        bottom(b=null, min=null, max=null) {
            if (b !== null) { this._top = b - this.height(); return this; }
            return this._top + this.height(); 
        },

        // extension
        extend_bottom(y=null, min=null, max=null) {
            if (y !== null) { this.height(y - this.top(), min, max);}
            return this.height();
        },
        
        extend_right(r=null, min=null, max=null) {
            if (r !== null) { this.width(r - this.left(), min, max);}
            return this.width();
        },

        // local
        mid_x() { return this.width() / 2; },
        mid_y() { return this.height() / 2; },

        // global
        center_x(x=null, min=null, max=null) {
            if (x !== null) { this._left = x - this.mid_x(); } 
            return this._left + this.mid_x(); 
        },
        center_y(y=null, min=null, max=null) { 
            if (y !== null) { this._top = y - this.mid_y(); }
            return this._top + this.mid_y(); 
        },


        // text
        padding(left=null, right=null, top=null, bottom=null) {
            if (left !== null) { this._padding_left = left; }
            if (right !== null) { this._padding_right = right; }
            if (top !== null) { this._padding_top = top; }
            if (bottom !== null) { this._padding_bottom = bottom; }
        },

        font(size=null, type=null, min=null, max=null) {
            if (size !== null) { this._font_size = size; }
            if (type !== null) { this._font_type = type; }
            _min(this, "_font_size", min);
            _max(this, "_font_size", max);
        },

        // visibility
        show() { html[index].style.display = "initial"; return this; },
        hide() { html[index].style.display = "none"; return this; }

    });

    html[index].onmouseover = () => { element.object[index].mouse_hover = 1; }
    html[index].onmouseleave = () => {  element.object[index].mouse_hover = 0; }
    html[index].onmousedown = () => { element.object[index].mouse_down = 1; }
    html[index].onmouseup = () => { element.object[index].mouse_up = 1; }

    return element.object[index];

}



// @
function _tag(context, id) {

    // check if tag exists, if not create new object, else return existing object

    let tag = context.view._tag;
    let elements = context.view._element.object;

    let index = tag.object.length;

    tag.id.push(id);
    tag.object.push({
        
        id: id,

        padding(left=null, right=null, top=null, bottom=null) {

            for (let i=0; i < elements.length; i++) {

                let j = elements[i]._tag.id.indexOf(this.id);
                if (j === -1) { continue; }
                
                if (left !== null) { elements[i]._padding_left = left; }
                if (right !== null) { elements[i]._padding_right = right; }
                if (top !== null) { elements[i]._padding_top = top; }
                if (bottom !== null) { elements[i]._padding_bottom = bottom; }
                
            }
        },
    });
    
    return tag.object[index];
}



// @
function runtime_setup(context) {

    context.view = {

        // EVENTS
        PAGE_LOAD: 1,
        FORMAT_SWITCH: 0,
        ORIENTATION_SWITCH: 0,

        // DATA
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
        element(id, type="div") { return _element(context, id, type); },
        tag(id) { return _tag(context, id); },
        html(id, type="div") { return _html(context, id, type); },
        show() {},
        hide() {},
        remove() {}

    }
    
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

    return;
}







// @DONE
function _update(context) {
    
    let view = context.view;

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
        view.PAGE_LOAD = 0;
        view.FORMAT_SWITCH = 0;
        view.ORIENTATION_SWITCH = 0;

        element[i].mouse_down = 0;
        element[i].mouse_up = 0;
    }
}








// @DONE
export function run(context) {

    _update(context);

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