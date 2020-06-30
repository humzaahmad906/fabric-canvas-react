import React, {Component} from 'react'
import {fabric} from 'react-fabricjs'
class DrawingCanvas extends Component{
    constructor(){
        

    }
    componentDidMount(){
        this.canvas = new fabric.Canvas('c')
        this.canvas.setWidth = 500
        this.canvas.setHeight = 500
        this.canvas.setState({
            "backgroundcolor": "#000"
        })
        this.canvas.render()
    }
    render(){
        return (
            <div>
                <canvas id = 'c'>

                </canvas>
            </div>
        )
    }
}