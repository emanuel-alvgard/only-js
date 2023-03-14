const cp_builtin = require("child_process");
const fs_builtin = require("fs");


// @TODO
// add forced string encoding everywhere to UTF-8
// find free ports and modify config.json with new port numbers before start

// TERMINAL ARGS
let mode = process.argv[2];
if (mode !== "install" && mode !== "dev" && mode !== "live" && mode !== "kill") { 
    console.log("Please enter execution mode: (install, dev, live)."); 
    process.exit(); 
}


// LOAD CONFIG
let config = JSON.parse(fs_builtin.readFileSync("./config.json"));

// OS SPECIFICS

if (mode !== "install") {
    let command_db = "";
    let command_app = "";
    let command_chrome = "";

    if (process.platform === "win32") {
        command_app = "cd ./server & start cmd.exe /k node app.js " + mode;
        command_chrome = "start http://localhost:" + config.port;
    }

    // @NOT /k to terminal
    else if (process.platform === "darwin") {
        command_app = "cd ./server ; node app.js " + mode;
        command_chrome = "open http://localhost:" + config.port;
    }

    // @NOT /k to terminal
    else if (process.platform === "linux") {
        command_app = "cd ./server ; node app.js " + mode;
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
}




// INTALL NPM DEPENDENCIES
else {
    
    let chain;
    let command;

    if (process.platform === 'win32') { chain = ' & '; }
    else { chain = ' ; '; }

    if (mode === "install") { command = "install"; }
    if (mode === "update") { command = "update"; }

    let current = [];

    function npm(current) {

        let path = current.join('/');
        console.log('(' + path + ')');
        console.log(cp_builtin.execSync('cd ' + path + chain + 'npm ' + command).toString());

        return;
    }


    function search(current) {

        let dir = fs_builtin.readdirSync('./' + current.join('/'));

        if (dir.includes('package.json')) { npm(current); }

        let len = dir.length;
        let i = 0;
        while (i < len) {
            if (dir[i].includes('.')) { i += 1; continue; }
            if (dir[i] === 'node_modules') { i += 1; continue; }
            if (dir[i] === 'README') { i += 1; continue; }
            if (dir[i] === 'LICENSE') { i += 1; continue; }
            current.push(dir[i]);
            search(current);
            i += 1;
        }
        current.pop();
        return;
    }
    search(current);
}


// KILL PROCESSES
let command_kill = "fuser -k -n tcp " + config.port
if (mode === "kill" && process.platform === "linux") {

    let start_kill = cp_builtin.exec(command_kill, callback);

    setTimeout(function () {
        start_kill.kill();
        process.exit();
    }, 100);
}