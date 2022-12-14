import table from "../tools/table.js"
import * as color from "../tools/color.js"


// @TEST
let mock_data = {
    customers: []
}

for (let i=0; i < 100; i++) {
    mock_data.customers.push({
        name: "CUSTOMER " + (i + 1),
        number: "000"+ (i + 1),
        test: "test " + (i + 1)
    })
}



export default (app) => {

    app.image("search", "search.svg")

    const _window = app.view("window")
    const side_nav = _window.element("side_nav")
    const dashboard = _window.element("dashboard")

    const input = dashboard.element("input", "input")
    const search = dashboard.element("search")
    const filter = dashboard.element("filter")
    const _table = dashboard.element("table")

    dashboard
        .top(_window.bounds().top() + 10)
        .left(side_nav.right() + 10)
        .extend_right(_window.bounds().right() - 10)
        .extend_bottom(_window.bounds().bottom() - 10)
        .color([255,255,255,1])
        .border_size(1) //
        .border_color(color.background)
        .border_radius([3,3,3,3])
        .shadow([0,3,7])
        .shadow_color(color.shadow)
        .z(_window.bounds().z() + 1)

    input
        .x(dashboard.x())
        .top(dashboard.top() + 50)
        .width(dashboard.width() / 3, 300, 1000)
        .height(50)
        .color(color.second)
        .border("solid")
        .border_size(1)
        .border_color(color.background)
        .border_radius([3,3,3,3])
        .z(dashboard.z() + 1)
        .padding([10,0,45,0])
        .text_font(app.font("alexandria_400"))

    if (dashboard.SETUP) {
        input.real().placeholder = "Sök kund"
    }

    search
        .width(25)
        .height(25)
        .z(input.z() + 1)
        .image(app.image("search"))
        .color(color.transparent)
        .right(input.right() - 10)
        .y(input.y())


    filter
        .left(dashboard.left() + 50)
        .width(300)
        .top(input.bottom() + 25)
        .extend_bottom(dashboard.bottom() - 50)
        .color(color.second)
        .color(color.second)
        .border("solid")
        .border_size(1)
        .border_color(color.background)
        .border_radius([3,3,3,3])
        .z(dashboard.z() + 1)


    _table
        .extend_right(dashboard.right() - 50)
        .top(input.bottom() + 25)
        .left(filter.right() + 10)
        .extend_bottom(dashboard.bottom() - 50)
        .z(dashboard.z() + 1)
        .color(color.second)
        .border("solid")
        .border_size(1)
        .border_color(color.background)
        .border_radius([3,3,3,3])
        .opacity(dashboard.opacity())
    
      
    table(_table, mock_data.customers, input)


    let fade_in = dashboard.anim(
        "fade_in", 
        dashboard.opacity, 
        0.0, 
        1.0, 
        100, 
        [0,0,0,4]
    )

    let fade_out = dashboard.anim(
        "fade_out", 
        dashboard.opacity, 
        1.0, 
        0.0, 
        100, 
        [0,0,0,4]
    )


    //if (fade_out.DONE) { dashboard.hide() }
    
    if (app.location().SWITCH) {
        
        if (app.location().path === "dashboard") {
            fade_in.run()
            dashboard.show()
        }
        else {
            if (app.SETUP) { dashboard.hide() }
            else { /*fade_out.run()*/ dashboard.hide() }
        }
    }
}