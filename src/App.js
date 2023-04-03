import React, { useState, useRef} from "react";
import { Route, Routes, useParams} from 'react-router-dom';
import './App.css';
import { Canvas } from 'react-three-fiber'

import Scene from './Scene';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { useThree, useFrame, extend } from "react-three-fiber";
import Artifact3DObjectsService from "./data/objects_info/artifact3DobjectsService";

extend({ OrbitControls });

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls class.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls

  const {
    camera,
    gl: { domElement }
  } = useThree();

  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame(state => controls.current.update());
  return (
    <orbitControls
      enableZoom={true}
      ref={controls}
      args={[camera, domElement]}
      maxAzimuthAngle={Math.PI / 4}
      maxPolarAngle={Math.PI}
      minAzimuthAngle={-Math.PI / 4}
      minPolarAngle={0}
    />
  );
};

function App() {
  const [object3D, setObject3D] = useState(Artifact3DObjectsService.getArtifact3DObjectByName('zamok'));
  Artifact3DObjectsService.getAllArtifact3DObjects()
  return (
    <div className="App">
      <h2>Доступні 3Д об'єкти і посилання до них</h2>
      <hr/>
      {
      // <Canvas camera = {{ fov: 75, near: 0.1, far: 1000, position: [-0.65, 0.25, 0.15] }}>
      // <CameraControls enableZoom={true}/>
      
        // <Scene objectName={'monah1'} />
      
      // </Canvas>
      }
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/models/:id" element={<ModelPage/>} />
            <Route path="*" element={<h1>404: Not Found</h1>} />
        </Routes>
    </div>
  );
}

export default App;

function CanvasWith3DObj(props) {
  return (
    <Canvas camera = {{ fov: 75, near: 0.1, far: 1000, position: [-0.65, 0.25, 0.15] }}>
      <CameraControls enableZoom={true}/>
      <Scene objectName={props.object3D.objectName} scale={props.object3D.scale} position={props.object3D.position} rotation={props.object3D.rotation}/>
    </Canvas>
  )

}

function ModelPage(props) {
  let { id } = useParams();
  const modelName = id|| 'monah1'
  return (
    <CanvasWith3DObj object3D={Artifact3DObjectsService.getArtifact3DObjectByName(modelName)} />
  )
}

function MainPage() {
  return <ObjectsTable />
}

function ObjectsTable() {
    const rows = Artifact3DObjectsService.getAllArtifact3DObjects().map((objectInfo) => {
      return (
        <tr key={objectInfo.objectName} style={{marginTop: "12px"}}>
          <td><img src={objectInfo.imageUrl} alt="image description" width="300" height="200"/></td>
          <td style={{textAlign: "left", verticalAlign: "top"}}>            
              <p><b>Title:</b><span>{objectInfo.title}</span></p>
              <p><b>Опис:</b><span>{objectInfo.description}</span></p>
              <p><b><a href={objectInfo.wikiLink}>Вікі сторінка:</a></b></p>
              <p><b><a href={`/models/${objectInfo.objectName}`}>Сторінка з 3Д об"єктом:</a></b></p>
          </td>
        </tr>
      )
    })
  return (
    <div>
      <table>
        {rows}
      </table>
    </div> 
  )
}

