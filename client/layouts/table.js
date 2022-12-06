// @DONE
export default (bounds, items) => {

    bounds.overflow_y("scroll")

    let row_height = 50

    let x = bounds.left()
    let y = bounds.top() + (row_height / 2)

    items.forEach(row => {

        // create row element based on bounds id

        x = bounds.left()
        row.forEach(item => {
            item
                .x(x)
                .y(y)
                .z(bounds.z() + 1)

            x += 100
        })
        y += row_height
    })
}