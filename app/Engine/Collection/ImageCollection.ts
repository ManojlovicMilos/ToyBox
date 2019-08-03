export { ImageCollection }

import * as Core from "./../../Core/Core";

import { Type } from "./../Types";

class ImageCollection extends Core.BaseObject
{
    private _Origin:string;
    private _Images:string[];
    public get Origin():string { return this._Origin; }
    public get Images():string[] { return this._Images; }
    public set Images(value:string[]) { this._Images = value; }
    public constructor(Old?:ImageCollection, Images?:string[])
    {
        super(Old);
        this.RegisterType(Type.ImageCollection);
        this.RegisterFactory(() => new ImageCollection());
        if(Old != null)
        {
            this._Origin = Old._Origin;
            this._Images = [ ...Old._Images ];
        }
        else
        {
            this._Origin = this._ID;
            if(Images) this._Images = Images;
            else this._Images = [];
        }
    }
    public Copy() : ImageCollection
    {
        return new ImageCollection(this);
    }
    public Serialize() : any
    {
        // Override
        let IC = super.Serialize();
        IC.Origin = this._Origin;
        IC.Images = this._Images;
        return IC;
    }
    public Deserialize(Data) : void
    {
        // Override
        super.Deserialize(Data);
        this._Origin = Data.Origin;
        this._Images = Data.Images;
    }
}