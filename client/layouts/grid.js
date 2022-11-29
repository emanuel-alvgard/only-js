// @DONE
export default (container, elements, row_h, column_w, row_gap, column_gap) => {
    
    let border = 0
    if (container.border() === "solid") { border = container.border_size() }

    let container_width = 0
    let container_height = 0

    let row_pos = container.t() + border
    for (let i=0; i < elements.length; i++) {

        let column_pos = container.l() + border
        for (let j=0; j < elements[i].length; j++) {

            elements[i][j].t(row_pos)
            elements[i][j].l(column_pos)
            elements[i][j].h(row_h[i])
            elements[i][j].w(column_w[i])
            elements[i][j].z(container.z() + 1)
            
            if (i === 0) { container_width += column_w[j] }
            column_pos += column_w[i] + column_gap
        }

        container_height += row_h[i]
        row_pos += row_h[i] + row_gap
    }

    container.w(container_width + (column_gap * (column_w.length - 1)))
    container.h(container_height + (row_gap * (row_h.length - 1)))

    return container
}