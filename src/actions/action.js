//actions
export const ACTIVE_RED = "ACTIVE_RED"
export const ACTIVE_BLUE = "ACTIVE_BLUE"
export const ACTIVE_ERASER = "ACTIVE_ERASER"
export const TEXT_ADDED = "TEXT_ADDED"
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