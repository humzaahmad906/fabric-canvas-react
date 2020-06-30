import React, {Component} from 'react'
import {fabric} from 'fabric'
import {ACTIVE_RED,ACTIVE_BLUE,ACTIVE_ERASER,TEXT_ADDED} from '../actions/action'

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