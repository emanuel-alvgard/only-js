let buffer = {}

// @
export default (bounds, data, type=null, update=()=>{}) => { // grid(bounds, [[]], [[]], ()=>{}, ()=>{})
    
    // SETUP
    bounds.overflow_y("auto")
    let id = bounds.id()
    let setup = false
    let clear = false

    function _setup() {
        
        buffer[id] = { rows: [], columns: [] }
        setup = true

        for (let i=0; i < data.length; i++) {
            buffer[id].rows.push(bounds.element("row_" + i, "div"))

            let columns = []
            for (let j=0; j < data[i].length; j++) {
                let _type = "div"
                if (type !== null) { _type = type[i][j] }
                columns.push(bounds.element("row_" + i + "_column_" + j, _type))
            }
            buffer[id].columns.push(columns)
        }
    }
    
    // CHECK IF GRID SHAPE HAS CHANGED
    if (id in buffer) {
        if (buffer[id].rows.length !== data.length) { clear = true }
        else { 
            for (let i=0; i < buffer[id].columns.length; i++) {
                if (buffer[id].columns[i].length !== data[i].length) { 
                    clear = true
                    break
                }
            }
        }

        // CLEAR ELEMENTS
        if (clear) {
            for (let i=0; i < buffer[id].rows.length; i++) {
                buffer[id].rows[i].remove()
                for (let j=0; j < buffer[id].columns[i].length; j++) {
                    buffer[id].columns[i][j].remove()
                }
            }
            _setup()
        }
    }
    else { _setup() }

    
    // UPDATE
    let grid = buffer[id]
    let top = bounds.top()
    let right = 0

    for (let i=0; i < grid.rows.length; i++) {

        let row = grid.rows[i]

        row.height(50)
        row.top(top)
        row.left(bounds.left())

        let left = bounds.left()

        for (let j=0; j < grid.columns[i].length; j++) {
            
            let column = grid.columns[i][j]

            column.text(data[i][j])
            column.left(left)
            column.y(row.y())
            update(grid.rows, i, grid.columns[i], j, setup)
            if (column.right() > right) { right = column.right() }

            left = column.right()
        }
        top = row.bottom()
    }

    // GRID RIGHT
    for (let i=0; i < grid.rows.length; i++) {
        if (bounds.right() > right) { 
            grid.rows[i].extend_right(bounds.right())
            bounds.overflow_x("hidden") 
        }
        else { 
            grid.rows[i].extend_right(right)
            bounds.overflow_x("auto")  
        }
    }

    return buffer[id]
    
}
