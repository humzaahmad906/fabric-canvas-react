import React, {Component} from 'react'
import {connect} from 'react-redux'
import DrawingCanvas from './canvas'
import Actions from '../actions/action'
// import {red, blue, erasor, text, circle, rectangle, triangle, downloadCanvas, undo, redo} from '../actions/action'
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Button';
let a = Actions
class View extends Component{
    constructor(props){
        super(props)
        this.color = null
        this.json = false
        this.penRed = () => {
            if(this.props.erase){
                this.props.erasor()
            }
            this.props.red()
            console.log(this.props.red())
            
        }
        this.penBlue = () => {
            if(this.props.erase){
                this.props.erasor()
            }
            this.props.blue()
        }
        this.erasePath = () => {
            this.props.erasor()
        }
        this.addText = () => {
            this.props.text()
        }
        this.addTriangle = () => {
            this.props.triangle()
        }
        this.addRectangle = () => {
            this.props.rectangle()
        }
        this.addCircle = () => {
            this.props.circle()
        }
        this.downloadJson = () => {
            this.props.downloadCanvas()
        }
        this.undo = () => {
            this.props.undo()
        }
        this.redo = () => {
            this.props.redo()
        }
    }
    
    render(){
        if (this.props.color === "BLUE"){
            this.color = "blue"
        }
        else{
            this.color = "red"
        }
        return(
            <div>
                <div>
                    <Button variant = "contained" onClick = {this.penRed} color = "secondary">
                        Red
                    </Button>
                    <Button variant = "contained" onClick = {this.penBlue} color = "primary">
                        Blue
                    </Button>
                    <Button variant = "contained" onClick = {this.erasePath}>
                        Erasor
                    </Button>
                    <Button variant = "contained" onClick = {this.addText}>
                        Add Text
                    </Button>
                    <Button variant = "contained" onClick = {this.addTriangle}>
                        Add Triangle
                    </Button>
                    <Button variant = "contained" onClick = {this.addRectangle}>
                        Add Rectangle
                    </Button>
                    <Button variant = "contained" onClick = {this.addCircle}>
                        Add Circle
                    </Button>
                    <Button variant = "contained" onClick = {this.downloadJson}>
                        Download JSON
                    </Button>
                    <Button variant = "contained" onClick = {this.undo}>
                        Undo
                    </Button>
                    <Button variant = "contained" onClick = {this.redo}>
                        Redo
                    </Button>
                    
                </div>
                <div>
                    <Slider value = {50} aria-labelledby="continuous-slider" />
                </div>
                
                <DrawingCanvas
                 brushColor = {this.color}
                 eraserColor = {this.props.erase}
                 textarea = {this.props.textbox}
                 actionPerformed = {this.props.lastAction}
                 circleRadius = {this.props.circleRadius}
                 rectangleDim = {this.props.rectangleDimention}
                 triangleDim = {this.props.triangleDimention}
                 jsonDown = {this.props.canvasJson}
                 modif = {this.props.modification}/>
            </div>
            
        )
    }
}
const red = a.red; const blue = a.blue; const erasor = a.erasor; const text = a.text; const circle = a.circle; const triangle = a.triangle; const rectangle = a.rectangle; const downloadCanvas = a.downloadCanvas; const undo = a.undo; const redo = a.redo;
const mapDispatchToProps = {red, blue, erasor, text, circle, triangle, rectangle, downloadCanvas, undo, redo}
function mapStateToProps(state){
    return ({"color": state.color,
            "erase": state.erase,
            "textbox": state.textbox,
            "lastAction": state.lastAction,
            "rectangleDimention": state.rectangleDimention,
            "triangleDimention": state.triangleDimention,
            "circleRadius": state.circleRadius,
            "canvasJson": state.downloadJson,
            "modification": state.modification
        })
    
}
export default connect(mapStateToProps, mapDispatchToProps)(View)