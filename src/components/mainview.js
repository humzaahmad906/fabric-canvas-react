import React, {Component} from 'react'
import {connect} from 'react-redux'
import DrawingCanvas from './canvas'
import {red, blue, erasor, text, circle, rectangle, triangle, downloadcanvas, undo, redo} from '../actions/action'
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Button';
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
            this.props.downloadcanvas()
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
        console.log(this.color)
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
                 actionperformed = {this.props.lastaction}
                 circleradius = {this.props.circleradius}
                 rectangledim = {this.props.rectangledimention}
                 triangledim = {this.props.triangledimention}
                 jsondown = {this.props.canvasjson}
                 modif = {this.props.modification}/>
            </div>
            
        )
    }
}
const mapDispatchToProps = {red, blue, erasor, text, circle, triangle, rectangle, downloadcanvas, undo, redo}
function mapStateToProps(state){
    console.log(state.erase)
    return ({"color": state.color,
            "erase": state.erase,
            "textbox": state.textbox,
            "lastaction": state.lastaction,
            "rectangledimention": state.rectangledimention,
            "triangledimention": state.triangledimention,
            "circleradius": state.circleradius,
            "canvasjson": state.downloadjson,
            "modification": state.modification
        })
    
}
export default connect(mapStateToProps, mapDispatchToProps)(View)