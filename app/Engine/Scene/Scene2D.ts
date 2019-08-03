export  { Scene2D };

import * as Math from "./../../Mathematics/Mathematics";

import { Type } from "./../Types";
import { Scene } from "./Scene";
import { SceneObject } from "../SceneObject/SceneObject";
import { DrawObject } from "../SceneObject/DrawObject/DrawObject";
import { Sprite } from "../SceneObject/DrawObject/Sprite";
import { Tile } from "../SceneObject/DrawObject/Tile";
import { Line } from "../SceneObject/DrawObject/Line";

const SUPPORTED_OBJECT_TYPES = [ Type.Light, Type.Sprite, Type.Tile, Type.Line, Type.SoundObject, Type.UIControlObject ];

class Scene2D extends Scene
{
    private _Trans:Math.Transformation;
    public get Trans() : Math.Transformation { return this._Trans; }
    public set Trans(value:Math.Transformation) { this._Trans = value; }
    public get Sprites() : Sprite[] { return <Sprite[]>this.FindByType(Type.Sprite); }
    public get Tiles() : Tile[] { return <Tile[]>this.FindByType(Type.Tile); }
    public get Lines() : Line[] { return <Line[]>this.FindByType(Type.Line); }   
    public constructor(Old?:Scene2D)
    {
        super(Old);
        this.RegisterType(Type.Scene2D);
        this.RegisterFactory(() => new Scene2D());
        if(Old != null)
        {
            this._Trans = Old._Trans.Copy();
        }
        else
        {
            this._Trans = new Math.Transformation();
        }
    }
    public Copy() : Scene2D
    {
        let New:Scene2D = new Scene2D(this);
        return New;
    }
    public Attach(SO:SceneObject) : void
    {
        // Override
        if(!SO.IsAnyOf(SUPPORTED_OBJECT_TYPES)) return;
        super.Attach(SO);
    }
    public Composite(Chunk:Scene) : boolean
    {
        // Override
        if(!Chunk.Is(Type.Scene2D)) return false;
        for(let i in Chunk.Objects)
        {
            if(Chunk.Objects[i].Is(Type.SoundObject) || Chunk.Objects[i].Is(Type.UIControlObject))
            {
                this.Objects.push(Chunk.Objects[i].Copy());
            }
            else if(Chunk.Objects[i].Is(Type.DrawObject))
            {
                let Drawn:DrawObject = <DrawObject> Chunk.Objects[i].Copy();
                let Chunk2D:Scene2D = <Scene2D> Chunk;
                Drawn.Trans.Composite(Chunk2D.Trans);
                this.Objects.push(Drawn);
            }
        }
        return true;
    }
    public Serialize() : any
    {
        // Override
        let S2D = super.Serialize();
        S2D.Transformations = this._Trans.Serialize();
        return S2D;
    }
    public Deserialize(Data:any) : void
    {
        // Override
        super.Deserialize(Data);
        this._Trans.Deserialize(Data.Transformations);
    }
}