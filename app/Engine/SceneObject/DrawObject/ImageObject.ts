export { ImageObject }

import * as Math from "./../../../Mathematics/Mathematics";

import { Type } from "./../../Types";
import { Material } from "./../../Material/Material";
import { DrawObject } from "./DrawObject";
import { ImageCollection } from "./../../Collection/ImageCollection";
import { ImageObjectEvents } from "./../../Events/ImageObjectEvents";

class ImageObject extends DrawObject
{
    // Abstract
    private _FlipX:boolean;
    private _FlipY:boolean;
    private _RepeatX:number;
    private _RepeatY:number;
    private _AmbientColor:Math.Color;
    private _Material:Material;
    protected _Collection:ImageCollection;
    protected _NormalCollection:ImageCollection;
    protected _SpecularCollection:ImageCollection;
    public get Index() : number { /*Virtual*/ return -1; }
    public set Index(value:number) { /*Virtual*/ }
    public get Images() : string[] { /* Virtual */ return this._Collection.Images; }
    public get NormalMaps() : string[] { /* Virtual */ return this._NormalCollection.Images; }
    public get SpecularMaps() : string[] { /* Virtual */ return this._SpecularCollection.Images; }
    public get FlipX():boolean { return this._FlipX; }
    public set FlipX(value:boolean) { this._FlipX = value; this.Modified = true; }
    public get FlipY():boolean { return this._FlipY; }
    public set FlipY(value:boolean) { this._FlipY = value; this.Modified = true; }
    public get RepeatX():number { return this._RepeatX; }
    public set RepeatX(value:number) { this._RepeatX = value; this.Modified = true; }
    public get RepeatY():number { return this._RepeatY; }
    public set RepeatY(value:number) { this._RepeatY = value; this.Modified = true; }
    public get AmbientColor():Math.Color { return this._AmbientColor; }
    public set AmbientColor(value:Math.Color) { this._AmbientColor = value; }
    public get Material():Material { return this._Material; }
    public set Material(value:Material) { this._Material = value; }
    public get Collection():ImageCollection { return this._Collection; }
    public set Collection(value:ImageCollection) { this._Collection = value; }
    public get NormalCollection():ImageCollection { return this._NormalCollection; }
    public set NormalCollection(value:ImageCollection) { this._NormalCollection = value; }
    public get SpecularCollection():ImageCollection { return this._SpecularCollection; }
    public set SpecularCollection(value:ImageCollection) { this._SpecularCollection = value; }
    public get Events():ImageObjectEvents { return <ImageObjectEvents>this._Events; }
    public constructor(Old?:ImageObject)
    {
        super(Old);
        this.RegisterType(Type.ImageObject);
        this.RegisterFactory(() => new ImageObject());
        if(Old != null)
        {
            this._FlipX = Old._FlipX;
            this._FlipY = Old._FlipY;
            this._RepeatX = Old._RepeatX;
            this._RepeatY = Old._RepeatY;
            this._AmbientColor = Old._AmbientColor.Copy();
            this._Material = Old._Material.Copy();
            this._Collection = Old._Collection.Copy();
            this._NormalCollection = Old._NormalCollection.Copy();
            this._SpecularCollection = Old._SpecularCollection.Copy();
        }
        else
        {
            this._Events = new ImageObjectEvents();
            this._FlipX = false;
            this._FlipY = false;
            this._RepeatX = 1;
            this._RepeatY = 1;
            this._AmbientColor = Math.Color.FromRGBA(50,50,50,255);
            this._Material = new Material();
            this._Collection = new ImageCollection();
            this._NormalCollection = new ImageCollection();
            this._SpecularCollection = new ImageCollection();
        }
    }
    public Copy() : ImageObject
    {
        return new ImageObject(this);
    }
    public Serialize() : any
    {
        // Override
        let IO:any = super.Serialize();
        IO.FlipX = this._FlipX;
        IO.FlipY = this._FlipY;
        IO.RepeatX = this._RepeatX;
        IO.RepeatY = this._RepeatY;
        IO.AmbientColor = this._AmbientColor.Serialize();
        IO.Material = this._Material.Serialize();
        return IO;
    }
    public Deserialize(Data:any) : void
    {
        // Override
        super.Deserialize(Data);
        this._FlipX = Data.FlipX;
        this._FlipY = Data.FlipY;
        this._RepeatX = Data.RepeatX;
        this._RepeatY = Data.RepeatY;
        this._AmbientColor.Deserialize(Data.AmbientColor);
        this._Material.Deserialize(Data.Material);
    }
}