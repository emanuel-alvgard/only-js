// @DONE
async function _asset(url, result) {

    let done = false

    let request = new XMLHttpRequest()
    request.open("GET", url, true)
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

    await _asset(path, result)
    
    let f = new FontFace(id, result.data)
    await f.load()
    document.fonts.add(f)
    callback(id)
    return
}

// @
export async function image(id, path, callback) {

}

// @
export async function json(id, path, callback) {

}

