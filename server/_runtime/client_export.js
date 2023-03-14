let indentation = 0

let _void = [
    "area", "base", "br",
    "col", "command", "embed",
    "hr", "img", "input",
    "keygen", "link", "meta",
    "param", "source", "track",
    "wbr"
]

// @ADD alt, meta etc
function _export(element, result) {
    
    let elements = element.children

    for (let i=0; i < elements.length; i++) {
        let tag = elements[i].tagName.toLocaleLowerCase()
        if (tag === "script") { continue }
        if (tag === "style") { continue }
 
        for (let j=0; j < indentation; j++) {
            result.str += " "    
        }
        result.str += "<" + tag + ' id="' + elements[i].id + '">'
        
        if (elements[i].children.length !== 0) {
            result.str += "\n"
            indentation += 4
            _export(elements[i], result)
            indentation -= 4
            for (let j=0; j < indentation; j++) {
                result.str += " "    
            }
        }
        else { result.str += elements[i].textContent }
        if (!_void.includes(tag)) { 
            result.str += "</" + tag + ">"
        }
        result.str += "\n"
    }
}

let _ctrl = false
let _letter = false

window.onkeydown = (event) => { 
    if (event.key === "Control") { _ctrl = true }
    if (event.key === "i") { _letter = true }
    if (_ctrl && _letter) {
        let result = { str: "" }
        _export(document.body, result)
        console.log(result.str)
    }
}

window.onkeyup = (event) => { 
    if (event.key === "Control") { _ctrl = false }
    if (event.key === "i") { _letter = false }
}
