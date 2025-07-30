import * as Math from "../../../Mathematics/Mathematics";

import Scene from "../Scene/Scene";
import Tile from "../../Objects/Drawn/Tile/Tile";
import Light from "../../Objects/Lights/Light/Light";
import Sprite from "../../Objects/Drawn/Sprite/Sprite";
import SceneObject from "../../Objects/SceneObject/SceneObject";
import DrawObject from "../../Objects/Drawn/DrawObject/DrawObject";

class Scene2D extends Scene {
    public get tiles(): Tile[] { return this.findChildrenByType(Tile); }
    public get sprites(): Sprite[] { return this.findChildrenByType(Sprite); }

    public constructor(old?: Scene2D) {
        super(old);
    }

    public override duplicate(): Scene2D {
        return new Scene2D(this);
    }

    public override attach(sceneObject: SceneObject): void {
        if (!sceneObject.is(DrawObject) || sceneObject.isAnyOf([Tile, Sprite, Light])) {
            super.attach(sceneObject);
        }
    }

    public override loadChunk(chunk: Scene, offset: Math.Vertex): boolean {
        if (chunk.is(Scene2D)) return false;
        for (let sceneObject of chunk.children) {
            if (sceneObject.is(DrawObject)) {
                const newObject = sceneObject.duplicate() as DrawObject;
                newObject.transformation.translation.add(offset);
                this.attach(newObject);
            } else {
                this.attach(sceneObject.duplicate() as SceneObject);
            }
        }
        return true;
    }
}

export default Scene2D;
