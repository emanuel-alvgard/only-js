import * as virtual from "./virtual.js"

// @
function _collect(view) {

    // AUTO WIDTH / HEIGHT
    view.bounds.w(document.documentElement.clientWidth)
    view.bounds.h(document.documentElement.clientHeight)

    for (id in view._virtual) {
        if (id === "bounds") { continue }
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


// @ADD take children into account
// @
function _update(view) {

    for (id in view._virtual) {

        let virtual = view._virtual[id]
        let real = view._real[id]

        if (virtual.UPDATE) {
        
            if (virtual._auto_w) { real.style.width = "auto" }
            else { real.style.width = virtual._w + "px" }
            
            if (virtual._auto_h) { real.style.height = "auto" }
            else { real.style.height = virtual._h + "px" }
            
            real.style.transform = "translate(" + virtual._l + "px," + virtual._t + "px)" // this gets affected by .view.port transform
            real.style.zIndex = virtual._z_index + ""

            // BACKGROUND
            if (virtual._image !== null) { 
                if (real.tagName === "IMG") { 
                    real.src = "data:image/jpg;base64," + virtual._image
                    real.style.objectPosition = virtual._image_position
                    real.style.objectFit = virtual._image_fit
                }
                else { 
                    real.style.backgroundImage = 'url("data:application/octet-stream;base64,' + virtual._image + '")'
                    real.style.backgroundPosition = virtual._image_position
                    real.style.backgroundSize = virtual._image_fit 
                } 
            }

            real.style.objectPosition = virtual._image_position
            real.style.objectFit = virtual._image_fit

            real.style.backgroundColor = "rgba(" + 
                virtual._color_r + "," +
                virtual._color_g + "," +
                virtual._color_b + "," +  
                virtual._color_a + ")" 
            
            // TEXT
            if (virtual._text !== null) { real.textContent = virtual._text }
            real.style.paddingLeft = virtual._padding_l + "px "
            real.style.paddingTop = virtual._padding_t + "px "
            real.style.paddingRight = virtual._padding_r + "px "
            real.style.paddingBottom = virtual._padding_b + "px "

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
            if (virtual._visible) { real.style.display = "block" }
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

        bounds: null,
        port: null,
        _virtual: {},
        _real: {},

        // @DONE
        virtual(id) {
            if (id in view._virtual) { return view._virtual[id] }
            view._virtual[id] = virtual.element(context, view, id)
            return view._virtual[id]
        },
        
        // @DONE
        real(id, type, bounds) {

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
            element.style.backgroundRepeat = "no-repeat"
            element.style.boxSizing = "border-box"
    
            view._real[id] = element
            if (id !== "bounds") { bounds.real().append(element) }
        },

        // @DONE
        element(id, type="div", bounds=view.bounds) {
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

    view.bounds = view.element("bounds")
    document.body.append(view.real("bounds"))

    return view
}

