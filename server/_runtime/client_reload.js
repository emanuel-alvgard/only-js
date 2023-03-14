let request = new XMLHttpRequest()

function _request() {
    
    request.open("POST", window.location.origin + "/client_reload", true)
    request.setRequestHeader("Content-Type", "application/json")
    request.onreadystatechange = (state) => { 
        if (request.status === 200) { window.location.reload() }
    }
    request.onerror = () => { _request() }
    request.ontimeout = () => { _request() }
    request.send()
}

_request()