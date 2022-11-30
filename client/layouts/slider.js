let ON = false

export default (root) => {
    
    const button = root.view().element("test")

    button
        .t(root.t())
        .w(root.w() / 2)
        .h(root.h())
        .color([255,255,255,1])
        .border("solid")
        .border_size(1)
        .border_color([225,225,225,1])
        .z(root.z() + 1)

    if (ON) { button.r(root.r()) }
    else { button.l(root.l()) }

    const click = () => {
        if (ON) { ON = false}
            else { ON = true }
    }

    if (root.view().SETUP) {
        root.real().onclick = click
        button.real().onclick = click
    }

}