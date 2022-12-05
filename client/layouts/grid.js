// @DONE
export default (bounds, elements, row_gap, column_gap, row_h=null, column_w=null) => {

    // @ADD set bounds.overflow_y("scroll")

    let top = bounds.t()

    elements.forEach(array => {
        array.forEach(item => {
            item
            .w(bounds.w())
            .h(100)
            .l(bounds.l())
            .t(top)
            .z(bounds.z() + 1)

            top += 100 + row_gap

        })
    })
    

    /*
    let border = 0
    if (bounds.border() === "solid") { border = bounds.border_size() }

    let bounds_width = 0
    let bounds_height = 0

    let row_pos = bounds.t() + border
    for (let i=0; i < elements.length; i++) {

        let column_pos = bounds.l() + border
        for (let j=0; j < elements[i].length; j++) {

            elements[i][j].t(row_pos)
            elements[i][j].l(column_pos)
            elements[i][j].h(row_h[i])
            elements[i][j].w(column_w[j])
            elements[i][j].z(bounds.z() + 1)
            
            if (i === 0) { 
                bounds_width += column_w[j] 
                if (j === 0) { elements[i][j].border_radius([bounds._border_lt,0,0,0]) } // @HERE
                if (j === elements[i].length-1) { elements[i][j].border_radius([0,bounds._border_rt,0,0]) }
            }
            if (i === elements.length-1) {
                if (j === elements[i].length-1) { elements[i][j].border_radius([0,0,bounds._border_rb,0]) }
                if (j === 0) { elements[i][j].border_radius([0,0,0,bounds._border_lb]) }
            }
            column_pos += column_w[j] + column_gap
        }

        bounds_height += row_h[i]
        row_pos += row_h[i] + row_gap
    }

    bounds.w(
        bounds_width + 
        (column_gap * (column_w.length - 1)) +
        (border * 2)
    )
    bounds.h(
        bounds_height + 
        (row_gap * (row_h.length - 1)) +
        (border * 2)
    )
    */

    return bounds
}