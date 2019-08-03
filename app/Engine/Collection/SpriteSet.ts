export { SpriteSet }

import { Type } from "./../Types";
import { ImageCollection } from "./ImageCollection";

class SpriteSet extends ImageCollection
{
    private _Seed:number;
    public get Seed():number { return this._Seed; }
    public set Seed(value:number) { this._Seed = value; }
    public constructor(Old?:SpriteSet, Images?:string[], Name?:string)
    {
        super(Old, Images);
        this.RegisterType(Type.SpriteSet);
        this.RegisterFactory(() => new SpriteSet());
        if(Old != null)
        {
            this._Seed = Old._Seed;
        }
        else
        {
            this._Seed = -1;
        }
    }
    public Copy() : SpriteSet
    {
        let New:SpriteSet = new SpriteSet(this);
        return New;
    }
    public Serialize() : any
    {
        // Override
        let SS = super.Serialize();
        SS.Seed = this._Seed;
        return SS;
    }
    public Deserialize(Data:any) : void
    {
        // Override
        super.Deserialize(Data);
        this._Seed = Data.Seed;
    } 
}