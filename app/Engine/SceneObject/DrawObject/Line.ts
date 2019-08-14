export { Line }

import * as Math from "./../../../Mathematics/Mathematics";

import { Type } from "./../../Types";
import { DrawObject } from "./DrawObject";

class Line extends DrawObject
{
    // Abstract
    private _Width: number;
    private _Position2: Math.Vector;
    public get Width(): number { return this._Width; }
    public set Width(value:number) { this._Width = value; }
    public get Position2(): Math.Vector { return this._Position2; }
    public set Position2(value:Math.Vector) { this._Position2 = value; }
    public constructor(Old?:Line)
    {
        super(Old);
        this.RegisterType(Type.Line);
        this.RegisterFactory(() => new Line());
        if(Old != null)
        {
            this._Width = Old._Width;
            this._Position2 = Old._Position2.Copy();
        }
        else
        {
            this._Width = 1;
            this._Position2 = new Math.Vector();
        }
    }
    public Copy() : Line
    {
        return new Line(this);
    }
    public Serialize() : any
    {
        // Override
        let L:any = super.Serialize();
        L.Width = this._Width;
        L.Position2 = this._Position2.Serialize();
        return L;
    }
    public Deserialize(Data:any) : void
    {
        // Override
        super.Deserialize(Data);
        this._Width = Data.Width;
        this._Position2.Deserialize(Data.Position2);
    }
}