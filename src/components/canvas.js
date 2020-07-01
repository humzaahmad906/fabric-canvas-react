import React, {Component} from 'react'
import {fabric} from 'fabric'
import {ACTIVE_RED,ACTIVE_BLUE,ACTIVE_ERASER,TEXT_ADDED, RECTANGLE_ADDED, TRIANGLE_ADDED, CIRCLE_ADDED, DOWNLOAD_ACTIVE} from '../actions/action'

class DrawingCanvas extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.canvas = new fabric.Canvas('c',{
            height: 500,
            width: 500,
            backgroundColor: "black",
            isDrawingMode: true,
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
        // console.log("#"+this.three)
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
            case TRIANGLE_ADDED:
                const triangle = new fabric.Triangle({ 
                    width: this.props.triangledim[0], 
                    height: this.props.triangledim[1], 
                    left: 30, 
                    top: 50, 
                    fill: '#'+this.three(),
                });
                this.canvas.add(triangle)
            case CIRCLE_ADDED:
                const circle = new fabric.Circle({radius: 100,
                    fill: '#'+this.three(),
                    radius: this.props.circleradius,
                    left: 50, 
                    top: 50, 
                });
                this.canvas.add(circle)
            default:
                console.log(this.props.actionperformed)
                
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