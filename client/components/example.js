export default (app) => {

    const home = app.view("home")
    const b = home.element("b", "button")

    if (home.SETUP) { console.log("setup") }

    b.
        x(home.root.x()).
        y(home.root.y()).
        w(100).
        h(25)
        //text("click me!")

}