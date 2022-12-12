// @ADD pagination

// @DONE
export default (bounds, data, search) => { // bounds = element(), data = { [ {} ] }, search = element()


    // SETUP
    bounds.overflow_y("scroll")
    let view = bounds.view()
    let input = search.real().value.toUpperCase()


    let visible = []
    let rows = []
    let customers = []

    // CREATE / GET ELEMENTS
    for (let i=0; i < data.length; i++) {

        rows.push(view.element(
            bounds.id() + "_row_" + i,
            "div",
            bounds
        ))

        let j = 0
        let items = []
        let show = false
        for (const key in data[i]) {

            if (input === "" || data[i][key].toUpperCase().includes(input)) { show = true }
            
            items.push(view.element(
                data[i][key] + "_" + i + "_" + j, 
                "div", 
                bounds
            ))
        }
        if (show) { visible.push(true) }
        else { visible.push(false) }
        customers.push(items)
    }


    
    // SHOW / HIDE
    // convert input to uppercase
    let row_height = 50
    let row_top = bounds.top()
    let row_y = bounds.top() + (row_height / 2)
    
    for (let i=0; i < rows.length; i++) {

        let margin = 25
        let column_width = bounds.width() / customers[i].length
        let column_l = bounds.left()
        let keys = Object.keys(data[i])

        for (let j=0; j < customers[i].length; j++) {
            
            column_l += margin

            customers[i][j].anim("fade", customers[i][j].opacity, 0.0, 1.0, 200)
                
            if (visible[i]) {
            
                customers[i][j]
                    .left(column_l)
                    .y(row_y)
                    .z(rows[i].z() + 1)
                    .text(data[i][keys[j]])
                    .text_font(bounds.context().font("alexandria_400"))
                    .show()
                    //.anim("fade").run()
                
                if (bounds.context().SETUP) {
                    customers[i][j].real().style.cursor = "pointer" 
                    customers[i][j].real().onmouseover = () => { rows[i].brightness(0.95) }
                    customers[i][j].real().onmouseleave = () => { rows[i].brightness(1.0) }
                    customers[i][j].real().onclick = () => { 
                        bounds.context().location.switch("customer")
                        //bounds.context().location.customer_index = i 
                    }
                }
            }
            else { customers[i][j].hide() }
            column_l += column_width    
        }

        
        if (visible[i]) {
            
            rows[i]
                .z(bounds.z() + 1)
                .width(bounds.width())
                .height(row_height)
                .left(bounds.left())
                .top(row_top)
                .color([250, 250, 250, 1])
                .border_bottom("solid")
                .border_color([220, 220, 220, 1])
                .show()

            if (bounds.context().SETUP) {
                rows[i].real().style.cursor = "pointer"  
                rows[i].real().onmouseover = () => { rows[i].brightness(0.95) }
                rows[i].real().onmouseleave = () => { rows[i].brightness(1.0) }
                rows[i].real().onclick = () => { 
                    bounds.context().location.switch("customer")
                    //bounds.context().location.customer_index = i //@NOT
                    //console.log(bounds.context().location.customer_index) // @NOT
                }
            }
            row_top += row_height
            row_y += row_height
        }
        else { rows[i].hide() }
    }
}



