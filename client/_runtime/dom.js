import * as virtual from "./virtual.js"

// @
function _collect(view) {

    // AUTO WIDTH / HEIGHT
    view.bounds().width(document.documentElement.clientWidth)
    view.bounds().height(document.documentElement.clientHeight)

    for (const id in view._virtual) {
        
        if (view._virtual[id].bounds() === null) { continue }
        
        let virtual = view._virtual[id]
        let real
        
        if (id in view._real) { real = view._real[id] }
        else { continue }
        
        if (virtual._auto_width) {
            if (real.clientWidth !== virtual._width) { virtual._width = real.clientWidth; virtual.UPDATE = true } 
        }
        if (virtual._auto_height) { 
            if (real.clientHeight !== virtual._height) { virtual._height = real.clientHeight; virtual.UPDATE = true }
        }
    }
}



// @EDIT rewrite whole function to create 1 string and set body.innerHTML?
// maybe solves the problem with rendering out of sync

// @EDIT rewrite so that the previous frame data is kept for update comparison
// this makes it so that every check i made in update() 

//let debounce = 3
//let count = 0

// @
function _update(view) {

    for (const id in view._virtual) {

        let virtual = view._virtual[id]
        let prev = view._virtual_prev[id]
        let real
        if (id in view._real) { real = view._real[id] }
        else { continue }

        for (const id in virtual._anims) {
            virtual._anims[id].update()
        }

        

        /*
        if (virtual._bounds !== null) {
            //if (count === debounce) {
                if ((virtual._l + virtual._w) < virtual._bounds._l) { continue } // @HERE this recks scrolling
                if ((virtual._t + virtual._h) < virtual._bounds._t) { continue }
                if (virtual._l > (virtual._bounds._l + virtual._bounds._w)) { continue }
                if (virtual._t > (virtual._bounds._t + virtual._bounds._h)) { continue }
                //count = 0
            //}
            //count ++
        }
        */
    
        // AUTO WIDTH / HEIGHT
        if (virtual._auto_width !== prev._auto_width) {
            if (virtual._auto_width) { real.style.width = "auto"; prev._auto_width = virtual._auto_width }
            else { real.style.width = virtual._width + "px"; prev._width = virtual._width }
        }
     
        if (virtual._auto_height !== prev._auto_height) {
            if (virtual._auto_height) { real.style.height = "auto"; prev._auto_height = virtual._auto_height }
            else { real.style.height = virtual._height + "px"; prev._height = virtual._height }
        }

        // WIDTH / HEIGHT
        if (!virtual._auto_width) { 
            if (virtual._width !== prev._width) { real.style.width = virtual._width + "px"; prev._width = virtual._width }
        }

        if (!virtual._auto_height) { 
            if (virtual._height !== prev._height) { real.style.height = virtual._height + "px"; prev._height = virtual._height }
        }


        // TRANSFORM
        if (
            virtual._left !== prev._left ||
            virtual._top !== prev._top
        ) {

            let left = virtual._left
            let top = virtual._top

            if (virtual._bounds !== null) {
                left -= virtual._bounds._left
                top -= virtual._bounds._top
            }

            if (id === "window_dashboard") { console.log("update") }

            real.style.transform = "translate(" + left + "px," + top + "px)" // this gets affected by .view.port transform

            prev._left = virtual._left
            prev._top = virtual._top
        }

        // Z-INDEX
        if (virtual._z_index !== prev._z_index) { 
            real.style.zIndex = Math.round(virtual._z_index) + ""
            prev._z_index = virtual._z_index
        }


        // BACKGROUND
        if (virtual._image !== null) {

            if (virtual._image !== prev._image) { 

                if (real.tagName === "IMG") { real.src = "data:image/svg+xml;base64," + virtual._image }
                else { real.style.backgroundImage = 'url("data:image/svg+xml;base64,' + virtual._image + '")' }
                
                prev._image = virtual._image 
            }
        }

        if (virtual._image_position !== prev._image_position || view.SETUP) {
            real.style.objectPosition = virtual._image_position
            real.style.backgroundPosition = virtual._image_position  
            prev._image_position = virtual._image_position 
        }
        if (virtual._image_fit !== prev._image_fit || view.SETUP) {
            real.style.objectFit = virtual._image_fit
            real.style.backgroundSize = virtual._image_fit
            prev._image_fit = virtual._image_fit 
        }


        if (
            virtual._color_r !== prev._color_r ||
            virtual._color_g !== prev._color_g ||
            virtual._color_b !== prev._color_b ||
            virtual._color_a !== prev._color_a
        ) {
            real.style.backgroundColor = "rgba(" + 
                virtual._color_r + "," +
                virtual._color_g + "," +
                virtual._color_b + "," +  
                virtual._color_a + ")"

            prev._color_r = virtual._color_r
            prev._color_g = virtual._color_g
            prev._color_b = virtual._color_b
            prev._color_a = virtual._color_a
        }
        


        // TEXT
        if (virtual._text !== null) { 
            if (virtual._text !== prev._text) {
                real.textContent = virtual._text
                prev._text = virtual._text
            } 
        }

        if (
            virtual._text_r !== prev._text_r ||
            virtual._text_g !== prev._text_g ||
            virtual._text_b !== prev._text_b ||
            virtual._text_a !== prev._text_a
        ) {
            real.style.color = "rgba(" + 
                virtual._text_r + "," +
                virtual._text_g + "," +
                virtual._text_b + "," +  
                virtual._text_a + ")"

            prev._text_r = virtual._text_r
            prev._text_g = virtual._text_g
            prev._text_b = virtual._text_b
            prev._text_a = virtual._text_a
        }

        /*
        real.style.paddingLeft = virtual._padding_left + "px "
        real.style.paddingTop = virtual._padding_top + "px "
        real.style.paddingRight = virtual._padding_right + "px "
        real.style.paddingBottom = virtual._padding_bottom + "px "



        // BORDER
        real.style.borderLeft = virtual._border_left
        real.style.borderTop = virtual._border_top
        real.style.borderRight = virtual._border_right
        real.style.borderBottom = virtual._border_bottom
        
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



        // OVERFLOW
        real.style.overflowX = virtual._overflow_x
        real.style.overflowY = virtual._overflow_y



        // VISIBILITY
        if (virtual._visible) { real.style.display = "block" }
        else { real.style.display = "none" }



        // FILTER
        real.style.filter = "brightness(" + virtual._brightness + ")"

*/

        // VISIBILITY
        // @TEST
        if (virtual._opacity !== prev._opacity) { real.style.opacity = virtual._opacity + ""; prev._opacity = virtual._opacity }

        // RESET EVENTS
        virtual.SETUP = false
        virtual.UPDATE = false
        virtual.HOVER = false
        virtual.LEAVE = false
        virtual.CLICK = false
    }

    view.SETUP = false

    return
}



