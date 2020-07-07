import React, {Component} from 'react'
import {fabric} from 'fabric'
import Actions from '../actions/action'

class DrawingCanvas extends Component{
    constructor(props){
        super(props)
        //stack based on undo list
        this.undoStack = []
        
    }
    componentDidMount(){
        this.canvas = new fabric.Canvas('c',{
            height: 500,
            width: 500,
            backgroundColor: "black",
            isDrawingMode: false,
            stateful:true
        })
        
        this.objToAdd = null

        this.historyTracker = []
        this.redoId = ""
        this.redoAddTrigger = false
        this.propertiesTracker = {"id":[],"properties":[{"id":"", "states": []}]}
        this.historyCounter = -1
        this.stack = []
        this.layer_no = null
        this.drawing = false
        this.objectOver = false
        this.colorActive = false
        this.canvas.on("object:added", (e)=>{
            e.target.selectable = true;
            if (this.redoAddTrigger === true){
                e.target.id = this.redoId;
                this.redoAddTrigger = false
            }
            else{
                if (!("id" in e.target)){
                    e.target.id = Math.random().toString();
                    let isExists = false;
                    this.propertiesTracker.id.forEach((item)=>{
                        if(item===e.target.id){
                            isExists = true;
                        }
                    });
                    if(!isExists){
                        this.propertiesTracker.id.push(e.target.id);
                    }
                }
                
                if("recentAction" in e.target){
                    if (e.target.recentAction === true){
                        console.log("try");
                        delete e.target.recentAction;
                    }
                }else{
                    console.log(e.target.id);
                    e.target.allProperties = [JSON.stringify(e.target)];
                    e.target.counter = 0;
                    this.propertiesTracker.properties.push({"id": e.target.id, "states":[JSON.stringify(e.target)]});
                    // this.propertiesTracker.properties[0].states.push())
                        
                    
                    this.historyTracker.push(JSON.stringify({"id": e.target.id, "counter":e.target.counter, "type": e.target.type}));
                    this.historyCounter++;
                }  
            }
              
        })
        this.canvas.on("object:modified", (e)=>{
            console.log("recentAction in e.target", "recentAction" in e.target);

            if("recentAction" in e.target){
                if (e.target.recentAction === true){
                    console.log("phnch gya hai");
                    delete e.target.recentAction;
                    e.target.setCoords();
                    
                    // console.log(e.target.counter)
                }
            }else{
                // console.log("activeObject.counter>activeObject.allProperties.length-1")
                e.target.counter++;
                
                // e.target.allProperties.pop()
                // e.target.allProperties.push(JSON.stringify(e.target.id, e.target._stateProperties));
                // e.target.allProperties.push(JSON.stringify(e.target));
                // this.historyTracker.push(JSON.stringify({"id": e.target.id, "counter":e.target.counter}))
                // console.log(e.target._stateProperties)
                // console.log(e.target.allProperties)
                let isExists = false;
                // console.log(typeof(this.propertiesTracker.properties[0].states))
                this.propertiesTracker.properties.forEach((item)=>{
                    if(item.id === e.target.id){
                        item.states.pop();
                        item.states.push(JSON.stringify(e.target._stateProperties));
                        item.states.push(JSON.stringify(e.target));
                    }
                })
                
                this.historyTracker.push(JSON.stringify({"id": e.target.id, "counter": e.target.counter, "type": e.target.type}));
                this.historyCounter++;
            }
            
        })
        this.canvas.on("object:removed", (e)=>{
            if("recentAction" in e.target){
                if (e.target.recentAction === true){
                    delete e.target.recentAction;
                }
            }else{
                console.log("remove called");
                e.target.counter--;
                // this.undoStack.push(JSON.stringify({"type":"removed","id": e.target.id, "object":e.target}))
            }
            // this.histroryTracker.push(JSON.stringify({"id": e.target.id, "counter":-1}))
            // this.historyCounter++
            
        })
        this.canvas.on("mouse:down:before", (e) => {
            try{
                if(e.target.selectable ===false){
                    this.canvas.isDrawingMode = true;
                }else{
                    this.canvas.isDrawingMode = false;
                }
            }catch(err){
                if(this.drawing){
                    this.canvas.isDrawingMode = true;
                }else{
                    this.canvas.isDrawingMode = false;
                }
                
            }  
        })
        this.canvas.on("mouse:up", (e) => {
            this.canvas.isDrawingMode = false;
            this.objectOver = true;
        })
        this.canvas.on("mouse:over", (e) => {
            try{
                if(e.target.type === "path"){
                    e.target.set({
                        "selectable": false,
                    })
                }
                else{
                    e.target.set({
                        "selectable": true,
                    })
                }
            }catch(err){
                console.log(err);
            }
        })
        this.canvas.renderAll();
    }
    componentDidUpdate(prevProps){
        this.rand = () => (
            Math.floor(Math.random()*999).toString()[0]
        )
        this.three = () => {
            let i=0;
            let number = "";
            for(i; i<3; i++){
                number = number+this.rand();
            }
            return number;
        }
        let activeObject = null;
        switch(this.props.actionPerformed){
            case Actions.ACTIVE_RED:
                this.canvas.freeDrawingBrush.color = this.props.brushColor;
                this.drawing = true;
                break;
            case Actions.ACTIVE_BLUE:
                this.canvas.freeDrawingBrush.color = this.props.brushColor;
                this.drawing = true;
                break;
            case Actions.ACTIVE_ERASER:
                this.canvas.freeDrawingBrush.color = "black";
                this.drawing = true;
                break;
            case Actions.TEXT_ADDED:
                const text = new fabric.Textbox(this.props.textarea, {
                    "fill": "#"+this.three()
                });
                this.drawing = false;
                this.canvas.add(text);
                this.canvas.setActiveObject(text);
                break;
            case Actions.DOWNLOAD_ACTIVE:
                let payload = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.canvas.toJSON()));
                let dlAnchorElem = document.createElement('a');
                dlAnchorElem.setAttribute("href",payload);
                dlAnchorElem.setAttribute("download", "canvas.json");
                dlAnchorElem.click();
                break
            case Actions.RECTANGLE_ADDED:
                const rectangle = new fabric.Rect({ 
                    width: this.props.rectangleDim[0], 
                    height: this.props.rectangleDim[1], 
                    left: 10, 
                    top: 50, 
                    fill: '#'+this.three(),
                });
                this.canvas.add(rectangle);
                this.canvas.setActiveObject(rectangle);
                this.drawing = false;
                break;
            case Actions.TRIANGLE_ADDED:
                const triangle = new fabric.Triangle({ 
                    width: this.props.triangleDim[0], 
                    height: this.props.triangleDim[1], 
                    left: 30, 
                    top: 50, 
                    fill: '#'+this.three(),
                });
                this.canvas.add(triangle);
                this.canvas.setActiveObject(triangle);
                this.drawing = false;
                break;
            case Actions.CIRCLE_ADDED:
                const circle = new fabric.Circle({radius: 100,
                    fill: '#'+this.three(),
                    radius: this.props.circleRadius,
                    left: 50, 
                    top: 50, 
                });
                this.canvas.add(circle);
                this.canvas.setActiveObject(circle);
                this.drawing = false;
                break;
            case Actions.UNDO:
                const prevObj = JSON.parse(this.historyTracker[this.historyCounter]);
                const objCounter = prevObj["counter"];
                if(objCounter === 0){
                    const objToDel = this.canvas.getObjects().filter((item)=> {
                        if (item.id === prevObj.id) return true
                    })[0];
                    this.canvas.remove(objToDel);
                    
                    try{
                        const nextObj = JSON.parse(this.historyTracker[this.historyCounter-1])["id"];
                        const setActive = this.canvas.getObjects().filter((item)=> {
                            if (item.id === nextObj) return true
                        })[0];
                        this.canvas.setActiveObject(setActive);
                    }catch(err){
                        console.log(err);
                    }
                    this.historyCounter--;
                    this.canvas.renderAll();
                }
                else{
                    console.log("run else state");
                    this.historyCounter--;
                    console.log(this.historyTracker);
                    console.log(this.historyCounter);
                    let id = null;
                    let counter = null;
                    const obj = JSON.parse(this.historyTracker[this.historyCounter]);
                    id = obj["id"];
                    // console.log(obj["counter"])
                    
                        counter = obj["counter"];
                        // console.log(counter)
                        
                        let modifyObj = this.canvas.getObjects().filter((item)=>{
                            // console.log(item.id)
                            if(item.id === id){
                                return true;
                            }
                        })[0];
                        
                        modifyObj.counter = counter;
                        // console.log("modifyObj", modifyObj)
                        const properties = JSON.parse(this.propertiesTracker.properties.filter((item)=>{
                            if(item.id === id){
                                return true;
                            }
                        })[0].states[counter]);
                        console.log(properties);
                        for(let key in modifyObj){
                            if (key in properties){
                                modifyObj[key] = properties[key];
                            }
                        }
                        
                        // modifyObj.setCoords()
                        this.canvas.renderAll();
                        // this.canvas.setActiveObject(modifyObj)
                    
                
                }
                break
            case Actions.REDO:
                this.historyCounter++;
                if(this.historyCounter>(this.historyTracker.length-1)){
                    this.historyCounter = this.historyTracker.length-1;
                }
                const presentHist = JSON.parse(this.historyTracker[this.historyCounter]);
                let newObj = null;
                const nextObj = JSON.parse(this.historyTracker[this.historyCounter]);
                const objectCounter = nextObj["counter"];
                console.log(presentHist);
                console.log(objectCounter);
                if (objectCounter === 0){
                    console.log(presentHist.type)
                    switch(presentHist.type){
                        case "circle":
                            newObj = new fabric.Circle({radius: 100,
                                fill: '#'+this.three(),
                                radius: 10,
                                left: 50, 
                                top: 50, 
                            });
                            break;
                        case "triangle":
                            newObj = new fabric.Triangle({ 
                                width: 10, 
                                height: 10, 
                                left: 30, 
                                top: 50, 
                                fill: '#'+this.three(),
                            });
                            break;
                        case "rect":
                            newObj = new fabric.Rect({  
                                width: 10, 
                                height: 10, 
                                left: 30, 
                                top: 50, 
                                fill: '#'+this.three(),
                            });
                            break;
                        case "textbox":
                            newObj = new fabric.Textbox("Dummy", {
                                "fill": "#"+this.three()
                            });
                            break;
                        case "path":
                            newObj = new fabric.Path('M 0 0 L 50 0 M 0 0 L 4 -3 M 0 0 L 4 3 z', {
                                stroke: 'red',
                                strokeWidth: 1,
                                fill: false,
                                originX: 'left',
                                originY: 'top'
                            });
                            break;
                        default:
                            console.log(presentHist.type);
                    }
                    
                    this.redoAddTrigger = true;
                    this.redoId = presentHist.id;
                    
                    const propertis = JSON.parse(this.propertiesTracker.properties.filter((item)=>{
                        if(item.id === presentHist.id){
                            return true;
                        }
                        
                    })[0].states[presentHist.counter]);
                    
                    for (let key in propertis){
                        if(key in newObj){
                            newObj[key] = propertis[key];
                        }
                    }
                    console.log(propertis)
                    this.canvas.add(newObj);
                    this.canvas.setActiveObject(newObj);
                    this.canvas.renderAll();
                    
                }
                else{
                    const id = presentHist.id;
                    try{
                        console.log(this.canvas.getActiveObject());
                    }catch(err){
                        this.canvas.getObjects().forEach((item)=>{
                            if(item.id === id){
                                this.canvas.setActiveObject(item);
                            }
                        })
                    }
                    const propertis = JSON.parse(this.propertiesTracker.properties.filter((item)=>{
                        if(item.id === id){
                            return true;
                        }
                        
                    })[0].states[presentHist.counter]);
                    
                    if (newObj === null){
                        newObj = this.canvas.getActiveObject();
                    }
                    for (let key in propertis){
                        if(key in newObj){
                            newObj[key] = propertis[key];
                        }
                    }
                    this.canvas.renderAll();
                }
               break;
            default:
                console.log(this.props.actionPerformed);
                break;
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