// @DONE
async function _fetch(path, result, type, message) {

    let done = false

    let request = new XMLHttpRequest()
    request.open("POST", path, true)
    
    let content_type = ""
    if (type === "arraybuffer") { content_type = "application/octet-stream" }
    if (type === "text") { content_type = "application/json; charset=utf8" }  

    request.setRequestHeader("Content-Type", content_type)
    request.responseType = type

    request.onload = function (event) { 
        result.data = request.response
        done = true 
    }

    request.send(JSON.stringify(message))

    return await new Promise(function (resolve, reject){
        let i = setInterval(function () {
            if (done) {
                resolve()
                clearInterval(i)
            }
        })
    })
}

// @DONE
export async function font(id, path, callback) {

    let result = { data: null }

    await _fetch("client/assets/fonts/" + path, result, "arraybuffer", {})
    
    let f = new FontFace(id, result.data)
    await f.load()
    document.fonts.add(f)
    callback(id)
    return
}

// @DONE
export async function image(path, callback) {

    let result = { data: null }

    await _fetch("client/assets/images/" + path, result, "arraybuffer", {})

    let u8 = new Uint8Array(result.data)
    let str = ""
    u8.forEach(byte => {
        str += String.fromCharCode(byte)
    })

    callback(str)
    return
}

// @DONE
export async function json(path, message, callback) {
    
    let result = { data: null }

    await _fetch(path, result, "text", message)
    
    callback(JSON.parse(result.data))
    return
}
