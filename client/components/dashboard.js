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
    app.font("alexandria_400", "alexandria_400.woff2")

    const _window = app.view("window")
    const side_nav = _window.element("side_nav")
    const dashboard = _window.element("dashboard")
    const e = _window.element
    const toggle = e("mode_toggle")
    const input = e("input", "input")
    const search = e("search")
    const filter = e("filter")
    const _table = e("table")

    dashboard
        .top(_window.bounds().top() + 10)
        .extend_bottom(_window.bounds().bottom() - 10)
        .color([255,255,255,1])
        .border_size(1) //
        .border_color(color.background)
        .border_radius([3,3,3,3])
        .shadow([0,3,7])
        .shadow_color(color.shadow)
        .z(_window.bounds().z() + 1)
     
    /*
    mode_toggle
        .left(main_card.left() + 10)
        .top(main_card.top() + 10)
        .width(50)
        .height(25)
        .z(2)

    toggle(mode_toggle, color_mode)
   */

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
        .opacity(dashboard.opacity())
    

    if (dashboard.SETUP) {
        search.real().placeholder = "Sök kund"
    }

    search
        .width(25)
        .height(25)
        .z(input.z() + 1)
        .image(app.image("search"))
        .color(color.transparent)
        .right(input.right() - 10)
        .y(input.y())
        .opacity(dashboard.opacity())



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
        .opacity(dashboard.opacity())


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


    if (app.location.path === "main") {
        dashboard
            .left(side_nav.right() + 10)
            .extend_right(_window.bounds().right() - 10)
    }
    if (app.location.path === "customer" && app.location.SWITCH) {

        let slide = dashboard.anim(
            "slide", 
            dashboard.right, 
            dashboard.right(), 
            _window.bounds().left() - 100, 
            500, 
            [0,0,0,4]
        )

        let fade = dashboard.anim(
            "fade", 
            dashboard.opacity, 
            1.0, 
            0.0, 
            300, 
            [0,0,3]
        )

        slide.run()
        fade.run() 

    }

}