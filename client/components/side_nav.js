import table from "../tools/table.js"
import toggle from "../tools/toggle.js"
import * as color from "../tools/color.js"




// @DONE
function hover(element) {
    
    if (element.SETUP) {

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
        
        element.real().style.cursor = "pointer"
        element.real().onmouseover = () => { hover.run() }
        element.real().onmouseleave = () => { leave.run() }
    }
}




export default (app) => {

    app.image("logo", "logo.svg")
    app.image("logout", "logout.svg")

    const _window = app.view("window")
    _window.bounds().color(color.second) // @MOVE into window.js

    const side_nav = _window.element("side_nav", "div")
    const logo = _window.element("logo", "div")
    const logout = _window.element("logout", "div")
    const version = _window.element("version", "div")

    if (app.SETUP) {
        logo.real().style.cursor = "pointer"
        logo.real().onclick = () => { app.location("dashboard") }
    }


    side_nav
        .top(_window.bounds().top())
        .left(_window.bounds().left())
        .extend_bottom(_window.bounds().bottom())
        .width(75)
        .z(10)
        .color([55,60,65,1])
        .shadow([0,3,7]) 
        .shadow_color([50,50,50,1])

    logo
        .top(25)
        .height(25)
        .width(logo.height() * 0.708)
        .x(side_nav.x())
        .image(app.image("logo"))
        .z(side_nav.z() + 1)
        .color(color.transparent)

    version
        .x(side_nav.x())
        .bottom(side_nav.bottom() - 10)
        .text("V.0.1")
        .text_color([240,240,240,1])
        .z(side_nav.z() + 1)
        .text_font(app.font("alexandria_400"))

    logout
        .width(25)
        .height(25)
        .bottom(version.top() - 15)
        .x(side_nav.x())
        .z(side_nav.z() + 1)
        .image(app.image("logout"))
        .color(color.transparent)

    hover(logout)



}