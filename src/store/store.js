import {ACTIVE_RED, ACTIVE_BLUE, ACTIVE_ERASER, TEXT_ADDED,
        RECTANGLE_ADDED, TRIANGLE_ADDED, CIRCLE_ADDED,
        DOWNLOAD_ACTIVE, UNDO, REDO} from "../actions/action"
import {createStore, combineReducers} from 'redux'
const DEFAULTSTATE = {
    "color": "BLUE",
    "erase": false,
    "textbox": "",
    "lastAction": "",
    "rectangledimention": [],
    "triangledimention": [],
    "circleradius": null,
    "downloadjson": false,
    "modification": []
}
const colorReducer = (state = "BLUE", action) => {
    console.log(action.type)
    switch(action.type){
        case ACTIVE_RED:
            return "RED"
        case ACTIVE_BLUE:
            return "BLUE"
        default:
            return state
        
    }
}
const eraserReducer = (state = false, action) => {
    console.log(action.type)
    if(action.type === ACTIVE_ERASER){
        return !state
    }
    else{
        return state
    }
}
const textReducer = (state = "", action) => {
    if (action.type === TEXT_ADDED){
        return action.payload
    }
    else{
        return state
    }
}
const lastactionReducer = (state = ACTIVE_BLUE, action) => {
    return action.type
}
const rectangleReducer = (state = [], action) => {
    if (action.type === RECTANGLE_ADDED){
        return [action.payload.width, action.payload.height]
    }
    else return state
}
const triangleReducer = (state = [], action) => {
    if (action.type === TRIANGLE_ADDED){
        return [action.payload.width, action.payload.height]
    }
    else return state
}
const circleReducer = (state = [], action) => {
    if (action.type === CIRCLE_ADDED){
        return action.payload.radius
    }
    else return state
}
const downloadReducer = (state = false, action) => {
    if (action.type === DOWNLOAD_ACTIVE){
        return true
    }
    else return state
}
const undoredoReducer = (state = [], action) => {
    switch(action.type){
        case REDO:
            return [...state, "redo"]
        case UNDO:
            return [...state, "undo"]
        default:
            return state
    }
}

const reducer = combineReducers({
    "color": colorReducer,
    "erase": eraserReducer,
    "textbox": textReducer,
    "lastaction": lastactionReducer,
    "rectangledimention": rectangleReducer,
    "triangledimention": triangleReducer,
    "circleradius": circleReducer,
    "downloadjson": downloadReducer,
    "modification":undoredoReducer,
})
const store = createStore(reducer, DEFAULTSTATE)
export default store