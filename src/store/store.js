import Actions from "../actions/action"
import {createStore, combineReducers} from 'redux'
const DEFAULTSTATE = {
    "color": "BLUE",
    "erase": false,
    "textbox": "",
    "lastAction": "",
    "rectangleDimention": [],
    "triangleDimention": [],
    "circleRadius": null,
    "downloadJson": false,
    "modification": []
}
const colorReducer = (state = "BLUE", action) => {
    switch(action.type){
        case Actions.ACTIVE_RED:
            return "RED"
        case Actions.ACTIVE_BLUE:
            return "BLUE"
        default:
            return state
        
    }
}
const eraserReducer = (state = false, action) => {
    if(action.type === Actions.ACTIVE_ERASER){
        return !state
    }
    else{
        return state
    }
}
const textReducer = (state = "", action) => {
    if (action.type === Actions.TEXT_ADDED){
        return action.payload
    }
    else{
        return state
    }
}
const lastactionReducer = (state = Actions.ACTIVE_BLUE, action) => (
    action.type
)
const rectangleReducer = (state = [], action) => {
    if (action.type === Actions.RECTANGLE_ADDED){
        return [action.payload.width, action.payload.height]
    }
    else return state
}
const triangleReducer = (state = [], action) => {
    if (action.type === Actions.TRIANGLE_ADDED){
        return [action.payload.width, action.payload.height]
    }
    else return state
}
const circleReducer = (state = [], action) => {
    if (action.type === Actions.CIRCLE_ADDED){
        return action.payload.radius
    }
    else return state
}
const downloadReducer = (state = false, action) => {
    if (action.type === Actions.DOWNLOAD_ACTIVE){
        return true
    }
    else return state
}
const undoredoReducer = (state = [], action) => {
    switch(action.type){
        case Actions.REDO:
            return [...state, "redo"]
        case Actions.UNDO:
            return [...state, "undo"]
        default:
            return state
    }
}

const reducer = combineReducers({
    "color": colorReducer,
    "erase": eraserReducer,
    "textbox": textReducer,
    "lastAction": lastactionReducer,
    "rectangleDimention": rectangleReducer,
    "triangleDimention": triangleReducer,
    "circleRadius": circleReducer,
    "downloadJson": downloadReducer,
    "modification":undoredoReducer,
})
const store = createStore(reducer, DEFAULTSTATE)
export default store