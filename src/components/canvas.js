import React, {Component} from 'react'
import {fabric} from 'fabric'
class DrawingCanvas extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.canvas = new fabric.Canvas('c',{
            height: 500,
            width: 500,
            backgroundColor: "black"
        })
        
        this.canvas.renderAll()
    }
    render(){
        return (
            <div>
                <canvas id = 'c'></canvas>
            </div>
        )
    }
}
export default DrawingCanvas