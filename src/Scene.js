import React, {Suspense, useEffect} from 'react'
import { Asset } from "./Asset"
import { Html, useProgress } from '@react-three/drei'
// import { Text } from "troika-three-text";
// import { extend } from "react-three-fiber";
// Register Text as a react-three-fiber element
// extend({ Text });

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}
/*
function Cube() {
    return (
        <mesh rotation={[0,10,0]}>
            <boxGeometry attach="geometry" args={[1,1,1]}/>
            <meshStandardMaterial attach="material" color="#6be092"/>
        </mesh>
    )
}
*/
export default function Scene(props = {objectName: "assets/palash.glb", position:[0,0,0], rotation:[0,0,0], scale:[1,1,1]}) {
    useEffect(() => {
        function action(){

        }
    })
    return (
    <>       
        <pointLight position={[0,20,10]} intensity={0.75}/>
        <pointLight position={[-5, 1, 1]} intensity={0.75} />
        
        <Suspense fallback={<Loader />}>
            <Asset url={`/assets/${props.objectName}.glb`} position={props.position} rotation={props.rotation} scale={props.scale}/> 
        </Suspense>
    </>
    )
}