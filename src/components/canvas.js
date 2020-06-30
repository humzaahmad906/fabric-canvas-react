import React, {Component} from 'react'
import {fabric} from 'react-fabricjs'
class DrawingCanvas extends Component{
    constructor(){
        this.refs = React.createRef()
    }
    render(){
        return (
            <div>
                <canvas id = 'c'
                ref = {this.refs}
                >

                </canvas>
            </div>
        )
    }
}