let ON = false

export default (bounds, callback) => {
    
    const button = bounds.view().element("test")

    button
        .t(bounds.t())
        .w(bounds.w() / 2)
        .h(bounds.h())
        .color([255,255,255,1])
        .border("solid")
        .border_size(1)
        .border_color([225,225,225,1])
        .z(bounds.z() + 1)

    if (ON) { button.r(bounds.r()) }
    else { button.l(bounds.l()) }

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