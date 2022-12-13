let ON = false

export default (bounds, callback) => {
    
    const button = bounds.view().element("test")

    button
        .top(bounds.top())
        .width(bounds.width() / 2)
        .height(bounds.height())
        .color([255,255,255,1])
        .border("solid")
        .border_size(1)
        .border_color([225,225,225,1])
        .z(bounds.z() + 1)

    if (ON) { button.right(bounds.right()) }
    else { button.left(bounds.left()) }

    const click = () => {
        if (ON) { ON = false}
        else { ON = true }
        callback()
    }

    if (bounds.view().SETUP) {
        bounds.real().onclick = click
        button.real().onclick = click
    }

}