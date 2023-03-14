let previous = null

export default (element, location, time, incoming=()=>{}, outgoing=()=>{}) => {

    const app = element.context()

    if (app.location().path === location) {
      
        element.visible(true)
            
        if (app.location().SWITCH) {
            incoming()
        }
    }
    else { 
        
        element.visible(false) 
        
        if (app.location().SWITCH && app.location()._prev === location) {
            outgoing()
        }
    }
}