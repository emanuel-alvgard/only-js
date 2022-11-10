export default (app) => {

    const home = app.view("home")
    let b = home.element("b", "button")

    b.
        x(home.root.x()).
        y(home.root.y()).
        text("click me")

}