// @
export function setup(context, id) {

    const view = {

        SETUP: true,

        _id: id,
        _bounds: null,
        _port: null,
        _virtual_prev: {},
        _virtual: {},
        _real: {},

        // @DONE
        bounds() { return view._bounds },

        // @DONE
        virtual(id, bounds=view._bounds) {

            let _id = id
            if (bounds !== null) { _id = bounds.id() + "_" + id }

            if (_id in view._virtual) {
                if (bounds.id !== view._virtual[_id].bounds().id) {
                    console.log("Invalid bounding element (" + bounds.id() + ") for (" + _id + ")")
                    return
                } 
                return view._virtual[_id]
            }
            view._virtual[_id] = virtual.element(context, view, bounds, _id)
            view._virtual_prev[_id] = virtual.element(context, view, bounds, _id)
            return view._virtual[_id]
        },
        
        // @HERE
        real(id, type, bounds=view._bounds) {

            let _id = id
            if (bounds !== null) { _id = bounds.id() + "_" + id }

            if (_id in view._real) { return view._real[_id] }

            let element
            let ssr = document.getElementById(_id)
            if (ssr !== undefined && ssr !== null) { element = ssr }
            else { element = document.createElement(type) }

            //if (bounds !== null) { console.log(bounds.real()) }
    
            element.id = _id
            element.style.display = "block"
            element.style.position = "absolute"
            element.style.margin = "0px"
            element.style.padding = "0px"
            element.style.border = "none"
            element.style.backgroundRepeat = "no-repeat"
            element.style.boxSizing = "border-box"
            element.style.overflow = "hidden"
            element.style.outline = "rgba(0,0,0,0)"

            // remove default selection behavior

            //console.log(element)
    
            view._real[_id] = element
            if (bounds !== null) { bounds.real().append(element) }
            else { document.body.append(element) }
        },

        // @DONE
        element(id, type=null, bounds=view._bounds) {
            if (type === null) { return view.virtual(id, bounds) }
            view.real(id, type, bounds)
            return view.virtual(id, bounds)
        },

        // @DONE
        collect() { _collect(view) },

        // @DONE
        update() { _update(view) },
    }

    view._bounds = view.element(id, "div", null)
    return view
}

