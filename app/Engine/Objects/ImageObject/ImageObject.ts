export { ImageObject }

import * as Math from "../../../Mathematics/Mathematics";

import { DrawObject } from "../DrawObject/DrawObject";
import { Material } from "../../Material/Material";
import { ImageCollection } from "../../Resources/ImageCollection/ImageCollection";
import { ImageObjectEventPackage } from "./ImageObjectEventPackage";

// abstract
class ImageObject extends DrawObject
{
    public flipX: boolean;
    public flipY: boolean;
    public repeatX: number;
    public repeatY: number;

    public get index(): number { /*virtual*/ return -1; }
    public set index(value: number) { /*virtual*/ }

    protected _Collection: ImageCollection;
    protected _NormalCollection: ImageCollection;
    protected _SpecularCollection: ImageCollection;
    public get Index(): number { /*Virtual*/ return -1; }
    public set Index(value: number) { /*Virtual*/ }
    public get Images(): string[] { /* Virtual */ return this._Collection.Images; }
    public get NormalMaps(): string[] { /* Virtual */ return this._NormalCollection.Images; }
    public get SpecularMaps(): string[] { /* Virtual */ return this._SpecularCollection.Images; }
    public get Collection(): ImageCollection { return this._Collection; }
    public set Collection(value: ImageCollection) { this._Collection = value; }
    public get NormalCollection(): ImageCollection { return this._NormalCollection; }
    public set NormalCollection(value: ImageCollection) { this._NormalCollection = value; }
    public get SpecularCollection(): ImageCollection { return this._SpecularCollection; }
    public set SpecularCollection(value: ImageCollection) { this._SpecularCollection = value; }
    public get Events(): ImageObjectEventPackage { return this.events as ImageObjectEventPackage; }

    public constructor(old?: ImageObject) {
        super(old);
        this.registerType(ImageObject);
        this.flipX = old?.flipX || false;
        this.flipY = old?.flipY || false;
        this.repeatX = old?.repeatX || 1;
        this.repeatY = old?.repeatY || 1;


        if (Old != null)
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
            this._Events = new ImageObjectEventPackage();
            this._FlipX = false;
            this._FlipY = false;
            this._RepeatX = 1;
            this._RepeatY = 1;
            this._AmbientColor = Math.Color.FromRGBA(50, 50, 50, 255);
            this._Material = new Material();
            this._Collection = new ImageCollection();
            this._NormalCollection = new ImageCollection();
            this._SpecularCollection = new ImageCollection();
        }
    }

    public override duplicate(): ImageObject {
        return new ImageObject(this);
    }
}
