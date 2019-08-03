export { SpriteSetCollection }

import * as Core from "./../../Core/Core";

import { Type } from "./../Types";
import { SpriteSet } from "./SpriteSet";
import { ImageCollection } from "./ImageCollection";

class SpriteSetCollection extends ImageCollection
{
    private _SpriteSets:SpriteSet[];
    public get SpriteSets():SpriteSet[] { return this._SpriteSets; }
    public set SpriteSets(value:SpriteSet[]) { this._SpriteSets = value; }
    public get Images():string[] { return this.PackImages(); }
    public constructor(Old?:SpriteSetCollection, SpriteSets?:SpriteSet[])
    {
        super(Old);
        this.RegisterType(Type.SpriteSetCollection);
        this.RegisterFactory(() => new SpriteSetCollection());
        this._SpriteSets = [];
        if(Old != null)
        {
            this._SpriteSets = Old._SpriteSets.map(Item => Item.Copy());
        }
        else
        {
            if(SpriteSets) this._SpriteSets = SpriteSets;
        }
    }
    public Copy() : SpriteSetCollection
    {
        return new SpriteSetCollection(this);
    }
    public PackImages() : string[]
    {
        let Images:string[] = [];
        for(let i in this._SpriteSets)
        {
            for(let j in this._SpriteSets[i].Images)
            {
                Images.push(this._SpriteSets[i].Images[j]);
            }
        }
        return Images;
    }
    public Serialize() : any
    {
        let SSC = super.Serialize();
        SSC.SpriteSets = this.SpriteSets.map(Item => Core.Serialization.Serialize(Item));
        return SSC;
    }
    public Deserialize(Data:any) : void
    {
        super.Deserialize(Data);
        this.SpriteSets = Data.SpriteSets.map(Item => Core.Serialization.Deserialize(Item));
    }
}