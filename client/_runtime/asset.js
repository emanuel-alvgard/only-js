// @DONE
async function _asset(path, result) {

    let done = false

    let request = new XMLHttpRequest()
    request.open("GET", "client/assets/" + path, true)
    request.setRequestHeader("Content-Type", "application/octet-stream")
    request.responseType = "arraybuffer"

    request.onload = function (event) { 
        result.data = request.response
        done = true 
    }

    request.send()

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

    await _asset("fonts/" + path, result)
    
    let f = new FontFace(id, result.data)
    await f.load()
    document.fonts.add(f)
    callback(id)
    return
}

// @DONE
export async function image(path, callback) {

    let result = { data: null }

    await _asset("images/" + path, result)
    let u8 = new Uint8Array(result.data)
    let str = ""
    u8.forEach(byte => {
        str += String.fromCharCode(byte)
    })
    callback(btoa(str))
    return
}

// @
export async function json(id, path, callback) {

}

