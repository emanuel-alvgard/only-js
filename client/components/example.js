export default (app) => {

    const home = app.view("home")
    const b = home.element("b", "button")
    const box = home.element("box", "div")
    const input = home.element("in", "input")

    b
        .x(home.root.x())
        .y(home.root.y())
        .text("click meeeeeeeeeeee!")
        .color(225,225,225)
        .border("solid")
        .border_radius(10,10,10,10)
    
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

    //input.real().style.boderStyle = ""

}