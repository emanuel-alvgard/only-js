import { use } from "../runtime/runtime.mjs"

export default (context) => {

    const app = use(context)

    app.view()

    let view = app.view("view")
    let bt = view.element("bt", "button")

    bt.
        x(view.root.x()).
        y(view.root.y()).
        text("click me")
}

