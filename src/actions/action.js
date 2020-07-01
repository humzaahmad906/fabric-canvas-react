//actions
export const ACTIVE_RED = "ACTIVE_RED"
export const ACTIVE_BLUE = "ACTIVE_BLUE"
export const ACTIVE_ERASER = "ACTIVE_ERASER"
export const TRIANGLE_ADDED = "TRIANGLE_ADDED"
export const RECTANGLE_ADDED = "RECTANGLE_ADDED"
export const CIRCLE_ADDED = "CIRCLE_ADDED"
//action creaters
export const red = () => ({
    "type": ACTIVE_RED,
})
export const blue = () => ({
    "type": ACTIVE_BLUE,
})
export const erasor = () => ({
    "type": ACTIVE_ERASER,
})
export const text = () => ({
    "type": TEXT_ADDED,
    "payload": "This is some dummy text"
})
export const addtriangle = () => ({
    "type": TRIANGLE_ADDED,
    "payload": {
        "height": 10,
        "width": 10,
    },
})
export const addrectangle = () => ({
    "type": RECTANGLE_ADDED,
    "payload": {
        "height": 10,
        "width": 10,
    },
})
export const addcircle = () => ({
    "type": CIRCLE_ADDED,
    "payload": {
        "radius": 10,
    },
})