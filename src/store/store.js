import {ACTIVE_RED, ACTIVE_BLUE, ACTIVE_ERASER, TEXT_ADDED} from "../actions/action"
import {createStore, combineReducers} from 'redux'
const DEFAULTSTATE = {
    "color": "BLUE",
    "erase": false,
    "textbox": "",
    "lastAction": "color"
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
const reducer = combineReducers({
    "color": colorReducer,
    "erase": eraserReducer,
    "textbox": textReducer,
    "lastaction": lastactionReducer,
})
const store = createStore(reducer, DEFAULTSTATE)
export default store