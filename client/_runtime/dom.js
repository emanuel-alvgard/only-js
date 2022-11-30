import * as virtual from "./virtual.js"

// @
function _collect(view) {

    // AUTO WIDTH / HEIGHT
    view.root.w(document.documentElement.clientWidth)
    view.root.h(document.documentElement.clientHeight)


    let ids = Object.keys(view._virtual)

    for (let i=1; i < ids.length; i++) {
        let id = ids[i]
        let virtual = view._virtual[id]
        let real = view._real[id]
        if (virtual._auto_w) { virtual._w = real.clientWidth }
        if (virtual._auto_h) { virtual._h = real.clientHeight }
    }

    /* format
    if (view.width < 1000) {
        if (view.format === "desktop") { view.FORMAT_SWITCH = 1 } 
        view.format = "mobile"
    }
    if (view.width > 1000) {
        if (view.format === "mobile") { view.FORMAT_SWITCH = 1 } 
        view.format = "desktop"
    }

    // orientation
    if (view.width < window.innerHeight) { 
        if (view.orientation === "horizontal") { view.ORIENTATION_SWITCH = 1 }
        view.orientation = "vertical"  
    }
    if (view.width > window.innerHeight) { 
        if (view.orientation === "vertical") { view.ORIENTATION_SWITCH  = 1 }
        view.orientation = "horizontal" 
    }

    // dimension
    if (view.format === "desktop") {
        view.width =  document.documentElement.clientWidth
        view.height = window.innerHeight
        view.scroll_y = window.scrollY
    }

    if (view.format === "mobile") {
        if (view.FORMAT_SWITCH || view.ORIENTATION_SWITCH) { view.height = window.innerHeight }
        view.width =  document.documentElement.clientWidth
        view.scroll_y = window.scrollY
    }
    */
}



// @
function _update(view) {

    let ids = Object.keys(view._virtual)

    for (let i=0; i < ids.length; i++) {

        let id = ids[i];
        let virtual = view._virtual[id]
        let real = view._real[id]

        if (virtual.UPDATE) {
        
            if (virtual._auto_w) { real.style.width = "auto" }
            else { real.style.width = virtual._w + "px" }
            
            if (virtual._auto_h) { real.style.height = "auto" }
            else { real.style.height = virtual._h + "px" }
            
            real.style.transform = "translate(" + virtual._l + "px," + virtual._t + "px)" // this gets affected by .viewport transform
            real.style.zIndex = virtual._z_index + ""

            // BACKGROUND
            if (virtual._image !== null) { 
                if (real.tagName === "IMG") { real.src = "data:image/jpg;base64," + virtual._image }
                else { real.style.backgroundImage = 'url("data:image/jpg;base64,' + virtual._image + '")' } 
            }

            real.style.backgroundColor = "rgba(" + 
                virtual._color_r + "," +
                virtual._color_g + "," +
                virtual._color_b + "," +  
                virtual._color_a + ")" 
            
            // TEXT
            if (virtual._text !== null) { real.textContent = virtual._text }
            //real.style.paddingLeft = virtual._padding_left + "px"
            //real.style.paddingRight = virtual._padding_right + "px"
            //real.style.paddingTop = virtual._padding_top + "px"
            //real.style.paddingBottom = virtual._padding_bottom + "px"

            // BORDER
            real.style.border = virtual._border
            real.style.borderWidth = virtual._border_size + "px"
            real.style.borderColor = "rgba(" + 
                virtual._border_r + "," +
                virtual._border_g + "," +
                virtual._border_b + "," +  
                virtual._border_a + ")"

            real.style.borderRadius = 
                virtual._border_lt + "px " +
                virtual._border_rt + "px " +
                virtual._border_rb + "px " +
                virtual._border_lb + "px"

            // SHADOW
            real.style.boxShadow =
                virtual._shadow_x + "px " +
                virtual._shadow_y + "px " +
                virtual._shadow_blur + "px rgba(" +
                virtual._shadow_r + "," +
                virtual._shadow_g + "," +
                virtual._shadow_b + "," +  
                virtual._shadow_a + ")"


            if (virtual._text_size !== null) { real.style.fontSize = virtual._text_size + "px" }
            if (virtual._text_font !== null) { real.style.fontFamily = virtual._text_font }

            // visibility
            if (virtual._visible) { real.style.display = "initial" }
            else { real.style.display = "none" }
        }

        // RESET EVENTS
        virtual.MOUSE_DOWN = false
        virtual.MOUSE_UP = false
        virtual.UPDATE = false
    }

    // RESET EVENTS
    view.SETUP = false
    view.FORMAT_SWITCH = false
    view.ORIENTATION_SWITCH = false
}



// @
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
            if (id in view._virtual) { return view._virtual[id] }
            view._virtual[id] = virtual.element(context, view, id)
            return view._virtual[id]
        },
        
        // @DONE
        real(id, type) {

            if (id in view._real) { return view._real[id] }

            let element
            let ssr = document.getElementById(id)
            if (ssr !== undefined && ssr !== null) { element = ssr }
            else { element = document.createElement(type) }
    
            element.id = id
            element.style.display = "block"
            element.style.position = "absolute"
            element.style.margin = "0px"
            element.style.padding = "0px"
            element.style.border = "none"
    
            // @CHECK if this should be here?? maybe swap out for custom intersection system
            //element.onmouseover = () => { virtual.mouse_hover = true }
            //element.onmouseleave = () => {  virtual.mouse_hover = false }
            //element.onmousedown = () => { virtual.mouse_down = true }
            //element.onmouseup = () => { virtual.mouse_up = true }
    
            view._real[id] = element
            if (id !== "root") { view.real("root").append(element) }
        },

        // @DONE
        element(id, type="div") {
            view.real(id, type)
            return view.virtual(id)
        },

        // @DONE
        collect() { _collect(view) },

        // @DONE
        update() { _update(view) },

        show() {},
        hide() {}
    }

    view.root = view.element("root")
    document.body.append(view.real("root"))

    return view
}

