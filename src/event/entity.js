function event_mousemove(event) { mousemove[event.srcElement.id] = 1; }
function event_mousedown(event) { mousedown[event.srcElement.id] = 1; }
function event_mouseup(event) { mouseup[event.srcElement.id] = 1; }

function add_event_mousemove(id) { DOM_element[id].addEventListener("mousemove", event_mousemove); }
function add_event_mousedown(id) { DOM_element[id].addEventListener("mousedown", event_mousedown); }
function add_event_mouseup(id) { DOM_element[id].addEventListener("mouseup", event_mouseup); }

function remove_event_mousemove(id) { DOM_element[id].removeEventListener("mousemove", event_mousemove); }
function remove_event_mousedown(id) { DOM_element[id].removeEventListener("mousedown", event_mousedown); }
function remove_event_mouseup(id) { DOM_element[id].removeEventListener("mouseup", event_mouseup); }

function event_touchstart(event) { touchstart[event.srcElement.id] = 1; }
function event_touchmove(event) { touchmove[event.srcElement.id] = 1; }
function event_touchend(event) { touchend[event.srcElement.id] = 1; }

function add_event_touchstart(id) { DOM_element[id].addEventListener("touchstart", event_touchstart); }
function add_event_touchmove(id) { DOM_element[id].addEventListener("touchmove", event_touchmove); }
function add_event_touchend(id) { DOM_element[id].addEventListener("touchend", event_touchend); }

function remove_event_touchstart(id) { DOM_element[id].removeEventListener("touchstart", event_touchstart); }
function remove_event_touchmove(id) { DOM_element[id].removeEventListener("touchmove", event_touchmove); }
function remove_event_touchend(id) { DOM_element[id].removeEventListener("touchend", event_touchend); }
