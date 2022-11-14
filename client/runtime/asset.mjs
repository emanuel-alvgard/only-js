// split into separate functions
async function asset(url) {

    // check url file type to determine which action to take when resource gets fetched.
    //

    let done = false;

    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.responseType = "arraybuffer";

    request.onload = function (event) { done = true; }
    request.send();

    await new Promise(function (resolve, reject){
        let i = setInterval(function () {
            if (done) {
                resolve();
                clearInterval(i);
            }
        });
    });

    return request.response;
}

// @
async function image() {


}


// @
async function font(id, asset) {
    
    let f = new FontFace(id, asset);
    await f.load();
    document.fonts.add(f);
    return;
}

font("oswald", await asset("/public/assets/oswald_bold.woff2"));


