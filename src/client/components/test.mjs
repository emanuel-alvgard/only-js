export default (runtime) => {

    let view = runtime.view("view")
    let bt = view.element("bt", "button")

    bt.
        x(view.root.x()).
        y(view.root.y()).
        text("click me")
}

