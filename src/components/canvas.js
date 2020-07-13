import React, {Component} from 'react'
import {fabric} from 'fabric'
import Actions from '../actions/action'

class DrawingCanvas extends Component{
    constructor(props){
        super(props)
        //stack based on undo list
        this.undoStack = []
        //stack based on redo
        this.redoStack = []
    }
    componentDidMount(){
        canvas = new fabric.Canvas('c',{
            height: 500,
            width: 500,
            backgroundColor: "black",
            isDrawingMode: false,
            stateful:true
        })
        // this.counter = null
        this.redoObject = false
        this.totalLength = 0
        this.objToAdd = null
        this.stack = []
        this.layer_no = null
        this.drawing = false
        this.objectOver = false
        this.colorActive = false
        canvas.on("object:added", (e)=>{
            
            if (JSON.stringify(this.objToAdd).length>5){
                console.log(this.objToAdd.allProperties)
                console.log(JSON.stringify(this.objToAdd))
                e.target.allProperties = []
                for (let i=0; i<this.objToAdd.allProperties.length; i++){
                    e.target.allProperties.push(this.objToAdd.allProperties.pop())
                }
                
                e.target.counter = this.objToAdd.counter
                this.objToAdd = null
            }
            else{
                if (!(e.target.alreadyAdded in e.target)){
                    e.target.selectable = true
                    if (!("id" in e.target)){
                        e.target.id = Math.random()
                        
                    }
                    
                    if("recentAction" in e.target){
                        if (e.target.recentAction === true){
                            console.log("try")
                            delete e.target.recentAction
                        }
                    }else{
                        console.log(e.target.id)
                        e.target.allProperties = [JSON.stringify(e.target)]
                        e.target.counter = 0
                        this.undoStack.push(JSON.stringify({"id": e.target.id, "props":e.target.allProperties}))
                        
                    }
                
                }
            }
            
            
        })
        canvas.on("object:modified", (e)=>{
            console.log("recentAction in e.target", "recentAction" in e.target)

            if("recentAction" in e.target){
                if (e.target.recentAction === true){
                    console.log("phnch gya hai")
                    delete e.target.recentAction
                    e.target.setCoords()
                    
                    console.log(e.target.counter)
                }
            }else{
                console.log("activeObject.counter>activeObject.allProperties.length-1")
                e.target.counter++
                e.target.allProperties.pop()
                e.target.allProperties.push(JSON.stringify(e.target._stateProperties));
                e.target.allProperties.push(JSON.stringify(e.target));
                console.log(e.target._stateProperties)
                console.log(e.target.allProperties)
                this.undoStack.pop()
                this.undoStack.push(JSON.stringify({"id": e.target.id, "props":e.target._stateProperties}))
                this.undoStack.push(JSON.stringify({"id": e.target.id, "props":e.target}))
            }
            
        })
        canvas.on("object:removed", (e)=>{
            if("recentAction" in e.target){
                if (e.target.recentAction === true){
                    delete e.target.recentAction
                }
            }else{
                console.log("remove called")
                e.target.counter--
                // this.undoStack.push(JSON.stringify({"type":"removed","id": e.target.id, "object":e.target}))
            }
            
        })
        canvas.on("mouse:down:before", (e) => {
            try{
                if(e.target.selectable ===false){
                    canvas.isDrawingMode = true
                }else{
                    canvas.isDrawingMode = false
                }
            }catch(err){
                if(this.drawing){
                    canvas.isDrawingMode = true
                }else{
                    canvas.isDrawingMode = false
                }
                
            }  
        })
        canvas.on("mouse:up", (e) => {
            canvas.isDrawingMode = false
            this.objectOver = true
        })
        canvas.on("mouse:over", (e) => {
            try{
                if(e.target.type === "path"){
                    e.target.set({
                        "selectable": false
                    })
                }
                else{
                    e.target.set({
                        "selectable": true
                    })
                }
            }catch(err){
                console.log(err)
            }
        })
        canvas.renderAll()
    }
    componentDidUpdate(prevProps){
        this.rand = () => (
            Math.floor(Math.random()*999).toString()[0]
        )
        this.three = () => {
            let i=0
            let number = ""
            for(i;i<3;i++){
                number = number+this.rand()
            }
            return number}
        let activeObject = null
        switch(this.props.actionPerformed){
            case Actions.ACTIVE_RED:
                canvas.freeDrawingBrush.color = this.props.brushColor
                this.drawing = true
                break;
            case Actions.ACTIVE_BLUE:
                canvas.freeDrawingBrush.color = this.props.brushColor
                this.drawing = true
                break;
            case Actions.ACTIVE_ERASER:
                canvas.freeDrawingBrush.color = "black"
                this.drawing = true
                break;
            case Actions.TEXT_ADDED:
                const text = new fabric.Textbox(this.props.textarea, {
                    "fill": "#"+this.three()
                })
                this.drawing = false
                canvas.add(text)
                break;
            case Actions.DOWNLOAD_ACTIVE:
                let payload = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(canvas.toJSON()));
                let dlAnchorElem = document.createElement('a');
                dlAnchorElem.setAttribute("href",payload);
                dlAnchorElem.setAttribute("download", "canvas.json");
                dlAnchorElem.click();
                break
            case Actions.RECTANGLE_ADDED:
                const rectangle = new fabric.Rect({ 
                    width: this.props.rectangleDim[0], 
                    height: this.props.rectangleDim[1], 
                    left: 10, 
                    top: 50, 
                    fill: '#'+this.three()
                });
                canvas.add(rectangle)
                this.drawing = false
                break
            case Actions.TRIANGLE_ADDED:
                const triangle = new fabric.Triangle({ 
                    width: this.props.triangleDim[0], 
                    height: this.props.triangleDim[1], 
                    left: 30, 
                    top: 50, 
                    fill: '#'+this.three(),
                });
                canvas.add(triangle)
                this.drawing = false
                break
            case Actions.CIRCLE_ADDED:
                const circle = new fabric.Circle({radius: 100,
                    fill: '#'+this.three(),
                    radius: this.props.circleRadius,
                    left: 50, 
                    top: 50, 
                });
                canvas.add(circle)
                this.drawing = false
                break
            case Actions.UNDO:
                activeObject = canvas.getActiveObject();
                this.layer_no = canvas.getObjects().indexOf(activeObject)
                
                if(activeObject.counter >0){
                    let oldProperties = JSON.parse(activeObject.allProperties[activeObject.counter-1])
                    activeObject.recentAction = true
                    for (let key in oldProperties){
                        activeObject[key] = oldProperties[key]
                    }

                    canvas.setActiveObject(activeObject)
                    canvas.getActiveObject().setCoords();
                    activeObject.counter--
                    canvas.renderAll()
                }
                else if(activeObject.counter === 0){
                    activeObject.counter--
                    this.stack.push(JSON.stringify(activeObject))
                    canvas.remove(activeObject)
                    if (this.layer_no>0){
                        canvas.setActiveObject(canvas.getObjects()[this.layer_no-1])
                    }
                }
                break
            case Actions.REDO:
                activeObject = canvas.getActiveObject();
                this.layer_no = canvas.getObjects().indexOf(activeObject)
                console.log(activeObject.allProperties)
                if(activeObject.counter !== (activeObject.allProperties.length-1)){
                    console.log("uper________________")
                    let oldProperties = JSON.parse(activeObject.allProperties[activeObject.counter+1])
                    activeObject.recentAction = true
                    
                    for (let key in oldProperties){
                        activeObject[key] = oldProperties[key]
                    }

                    canvas.setActiveObject(activeObject)
                    canvas.getActiveObject().setCoords();
                    activeObject.counter++
                    canvas.renderAll()
                }
                else{
                    console.log("nechay________________")
                    // activeObject.counter++
                    //condition to be added
                    const objectPop = this.stack.pop()
                    let nextObj = JSON.parse(objectPop)
                    // push(JSON.stringify(activeObject))
                    
                    // push(JSON.stringify(activeObject))
                    this.redoObject = true
                    
                    // console.log(nextObj.counter)
                    this.objToAdd = nextObj
                    let newObj = null
                    switch (nextObj.type){
                        case "rect":
                            newObj = new fabric.Rect({ 
                                width: 10, 
                                height: 10, 
                                left: 30, 
                                top: 50, 
                                fill: '#'+this.three(),
                            });
                            break;
                        case "triangle":
                            newObj = new fabric.Triangle({ 
                                width: 10, 
                                height: 10, 
                                left: 30, 
                                top: 50, 
                                fill: '#'+this.three(),
                            });
                            break;
                        case "circle":
                            newObj = new fabric.Circle({radius: 100,
                                fill: '#'+this.three(),
                                radius: 10,
                                left: 50, 
                                top: 50, 
                            })
                            break;
                        case "textbox":
                            newObj = new fabric.Textbox("Dummy", {
                                "fill": "#"+this.three()
                            })
                            break;
                        default:
                            console.log(nextObj.type)
                    }
                    console.log(nextObj.allProperties)
                    for (let key in newObj){
                        if (key in nextObj){
                            newObj[key] = nextObj[key]
                        }
                        // console.log(key)
                        // newObj[key] = nextObj[key]
                    }
                    for (let key in nextObj){
                        
                            newObj[key] = nextObj[key]
                        
                        // console.log(key)
                        // newObj[key] = nextObj[key]
                    }
                    // console.log(newObj.setupState())
                    canvas.add(newObj)
                    // canvas.insertAt(nextObj,1)
                    canvas.renderAll()
                    canvas.setActiveObject(canvas.getObjects()[canvas.getObjects().length-1])
                    // canvas.getActiveObject().counter++
                    // canvas.setActiveObject(canvas.getObjects().length-1)   
                }
                break
            default:
                console.log(this.props.actionPerformed)
                break
        }
    }
    render(){
        
        return (
            <div style = {{"margin": "auto"}}>
                <canvas id = 'c'></canvas>
            </div>
        )
    }
}
export default DrawingCanvas