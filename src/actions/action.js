const Actions = {
    "ACTIVE_RED": "ACTIVE_RED",
    "ACTIVE_BLUE": "ACTIVE_BLUE",
    "ACTIVE_ERASER": "ACTIVE_ERASER",
    "TEXT_ADDED": "TEXT_ADDED",
    "TRIANGLE_ADDED": "TRIANGLE_ADDED",
    "RECTANGLE_ADDED": "RECTANGLE_ADDED",
    "CIRCLE_ADDED": "CIRCLE_ADDED",
    "DOWNLOAD_ACTIVE": "DOWNLOAD_ACTIVE",
    "UNDO": "UNDO",
    "REDO": "REDO",
    //action creaters
    "red": () => ({
        "type": "ACTIVE_RED",
    }),
    "blue": () => ({
        "type": "ACTIVE_BLUE",
    }),
    "erasor": () => ({
        "type": "ACTIVE_ERASER",
    }),
    "text": () => ({
        "type": "TEXT_ADDED",
        "payload": "This is some dummy text"
    }),
    "triangle": () => ({
        "type": "TRIANGLE_ADDED",
        "payload": {
            "height": 10,
            "width": 10,
        },
    }),
    "rectangle": () => ({
        "type": "RECTANGLE_ADDED",
        "payload": {
            "height": 10,
            "width": 10,
        },
    }),
    "circle": () => ({
        "type": "CIRCLE_ADDED",
        "payload": {
            "radius": 10,
        },
    }),
    "downloadCanvas": () => ({
        "type": "DOWNLOAD_ACTIVE",
    }),
    "redo": () => ({
        "type": "REDO",
    }),
    "undo": () => ({
        "type":"UNDO",
    }),
}
        
export default Actions;


