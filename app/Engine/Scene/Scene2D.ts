import * as Core from "../../Core/Core";
import * as Math from "./../../Mathematics/Mathematics";

import Scene from "./Scene";
import Tile from "./Tile";
import Sprite from "./Sprite";
import SoundObject from "./SoundObject";
import SceneObject from "./SceneObject";
import DrawObject from "./../Scene/DrawObject";

@Core.TypedObject('TBX.Scene2D')
class Scene2D extends Scene {
    private _Trans: Math.Transformation;

    public get Trans(): Math.Transformation { return this._Trans; }
    public set Trans(value: Math.Transformation) { this._Trans = value; }
    public get Sprites(): Sprite[] {
        return <Sprite[]>this.FindByDrawType(Sprite.TypeNameToken);
    }
    public get Tiles(): Tile[] {
        return <Tile[]>this.FindByDrawType(Tile.TypeNameToken);
    }

    public constructor(Old?: Scene2D) {
        super(Old);
        this.RegisterType(Scene2D);
        this._Trans = Old?._Trans.Copy() || new Math.Transformation();
    }

    public override Copy(): Scene2D {
        return new Scene2D(this);
    }

    public Composite(Chunk: Scene): boolean {
        // Override
        if (!Chunk.Is(Scene2D)) return false
        for (let i in Chunk.Objects) {
            if (Chunk.Objects[i].Is(SoundObject.TypeNameToken)) {
                this.Attach(Chunk.Objects[i].Copy() as SceneObject);
            }
            else if (Chunk.Objects[i].Is(DrawObject)) {
                let Drawn = <DrawObject>Chunk.Objects[i].Copy();
                let Chunk2D = <Scene2D>Chunk;
                Drawn.Trans.Composite(Chunk2D.Trans);
                this.Objects.push(Drawn);
            }
        }
        return true;
    }

    public override Serialize(): any {
        return {
            ...super.Serialize(),
            Transformations: this._Trans.Serialize(),
        }
    }

    public override Deserialize(Data: any): void {
        super.Deserialize(Data);
        this._Trans.Deserialize(Data.Transformations);
    }
}

export default Scene2D;
