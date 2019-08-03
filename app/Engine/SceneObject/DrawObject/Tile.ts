export  { Tile };

import { Type } from "../../Types";
import { ImageObject } from "./ImageObject";
import { ImageCollection } from "../../Collection/ImageCollection";

class Tile extends ImageObject
{
    private _Index:number;
    public get Index():number { /*Override*/ return this._Index; }
    public set Index(value:number)
    {
        if(this._Collection.Images.length > value) this._Index = value;
        else this._Index = 0;
        this.Modified = true;
    }
    public constructor(Old?:Tile)
    {
        super(Old);
        this.RegisterType(Type.Tile);
        this.RegisterFactory(() => new Tile());
        if(Old != null)
        {
            this._Index = Old._Index;
            this._Collection = Old._Collection;
            this._NormalCollection = Old._NormalCollection;
        }
        else
        {
            this._Index = -1;
            this._Collection = new ImageCollection();
            this._NormalCollection = new ImageCollection();
        }
    }
    public Copy() : Tile
    {
        return new Tile(this);
    }
    public Serialize() : any
    {
        // Override
        let T = super.Serialize();
        T.Index = this._Index;
        T.Collection = this._Collection.Serialize();
        return T;
    }
    public Deserialize(Data) : void
    {
        // Override
        super.Deserialize(Data);
        this._Index = Data.Index;
        this._Collection.Deserialize(Data.Collection);
    }
}