import { useRef, useMemo } from 'react'
import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useFBX } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";

export function Asset({ url, position= [0,0,0], rotation = [0,0,0], scale=[1,1,1]}) {
    const gltf = useLoader(GLTFLoader, url);
    const copiedScene = useMemo(() => gltf.scene.clone(), [gltf.scene])
    return <primitive object={copiedScene} dispose={null} rotation={rotation} position={position} scale={scale}/>;
}

export function AssetFBX({url }) {
    console.log(url)
    const ref = useRef(null)
    // const fbx = useFBX(url)
    const fbx = useLoader(FBXLoader, url)
    const copiedScene = useMemo(() => fbx.scene.clone(), [fbx.scene])
    return <primitive object={fbx} dispose={null}/>
}

export function TextureForFBX({url}) {
    const texture = useLoader(TextureLoader, url)
    return <meshStandardMaterial map={texture} attach="material" />
}