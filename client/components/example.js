export default (app) => {

    const dashboard = app.view("dashboard")
    const side_nav = dashboard.element("side_nav")
    const card = dashboard.element("card")
    //const box = home.element("box", "div")
    //const input = home.element("in", "input")

    side_nav
        .t(dashboard.root.t())
        .l(dashboard.root.l()) // extend :)
        .extend_b(dashboard.root.b())
        .w(300)
        .z(1)
        .color(100,99,110)

    card
        .x(dashboard.root.x())
        .y(dashboard.root.y())
        .w(500)
        .h(1000)
        .text("This is a card")
        .color(240,240,240)
        .border_radius(25,25,25,25)
    
    /*
    box
        .w(100)
        .h(100)
        .r(b.l())
        .b(b.t())
        .color(200,200,200)

    input
        .w(200)
        .h(35)
        .b(box.t())
        .r(box.l())
        .border("solid")
        .border_radius(5,5,5,5)
    */

    //input.real().style.boderStyle = ""

}