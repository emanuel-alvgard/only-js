// @DONE
async function wait(task, error, condition=(t)=>{}) {

    let p = await new Promise(function (resolve, reject){
        let i = setInterval(function () {

            condition(task);

            if (task.done) {
                resolve();
                clearInterval(i);
                return;
            }
            if (task.fail) {
                reject(error);
                clearInterval(i);
                return;
            }
        });
    });
}

// @DONE
async function poll(result) {

    result.done = false
    result.fail = false

    let request = new XMLHttpRequest();
    request.open("POST", window.location.origin + "/client_reload", true);
    request.setRequestHeader("Content-Type", "application/json");
    
    request.onreadystatechange = function () {
        if (request.readyState === request.DONE) {
            if (request.status === 200) { window.location.reload(); result.done = true }
            else if (request.status === 502) { console.log("connection destroyed"); result.done = true }
            else { console.log("failed"); result.failed = true }
            return;
        }
    }

    request.send();

    await wait(result, { message: "" });
}


let result = {
    done: true,
    fail: false,
}

let i = setInterval(() => {
    if (result.done) { poll(result) }
    if (result.fail) { clearInterval(i) }
}, 10)