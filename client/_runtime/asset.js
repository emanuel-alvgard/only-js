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

// @
export async function image(id, path, callback) {

    let result = { data: null }

    await _asset("images/" + path, result)
    let str = new Uint8Array(result.data)
    callback(
        // @HERE
        str.toString("base64")
    )
    return
}

// @
export async function json(id, path, callback) {

}

