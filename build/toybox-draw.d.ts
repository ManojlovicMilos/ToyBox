import * as Math from "./toybox-math";
import * as Engine from "./toybox-engine";

export enum DrawEngineType
{
    ThreeJS = "ThreeJS"
}

export class DrawEngine
{
    Renderer:any;
    GlobalScale:Math.Vector;
    Resolution:Math.Vector;
    Data: any;
    constructor(Old?:DrawEngine)
    Copy() : DrawEngine
    UpdateResolution(Resolution?:Math.Vector, FixedSize?:boolean) : void
    TransformToCanvas(X:number, Y:number) : Math.Vector
    Draw2DScene(Scene:Engine.Scene2D, Width:number, Height:number) : void
    Draw3DScene(Scene:Engine.Scene, Width:number, Height:number) : void
    DrawSprite(Scene:Engine.Scene, Drawn:Engine.Sprite) : void
    protected LoadSprite(Scene:Engine.Scene, Drawn:Engine.Sprite) : void
    DrawTile(Scene:Engine.Scene, Drawn:Engine.Tile) : void
    protected LoadTile(Scene:Engine.Scene, Drawn:Engine.Tile) : void
}