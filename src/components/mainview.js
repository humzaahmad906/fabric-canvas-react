import React, {Component} from 'react'
import {connect} from 'react-redux'
import DrawingCanvas from './canvas'
import {red, blue, erasor, text} from '../actions/action'
import Button from '@material-ui/core/Button';
class View extends Component{
    constructor(props){
        super(props)
        this.color = null    
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
                    
                </div>
                <DrawingCanvas brushColor = {this.color} eraserColor = {this.props.erase} textarea = {this.props.textbox} actionperformed = {this.props.lastaction}/>
            </div>
            
        )
    }
}
const mapDispatchToProps = {red, blue, erasor, text}
function mapStateToProps(state){
    console.log(state.erase)
    return ({"color": state.color,
            "erase": state.erase,
            "textbox": state.textbox,
            "lastaction": state.lastaction,
        })
    
}
export default connect(mapStateToProps, mapDispatchToProps)(View)