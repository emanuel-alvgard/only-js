// @DONE
export default (bounds, items) => {

    bounds.overflow_y("scroll")
    let view = bounds.view()

    let row_height = 50
    let row_top = bounds.top()
    let row_y = bounds.top() + (row_height / 2)

    let i = 0
    items.forEach(row => {

        const bg = view.element(
            bounds.id() + "_row_" + i,
            "div",
            bounds
        )

        bg
            .z(bounds.z() + 1)
            .width(bounds.width())
            .height(row_height)
            .left(bounds.left())
            .top(row_top)
            .color([250, 250, 250, 1])
            .border_bottom("solid")
            .border_color([220, 220, 220, 1])

        if (bounds.context().SETUP) {
            bg.real().style.cursor = "pointer"  
            bg.real().onmouseover = () => { bg.brightness(0.95) }
            bg.real().onmouseleave = () => { bg.brightness(1.0) }
            bg.real().onclick = () => { 
                bounds.context().location.path = "customer"
                bounds.context().location.customer_index = i //@NOT
                console.log(bounds.context().location.customer_index) // @NOT
            }
        }

        let margin = 25
        let column_width = bounds.width() / row.length
        let column_l = bounds.left()
        let j = 0
        row.forEach(item => {

            column_l += margin

            item
                .left(column_l)
                .y(row_y)
                .z(bg.z() + 1)

            if (bounds.context().SETUP) {
                item.real().style.cursor = "pointer" 
                item.real().onmouseover = () => { bg.brightness(0.95) }
                item.real().onmouseleave = () => { bg.brightness(1.0) }
                item.real().onclick = () => { 
                    bounds.context().location.path = "customer"
                    bounds.context().location.customer_index = i 
                }
            }

            column_l += column_width
            j ++
        })
        row_top += row_height
        row_y += row_height
        i ++
    })
}