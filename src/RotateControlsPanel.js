import { useRef, useState } from "react";

export default function RotateControlsPanel({changeControlsCallBack}) {
    const [rotateObjValues, setRotateObjValues] = useState({x: 2.5, y: 50, z: 50})

    const xRotationEl = useRef(null)
    const yRotationEl = useRef(null)
    const zRotationEl = useRef(null)
    
    return (
        <div>
            <p>Rotate:</p>
            <div>
                X 
                <input 
                    type="range" 
                    ref={xRotationEl} 
                    min="0.8"  max = "5.6" step="0.4"
                    onChange={(event)=>{
                        setRotateObjValues({
                            x: event.target.value,
                            y: rotateObjValues.y,
                            z: rotateObjValues.z
                        })}}/>
                    <span> {rotateObjValues.x}</span>
            </div>           
            <div>
                Y 
                <input
                    type="range"
                    ref= {yRotationEl}
                    min="0"  max = "50.0" step="5"
                    onChange={(event)=>{
                        setRotateObjValues({
                            x: rotateObjValues.x,
                            y: event.target.value,
                            z: rotateObjValues.z
                        })
                        }}/>
                    <span> {rotateObjValues.y}</span>
            </div>            
            <div>
                Z 
                <input 
                    type="range"
                    ref={zRotationEl} 
                    min="25"  max = "250" step="25"
                    onChange={(event)=>{
                        // setZRotateVal(event.target.value)
                        setRotateObjValues({
                            x: rotateObjValues.x,
                            y: rotateObjValues.y,
                            z: event.target.value
                        })
                    }}/> 
                    <span>{rotateObjValues.z}</span>
            </div>
        </div>
    )
}