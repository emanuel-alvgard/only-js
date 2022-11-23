const cp_builtin = require("child_process");
const fs_builtin = require("fs");


// @TODO
// add forced string encoding everywhere to UTF-8
// find free ports and modify config.json with new port numbers before start

// TERMINAL ARGS
let mode = process.argv[2];
if (mode !== "install" && mode !== "dev" && mode !== "live") { 
    console.log("Please enter execution mode: (install, dev, live)."); 
    process.exit(); 
}


// LOAD CONFIG
let config = JSON.parse(fs_builtin.readFileSync("./config.json"));

// OS SPECIFICS
let command_db = "";
let command_app = "";
let command_chrome = "";

if (process.platform === "win32") {
    command_app = "cd ." + config.app.path + " & start cmd.exe /k node app.js " + mode;
    command_chrome = "start http://localhost:" + config.app.port;
}

// @NOT /k to terminal
else if (process.platform === "darwin") {
    command_app = "cd ." + config.app.path + " ; node app.js " + mode;
    command_chrome = "open http://localhost:" + config.app.port;
}

// @NOT /k to terminal
else if (process.platform === "linux") {
    command_app = "cd ." + config.app.path + " ; node app.js " + mode;
}


// @ADD create new file for each startup? so startup history can be traced
if (mode === "live") {
    command_db += " > ./log.txt";
    command_app += " > ./log.txt";
}

console.log(process.platform);

function callback(error) { if (error !== null) { console.log(error); } }

//let start_db = cp_builtin.exec(command_db, callback);
let start_app = cp_builtin.exec(command_app, callback);
let start_chrome;
if (mode === "dev") { start_chrome = cp_builtin.exec(command_chrome, callback); }

setTimeout(() => {
    //start_db.kill();
    start_app.kill();
    if (mode === "dev") { start_chrome.kill(); }
    process.exit();
}, 500);
