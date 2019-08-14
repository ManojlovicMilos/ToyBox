export  { CollisionType, CollisionData };

import { Vector } from "../Vector";
import { CollisionResult } from "./CollisionResult";

enum CollisionType
{
    Radius,
    Rectangular,
    Horizontal,
    Vertical
}
class CollisionData
{
    private _Active:boolean;
    private _Tags:string[];
    private _Scale:Vector;
    private _Offset:Vector;
    private _Type:CollisionType;
    private _Result:CollisionResult;
    private _Specific:any;
    public get Active():boolean { return this._Active; }
    public set Active(value:boolean) { this._Active = value; }
    public get Tags():string[] { return this._Tags; }
    public set Tags(value:string[]) { this._Tags = value; }
    public get Scale():Vector { return this._Scale; }
    public set Scale(value:Vector) { this._Scale = value; }
    public get Offset():Vector { return this._Offset; }
    public set Offset(value:Vector) { this._Offset = value; }
    public get Type():CollisionType { return this._Type; }
    public set Type(value:CollisionType) { this._Type = value; }
    public get Result():CollisionResult { return this._Result; }
    public set Result(value:CollisionResult) { this._Result = value; }
    public get Specific():any { return this._Specific; }
    public constructor(Old?:CollisionData)
    {
        if(Old)
        {
            this._Active = Old._Active;
            this._Type = Old._Type;
            this._Tags = [];
            this._Scale = (Old.Scale)?Old._Scale.Copy():null;
            for(let i in Old._Tags) this._Tags.push(Old._Tags[i]);
            this._Result = new CollisionResult();
            this._Specific = {};
        }
        else
        {
            this._Active = false;
            this._Type = CollisionType.Rectangular;
            this._Tags = [];
            this._Scale = null;
            this._Result = new CollisionResult();
            this._Specific = {};
        }
    }
    public Copy() : CollisionData
    {
        return new CollisionData(this);
    }
    public Serialize() : any
    {
        // TODO
    }
    public Deserialize(Data) : void
    {
        // TODO
    }
}