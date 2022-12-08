import table from "../components/table.js"
import toggle from "../components/toggle.js"

let CONTEXT
let DASHBOARD

let mode = "light"
let background = [220,220,220,1]
let main = [255,255,255,1]
let second = [250, 250, 250, 1]
let shadow = [220,220,220,1]
let transparent = [255,255,255,0]

let location = "main_card"


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




// @DONE
function color_mode() {
    if (mode === "light") {
        background = [120,120,120,1]
        main = [50,50,50,1]
        second = [150, 150, 150, 1]
        shadow = [120,120,120,1]
        mode = "dark"
    }
    else if (mode === "dark") {
        background = [220,220,220,1]
        main = [255,255,255,1]
        second = [245, 245, 245, 1]
        shadow = [100,100,100,1]
        mode = "light"
    }
}

// @DONE
function hover(element) {
    
    if (DASHBOARD.SETUP) {

        let hover = element.anim(
            "hover", 
            element.opacity,
            1.0,
            0.5,
            100
        )
    
        let leave = element.anim(
            "leave", 
            element.opacity,
            0.5,
            1.0,
            100
        )

        element.real().onmouseover = () => { hover.run() }
        element.real().onmouseleave = () => { leave.run() }
    }
}


let loaded = false
let img_loaded = false

export default (context) => {

    let alexandria_400 = context.font("alexandria_400", "alexandria_400.woff2", () => { loaded = true })
    let _img_logo = context.image("img_logo", "logo_white.svg", () => { img_loaded = true })
    let _img_logout = context.image("img_logout", "logout_white.svg", () => { img_loaded = true })
    let _img_search = context.image("img_search", "search_black.svg", () => { img_loaded = true })

    if (loaded) { loaded = false }
    if (img_loaded) { img_loaded = false }

    const dashboard = context.view("dashboard")
    dashboard.bounds.color(second)
    const e = dashboard.element

    const side_nav = e("side_nav")
    const img_logo = e("img_logo")
    const img_logout = e("img_logout")
    const version = e("version")

    const main_card = e("main_card")
    const img_search = e("img_search")
    const mode_toggle = e("mode_toggle")
    const search = e("search", "input")
    const customer_filter = e("customer_filter")
    const customer_table = e("customer_table")

    const customer_card = e("customer_card")

    const all = [side_nav, main_card, search]

    const cards = [main_card, customer_card]


    if (context.SETUP) { 
        CONTEXT = context 
        DASHBOARD = dashboard
    }




    side_nav
        .top(dashboard.bounds.top())
        .left(dashboard.bounds.left())
        .extend_bottom(dashboard.bounds.bottom())
        .width(75)
        .z(1)
        .color([55,60,65,1])
        .shadow([0,3,7]) 
        .shadow_color([50,50,50,1])

    img_logo
        .top(25)
        .height(25)
        .width(img_logo.height() * 0.708)
        .x(side_nav.x())
        .image(_img_logo)
        .z(side_nav.z() + 1)
        .color(transparent)

    version
        .x(side_nav.x())
        .bottom(side_nav.bottom() - 10)
        .text("V.0.1")
        .text_color([240,240,240,1])
        .z(side_nav.z() + 1)
        .text_font(alexandria_400)


    img_logout
        .width(25)
        .height(25)
        .bottom(version.top() - 15)
        .x(side_nav.x())
        .z(side_nav.z() + 1)
        .image(_img_logout)
        .color(transparent)

    hover(img_logout)
    



    cards.forEach(card => {
        card
            .left(side_nav.right() + 10)
            .extend_right(dashboard.bounds.right() - 10)
            .top(dashboard.bounds.top() + 10)
            .extend_bottom(dashboard.bounds.bottom() - 10)
            .color(main)
            .border_size(1) //
            .border_color(background)
            .border_radius([3,3,3,3])
            .shadow([0,3,7])
            .shadow_color(shadow)
            .z(1)
    })

    

    /*mode_toggle
        .left(main_card.left() + 10)
        .top(main_card.top() + 10)
        .width(50)
        .height(25)
        .z(2)

        toggle(mode_toggle, color_mode)*/
    
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
    

    if (dashboard.SETUP) {
        search.real().placeholder = "Sök kund"
    }

    img_search
        .width(25)
        .height(25)
        .z(search.z() + 1)
        .image(_img_search)
        .color(transparent)
        .right(search.right() - 10)
        .y(search.y())



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
    
      
    table(customer_table, mock_data.customers, search)
}