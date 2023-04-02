import kulchyckiy from './kulchyckiy.json'
import monah from './monah.json'
import zamok from './zamok.json'
import palash from './palash.json'

let artifact3DObjects = [kulchyckiy, monah, zamok, palash]

export default class Artifact3DObjectsService{

    static getAllArtifact3DObjects() {
        return artifact3DObjects;
    }

    static getArtifact3DObjectByName(objectName) {
        console.log(objectName)
        return Artifact3DObjectsService.getAllArtifact3DObjects().filter((object3D) => object3D.objectName === objectName)[0]
    }


}