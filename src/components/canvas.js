import React, {Component} from 'react'
import {fabric} from 'fabric'
import Actions from '../actions/action'

class DrawingCanvas extends Component{
    constructor(props){
        super(props)
        this.canvasObjects = []
        this.redoPopulate = []
    }
    componentDidMount(){
        this.canvas = new fabric.Canvas('c',{
            height: 500,
            width: 500,
            backgroundColor: "black",
            isDrawingMode: true,
        })
        this.canvas.on("object:added", (e)=>{
            if (!("id" in e.target)){
                e.target.id = Math.random()
                this.canvasObjects.push(e.target)
            }
        })
        this.canvas.renderAll()
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
        switch(this.props.actionPerformed){
            
            case Actions.ACTIVE_RED:
                this.canvas.freeDrawingBrush.color = this.props.brushColor
                break;
            case Actions.ACTIVE_BLUE:
                this.canvas.freeDrawingBrush.color = this.props.brushColor
                break;
            case Actions.ACTIVE_ERASER:
                this.canvas.freeDrawingBrush.color = "black"
                break;
            case Actions.TEXT_ADDED:
                const text = new fabric.Textbox(this.props.textarea, {
                    "fill": "#"+this.three()
                })
                this.canvas.add(text)
                break;
            case Actions.DOWNLOAD_ACTIVE:
                let payload = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.canvas.toJSON()));
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
                this.canvas.add(rectangle)
                break
            case Actions.TRIANGLE_ADDED:
                const triangle = new fabric.Triangle({ 
                    width: this.props.triangleDim[0], 
                    height: this.props.triangleDim[1], 
                    left: 30, 
                    top: 50, 
                    fill: '#'+this.three(),
                });
                this.canvas.add(triangle)
                break
            case Actions.CIRCLE_ADDED:
                const circle = new fabric.Circle({radius: 100,
                    fill: '#'+this.three(),
                    radius: this.props.circleRadius,
                    left: 50, 
                    top: 50, 
                });
                this.canvas.add(circle)
                break
            case Actions.UNDO:
                if (this.canvasObjects.length != 0){
                    let objectRemoved = this.canvasObjects[this.canvasObjects.length-1]
                    this.canvasObjects = this.canvasObjects.splice(0,this.canvasObjects.length-1)
                    this.redoPopulate.push(objectRemoved)
                    let i
                    for(i=0; i<this.canvas.getObjects().length; i++){
                        if (i<this.canvasObjects.length){
                            this.canvas.getObjects()[i] = this.canvasObjects[i]
                        }
                        else{
                            this.canvas.remove(this.canvas.getObjects()[i])
                        }
                    }
                    this.canvas.renderAll()
                }
               
                break
            case Actions.REDO:
                if (this.redoPopulate.length!=0){
                    let j
                    let objectAdded = this.redoPopulate.pop()
                    this.canvasObjects.push(objectAdded)
                    for(j=this.canvas.getObjects().length; j<this.canvasObjects.length; j++){
                        let obj = this.canvasObjects[j]
                        this.canvas.add(obj)
                    }
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