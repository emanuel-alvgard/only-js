export default (container, elements, row_h, column_w, row_gap, column_gap) => {
    
    let row_pos = container.t()
    for (let i=0; elements.length; i++) {
        let column_pos = container.l()
        for (let j=0; elements[i].length; j++) {
            elements[i][j].t(row_pos)
            elements[i][j].l(column_pos)
            elements[i][j].h(row_h[i])
            elements[i][j].w(column_w[i])
            
            column_pos += column_w[i] + column_gap
        }
        row_pos += row_h[i] + row_gap
    }

    return container
}