export  { DrawEngineType, DrawEngine };

import * as Math from "./../Mathematics/Mathematics"
import * as Engine from "./../Engine/Engine";
import * as Util from "./../Util/Util";

enum DrawEngineType
{
    ThreeJS = 0
}
class DrawEngine
{
    private _Matrix:Math.MatrixTransformer;
    private _Renderer:any;
    protected _FixedSize:boolean;
    protected _GlobalScale:Math.Vertex;
    protected _GlobalOffset:Math.Vertex;
    protected _Resolution:Math.Vertex;
    protected _Target:any;
    protected _Parent:any;
    public get Renderer():any { return this._Renderer; }
    public set Renderer(value:any) { this._Renderer = value; }
    public get GlobalScale():Math.Vertex { return this._GlobalScale; }
    public get GlobalOffset():Math.Vertex { return this._GlobalOffset; }
    public get Resolution():Math.Vertex { return this._Resolution; }
    public Data: { [key: string]:any; } = {};
    public constructor(Old?:DrawEngine)
    {
        this._FixedSize = false;
        Util.Log.Info("ToyBox Version " + Engine.Settings.Version, null, "Engine");
        this._Matrix = new Math.MatrixTransformer();
    }
    public Copy() : DrawEngine
    {
        let New:DrawEngine = new DrawEngine(this);
        return New;
    }
    public UpdateResolution(Resolution?:Math.Vertex, FixedSize?:boolean) : void
    {
        // Virtual
        if(Resolution) this._Resolution = Resolution;
        if(FixedSize != null) this._FixedSize = FixedSize;
    }
    public TransformToCanvas(X:number, Y:number) : Math.Vertex
    {
        if(this._FixedSize) return new Math.Vertex(X, Y, 0);
        return new Math.Vertex((X / this._Target.clientWidth) * this._Resolution.X, (Y / this._Target.clientHeight) * this._Resolution.Y, 0);
    }
    public Draw2DScene(Scene:Engine.Scene2D, Width:number, Height:number) : void
    {
        // Virtual
    }
    public Preload2DScene(Scene:Engine.Scene2D, ReportProgress:Function) : void
    {
        // Virtual
    }
    public Draw3DScene(Scene:Engine.Scene, Width:number, Height:number) : void
    {
        // Virtual
    }
    protected DrawSprite(Scene:Engine.Scene, Drawn:Engine.Sprite) : void
    {
        // Virtual
    }
    protected LoadSprite(Scene:Engine.Scene, Drawn:Engine.Sprite, LoadData:any) : void
    {
        // Virtual
    }
    protected DrawTile(Scene:Engine.Scene, Drawn:Engine.Tile) : void
    {
        // Virtual
    }
    protected LoadImage(Scene:Engine.Scene, Drawn:Engine.Tile, LoadData:any) : void
    {
        // Virtual
    }
    protected LoadTile(Scene:Engine.Scene, Drawn:Engine.Tile, LoadData:any) : void
    {
        // Virtual
    }
    protected LoadLight(Scene:Engine.Scene, Drawn:Engine.Light, LoadData:any) : void
    {
        // Virtual
    }
}