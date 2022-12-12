import table from "../components/table.js"
import toggle from "../components/toggle.js"
import dashboard from "./dashboard.js"
import customer from "./customer.js"

let CONTEXT
let VIEW

let mode = "light"
let background = [220,220,220,1]
let main = [255,255,255,1]
let second = [250, 250, 250, 1]
let shadow = [220,220,220,1]
let transparent = [255,255,255,0]

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
    
    if (VIEW.SETUP) {

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


export default (context) => {

    let alexandria_400 = context.font("alexandria_400", "alexandria_400.woff2")
    let _img_logo = context.image("img_logo", "logo_white.svg")
    let _img_logout = context.image("img_logout", "logout_white.svg")
    let _img_search = context.image("img_search", "search_black.svg")

    const view = context.view("window")
    view.bounds().color(second)
    const e = view.element

    const side_nav = e("side_nav")
    const img_logo = e("img_logo")
    const img_logout = e("img_logout")
    const version = e("version")

    if (context.SETUP) { 
        CONTEXT = context 
        VIEW = view
        context.location.path = "main"
    }


    side_nav
        .top(view.bounds().top())
        .left(view.bounds().left())
        .extend_bottom(view.bounds().bottom())
        .width(75)
        .z(10)
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



    dashboard(context)
    customer(context)

    if (view.SETUP) {
        console.log(view._real)
    }


}