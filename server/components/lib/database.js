const fs_builtin = require("fs")

// @DONE
function _token(buffer, length) {

    function _generate() {  

        const digit = 48
        const upper = 65
        const lower = 97
        
        let id = ""

        for (let i=0; i < length; i++) {
            const type = Math.random() * 3
            let code
        
            if (type < 1) { code = digit + Math.round(Math.random() * 9) }
            else if (type < 2) { code = upper + Math.round(Math.random() * 25) }
            else { code = lower + Math.round(Math.random() * 25) }

            id += String.fromCharCode(code)
        }
        return id
    }

    let id = _generate()
    while (buffer.includes(id)) {
        id = _generate()
    }
    return id
}

// @DONE
function _write(path, type, object) {
    fs_builtin.writeFileSync(
        path + "/" + type + "/" + type + "_" + object.id + ".json",
        JSON.stringify(object),
        { encoding:"utf8", flag: "w" }
    )
}

// @DONE
function _archive(path, type, object) {
    fs_builtin.writeFileSync(
        path + "/_archive/" + type + "_" + object.id + ".json",
        JSON.stringify(object),
        { encoding:"utf8", flag: "w" }
    )
}

// @DONE
function _unlink(path, type, object) { 
    fs_builtin.unlinkSync(path + "/" + type + "/" + type + "_" + object.id + ".json")
}

// @DONE
function _create(db, type, schema) {
    if ("id" in schema) { delete schema.id }
    return (object=schema) => {
        try {

            const _object = {}

            for (const key in schema) { _object[key] = schema[key] }
            for (const key in object) { _object[key] = object[key] }

            const _type_id = "_" + type + "_id"
            const _type = "_" + type

            if (db.limit !== null && db[_type_id].length >= db.limit) { return null }

            const _id = _token(db[_type_id], 8)
            db[_type_id].push(_id)
            _object["id"] = _id
            db[_type].push(_object)
            _write(db.path, type, _object)
            return _id
        }
        catch(e) { return null }
    }
}

// @DONE
function _interface(db, type) {

    const _type_id = "_" + type + "_id"
    const _type = "_" + type

    return (id, object=null) => {
        try {
            const _index = db[_type_id].indexOf(id)
            const _object = db[_type][_index]

            if (object === null) { return _object }
            else {
                let update = false
                for (const key in object) {
                    if (!key in _object) { continue }
                    if (typeof object[key] !== typeof _object[key]) { continue }
                    else if (JSON.stringify(object[key]) === JSON.stringify(_object[key])) { continue }
                    else { 
                        _object[key] = object[key]
                        update = true
                    }   
                }
                if (update) {
                    _write(db.path, type, _object)
                }
                return _object
            }
        }
        catch(e) { return null }
    }
}

// @DONE
function _list(db, type) {

    const _type = "_" + type

    return (filter=(object)=>{ return true }) => {
        try {
            let result = []
            db[_type].forEach(object => {
                if (filter(object)) { result.push(object) }
            })
            return result
        }
        catch(e) { return null }
    }
}

// @DONE
function _delete(db, type) {

    const _type_id = "_" + type + "_id"
    const _type = "_" + type

    return (id, archive=true) => {
        try {
            const _index = db[_type_id].indexOf(id)
            const _object = db[_type][_index]
            if (archive) { _archive(db.path, type, _object) }
            _unlink(db.path, type, _object)
            db[_type].splice(_index, 1)
            db[_type_id].splice(_index, 1)
            return type + "_" + id
        }
        catch(e) { return null }
    }
}

// @COMING
function _export(db, type) {
    return (path) => {

    }
}

// @COMING
function _stats(db, type) {
    return () => {}
}

// @DONE
module.exports = (path, limit=null) => {

    const db = { 
        path: path,
        limit: limit 
    }

    try {

        // CREATE ARCHIVE
        if (!fs_builtin.existsSync(path + "/_archive")){ fs_builtin.mkdirSync(path + "/_archive") }

        // READ SCHEMA
        const _dir = fs_builtin.readdirSync(path, { encoding: "utf-8" })
        _dir.forEach(type=>{

            if (type === "_archive") { return }
            
            // LOAD SCHEMA
            db["_"+type+"_id"] = []
            db["_"+type] = []
            const _schema = JSON.parse(fs_builtin.readFileSync(path + "/" + type + "/_schema.json", { encoding: "utf-8" }))
            db["create_"+type] = _create(db, type, _schema)
            db[type] = _interface(db, type)
            db["list_"+type] = _list(db, type)
            db["delete_"+type] = _delete(db, type)
            db["export_"+type] = _export(db, type)
            db["stats_"+type] = _stats(db, type)

            // LOAD OBEJCTS
            const _type_dir = fs_builtin.readdirSync(path + "/" + type, { encoding: "utf-8" })
            _type_dir.forEach(object => {
                if (object !== "_schema.json") {
                    try {
                        const _object = JSON.parse(fs_builtin.readFileSync(path + "/" + type + "/" + object, { encoding: "utf-8" }))
                        db["_"+type+"_id"].push(_object.id)
                        db["_"+type].push(_object)

                    }
                    catch(e) {}   
                }
            })
        })

        // @COMING
        db["export"] = (path) => {} 
        db["stats"] = () => {} 
        
        return db
    }
    catch(e) { console.log(e) }
}