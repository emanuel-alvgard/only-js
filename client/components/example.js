export default (app) => {

    const home = app.view("home")
    const b = home.element("b", "button")

    b.
        x(home.root.x()).
        y(home.root.y()).
        //w(100).
        //h(25).
        text("click meeeeeeeeeeee!").
        color(225,225,225)

    const box = home.element("box")
    
    box.
        w(100).
        h(100).
        r(b.l()).
        b(b.t()).
        color(200,200,200)

}