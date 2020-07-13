import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FontFaceObserver from 'fontfaceobserver';
import {fabric} from 'fabric';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
class TextBoxLayout extends Component{
    constructor(props){
        super(props);
        
        this.changeFontSize=(e,value)=>{
            try{
                if (this.props.canvas.getActiveObject().type === "textbox"){
                    this.props.canvas.getActiveObject().fontSize = value;
                    this.props.canvas.renderAll();
                }
            }catch(err){
                console.log(err)
            }
            
        }
        this.handleChange = (e) => {
            try{
                if (this.props.canvas.getActiveObject().type === "textbox"){
                    this.props.canvas.getActiveObject().set("fontFamily", e.target.value);
                    this.props.canvas.renderAll();
                }
            }catch(err){
                console.log(err)
            }
            
        }
        this.italic = (e) => {
            try{
                if (this.props.canvas.getActiveObject().type === "textbox"){
                    this.props.canvas.getActiveObject().set({
                        "fontWeight": "italic",
                    })
                    this.props.canvas.renderAll();
                }
            }catch(err){
                console.log(err)
            }
            
        }
        this.bold = (e) => {
            try{
                if (this.props.canvas.getActiveObject().type === "textbox"){
                    this.props.canvas.getActiveObject().set({
                        "fontWeight": "bold",
                    })
                    this.props.canvas.renderAll();
                 }
            }catch(err){
                console.log(err)
            }
            
            // console.log(this.props.canvas.getActiveObject().fontWeight)
        }
        this.underline = (e) => {
            try{
                if (this.props.canvas.getActiveObject().type === "textbox"){
                    this.props.canvas.getActiveObject().set({
                        "underline": !this.props.canvas.getActiveObject().underline, 
                    });
                    this.props.canvas.renderAll();
                }
            }catch(err){
                console.log(err)
            }
            
        }
        this.shadow = (e) => {
            try{
                if (this.props.canvas.getActiveObject().type === "textbox"){
                    let shadow = new fabric.Shadow({
                        'color': 'red',
                        'blur': 5,
                    })
                    if (this.props.canvas.getActiveObject().shadow === null){
                        this.props.canvas.getActiveObject().set({
                            'shadow': shadow,
                        })
                    }
                    else{
                        this.props.canvas.getActiveObject().set({
                            'shadow': null,
                        })
                    }
                    
                    this.props.canvas.renderAll();
                    
                }
            }catch(err){
                console.log(err)
            }
            
        }
    }
    
    render(){
        return (
            <div>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Fonts</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={this.handleChange}
                    >
                        <MenuItem value={"Times New Roman"}>Times New Roman</MenuItem>
                        <MenuItem value={"Arial"}>Arial</MenuItem>
                        <MenuItem value={"Pacifico"}>Pacifico</MenuItem>
                    </Select>
                </FormControl>
                <Button variant = "contained" onClick = {this.italic}>
                    Italic
                </Button>
                <Button variant = "contained" onClick = {this.bold}>
                    Bold
                </Button>
                <Button variant = "contained" onClick = {this.underline}>
                    Underline
                </Button>
                <Button variant = "contained" onClick = {this.shadow}>
                    Shadow
                </Button>
                <div>
                    <Typography id="discrete-slider" gutterBottom>
                        Font Size
                    </Typography>
                    <Slider
                        defaultValue={30}
                        aria-labelledby="continuous-slider"
                        valueLabelDisplay="auto"
                        min={10}
                        max={100}
                        onChange={this.changeFontSize}
                    />
                </div>
            </div>
        )
    }
}
export default TextBoxLayout;