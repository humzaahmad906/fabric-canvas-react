import React, {Component} from 'react'
import {fabric} from 'fabric'
import {ACTIVE_RED,ACTIVE_BLUE,ACTIVE_ERASER,TEXT_ADDED, RECTANGLE_ADDED, TRIANGLE_ADDED, CIRCLE_ADDED, DOWNLOAD_ACTIVE, UNDO, REDO} from '../actions/action'

class DrawingCanvas extends Component{
    constructor(props){
        super(props)
        this.canvasobjects = []
        this.redopopulate = []
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
                this.canvasobjects.push(e.target)
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
        switch(this.props.actionperformed){
            case ACTIVE_RED:
                this.canvas.freeDrawingBrush.color = this.props.brushColor
                break;
            case ACTIVE_BLUE:
                this.canvas.freeDrawingBrush.color = this.props.brushColor
                break;
            case ACTIVE_ERASER:
                this.canvas.freeDrawingBrush.color = "black"
                break;
            case TEXT_ADDED:
                const text = new fabric.Textbox(this.props.textarea, {
                    "fill": "#"+this.three()
                })
                this.canvas.add(text)
                break;
            case DOWNLOAD_ACTIVE:
                let payload = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.canvas.toJSON()));
                let dlAnchorElem = document.createElement('a');
                dlAnchorElem.setAttribute("href",payload);
                dlAnchorElem.setAttribute("download", "canvas.json");
                dlAnchorElem.click();
                break
            case RECTANGLE_ADDED:
                const rectangle = new fabric.Rect({ 
                    width: this.props.rectangledim[0], 
                    height: this.props.rectangledim[1], 
                    left: 10, 
                    top: 50, 
                    fill: '#'+this.three()
                });
                this.canvas.add(rectangle)
                break
            case TRIANGLE_ADDED:
                const triangle = new fabric.Triangle({ 
                    width: this.props.triangledim[0], 
                    height: this.props.triangledim[1], 
                    left: 30, 
                    top: 50, 
                    fill: '#'+this.three(),
                });
                this.canvas.add(triangle)
                break
            case CIRCLE_ADDED:
                const circle = new fabric.Circle({radius: 100,
                    fill: '#'+this.three(),
                    radius: this.props.circleradius,
                    left: 50, 
                    top: 50, 
                });
                this.canvas.add(circle)
                break
            case UNDO:
                if (this.canvasobjects.length != 0){
                    let objectRemoved = this.canvasobjects[this.canvasobjects.length-1]
                    this.canvasobjects = this.canvasobjects.splice(0,this.canvasobjects.length-1)
                    this.redopopulate.push(objectRemoved)
                    let i
                    for(i=0; i<this.canvas.getObjects().length; i++){
                        if (i<this.canvasobjects.length){
                            this.canvas.getObjects()[i] = this.canvasobjects[i]
                        }
                        else{
                            this.canvas.remove(this.canvas.getObjects()[i])
                        }
                    }
                    this.canvas.renderAll()
                }
               
                break
            case REDO:
                if (this.redopopulate.length!=0){
                    let j
                    let objectAdded = this.redopopulate.pop()
                    this.canvasobjects.push(objectAdded)
                    for(j=this.canvas.getObjects().length; j<this.canvasobjects.length; j++){
                        let obj = this.canvasobjects[j]
                        this.canvas.add(obj)
                    }
                    }
                
                break
            default:
                console.log(this.props.actionperformed)
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