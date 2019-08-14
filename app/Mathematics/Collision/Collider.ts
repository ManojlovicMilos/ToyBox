export { Collider }

import { Vector } from "../Vector";
import { CollisionType } from "./CollisionData";
import { Transformation } from "../Transformation";

class Collider extends Transformation
{
    private _Type:CollisionType;
    private _Reference:any;
    public get Type():CollisionType { return this._Type; }
    public set Type(value) { this._Type = value; }
    public get Reference():any { return this._Reference; }
    public set Reference(value) { this._Reference = value; }
    public get Position():Vector { return this.Translation; }
    public set Position(value:Vector) { this.Translation = value; }
    public constructor(Old?:Collider)
    {
        super(Old);
        if(Old != null)
        {
            this._Type = Old._Type;
            this._Reference = Old._Reference;
        }
        else
        {
            this._Type = CollisionType.Rectangular;
        }
    }
    public Copy(): Collider
    {
        return new Collider(this);
    }
    public Serialize() : any
    {
        let C = super.Serialize();
        C.Type = this._Type;
        return C;
    }
    public Deserialize(Data) : void
    {
        super.Deserialize(Data);
        this._Type = <CollisionType> Data._Type;
    }
}