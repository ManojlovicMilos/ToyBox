export  { Transformation };

import { Vector } from "./Vector";

class Transformation
{
    private _Translation:Vector;
    private _Rotation:Vector;
    private _Scale:Vector;
    private _Skew:Vector;
    public get Translation():Vector { return this._Translation; }
    public set Translation(value:Vector) { this._Translation = value; }
    public get Rotation():Vector { return this._Rotation; }
    public set Rotation(value:Vector) { this._Rotation = value; }
    public get Scale():Vector { return this._Scale; }
    public set Scale(value:Vector) { this._Scale = value; }
    public get Skew():Vector { return this._Skew; }
    public set Skew(value:Vector) { this._Skew = value; }
    public constructor(Old?:Transformation)
    {
        if(Old != null)
        {
            this._Translation = Old._Translation.Copy();
            this._Rotation = Old._Rotation.Copy();
            this._Scale = Old._Scale.Copy();
            this._Skew = Old._Skew.Copy();
        }
        else
        {
            this._Translation = new Vector();
            this._Rotation = new Vector();
            this._Scale = new Vector(1,1,1);
            this._Skew = new Vector();
        }
    }
    public Copy():Transformation
    {
        let New:Transformation = new Transformation(this);
        return New;
    }
    public Composite(Trans:Transformation) : void
    {
        this._Translation.Translate(Trans.Translation);
        this._Scale.Scale(Trans.Scale);
        this._Rotation.Translate(Trans._Rotation);
    }
    public Serialize() : any
    {
        let T =
        {
            Translation: this._Translation.Serialize(),
            Rotation: this._Rotation.Serialize(),
            Scale: this._Scale.Serialize(),
            Skew: this._Skew.Serialize()
        };
        return T;
    }
    public Deserialize(Data) : void
    {
        this._Translation.Deserialize(Data.Translation);
        this._Rotation.Deserialize(Data.Rotation);
        this._Scale.Deserialize(Data.Scale);
        this._Skew.Deserialize(Data.Skew);
    }
}