export default (runtime) => {

    let root = runtime.view("view").root
    let bt = view.element("bt", "button")

    bt.
        x(root.x()).
        y(root.y()).
        text("click me")
}

