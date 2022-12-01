// @DONE
export default (root, elements, row_gap, column_gap, row_h=null, column_w=null) => {
    
    let border = 0
    if (root.border() === "solid") { border = root.border_size() }

    let root_width = 0
    let root_height = 0

    let row_pos = root.t() + border
    for (let i=0; i < elements.length; i++) {

        let column_pos = root.l() + border
        for (let j=0; j < elements[i].length; j++) {

            elements[i][j].t(row_pos)
            elements[i][j].l(column_pos)
            elements[i][j].h(row_h[i])
            elements[i][j].w(column_w[j])
            elements[i][j].z(root.z() + 1)
            
            if (i === 0) { 
                root_width += column_w[j] 
                if (j === 0) { elements[i][j].border_radius([root._border_lt,0,0,0]) } // @HERE
                if (j === elements[i].length-1) { elements[i][j].border_radius([0,root._border_rt,0,0]) }
            }
            if (i === elements.length-1) {
                if (j === elements[i].length-1) { elements[i][j].border_radius([0,0,root._border_rb,0]) }
                if (j === 0) { elements[i][j].border_radius([0,0,0,root._border_lb]) }
            }
            column_pos += column_w[j] + column_gap
        }

        root_height += row_h[i]
        row_pos += row_h[i] + row_gap
    }

    root.w(
        root_width + 
        (column_gap * (column_w.length - 1)) +
        (border * 2)
    )
    root.h(
        root_height + 
        (row_gap * (row_h.length - 1)) +
        (border * 2)
    )

    return root
}