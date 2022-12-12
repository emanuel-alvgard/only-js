import table from "../components/table.js"

export default (app) => {

    const win = app.view("window")
    const side_nav = win.element("side_nav")
    const dashboard = win.element("dashboard")

    dashboard
        .left(side_nav.right() + 10)
        .top(win.bounds().top() + 10)
        .extend_bottom(win.bounds().bottom() - 10)
        .extend_right(win.bounds().right() - 10)
        .color([255,255,255,1])
        .border_size(1) //
        //.border_color(background)
        .border_radius([3,3,3,3])
        .shadow([0,3,7])
        //.shadow_color(shadow)
        .z(win.bounds().z() + 1)
     
    /*
    const panel = e("dashboard_panel")
    const img_search = e("img_search")
    const toggle = e("mode_toggle")
    const search = e("dashboard_search", "input")
    const filter = e("filter")
    const table = e("table")

    mode_toggle
        .left(main_card.left() + 10)
        .top(main_card.top() + 10)
        .width(50)
        .height(25)
        .z(2)

    toggle(mode_toggle, color_mode)
   

    search
        .x(main_card.x())
        .top(main_card.top() + 50)
        .width(main_card.width() / 3, 300, 1000)
        .height(50)
        .color(second)
        .border("solid")
        .border_size(1)
        .border_color(background)
        .border_radius([3,3,3,3])
        .z(2)
        .padding([10,0,45,0])
        .text_font(alexandria_400)
        .opacity(main_card.opacity())
    

    if (dashboard.SETUP) {
        search.real().placeholder = "Sök kund"
        // @TEST search.real().onclick = () => { context.image("img_logo").reload("search_black.svg") }
    }

    img_search
        .width(25)
        .height(25)
        .z(search.z() + 1)
        .image(_img_search)
        .color(transparent)
        .right(search.right() - 10)
        .y(search.y())
        .opacity(main_card.opacity())



    customer_filter
        .left(main_card.left() + 50)
        .width(300)
        .top(search.bottom() + 25)
        .extend_bottom(main_card.bottom() - 50)
        .color(second)
        .color(second)
        .border("solid") //
        .border_size(1)
        .border_color(background)
        .border_radius([3,3,3,3])
        .z(main_card.z() + 1)
        .opacity(main_card.opacity())


    customer_table
        .extend_right(main_card.right() - 50)
        .top(search.bottom() + 25)
        .left(customer_filter.right() + 10)
        .extend_bottom(main_card.bottom() - 50)
        .z(main_card.z() + 1)
        .color(second)
        .border("solid") //
        .border_size(1)
        .border_color(background)
        .border_radius([3,3,3,3])
        .opacity(main_card.opacity())
    
      
    table(customer_table, mock_data.customers, search)
    */

}