export { Material, TextureSamplingType }

import * as Core from "./../../Core/Core";

import { Type } from "./../Types";

enum TextureSamplingType
{
    Linear = "Linear",
    Nearest = "Nearest"
}
class Material extends Core.BaseObject
{
    private _Sampling:TextureSamplingType;
    public get Sampling():TextureSamplingType { return this._Sampling; }
    public set Sampling(value:TextureSamplingType) { this._Sampling = value; }
    public constructor(Old?:Material)
    {
        super(Old);
        // Problem is material type
        this.RegisterType(Type.Material);
        this.RegisterFactory(() => new Material());
        if(Old != null)
        {
            this._Sampling = Old._Sampling;
        }
        else
        {
            this._Sampling = TextureSamplingType.Nearest;
        }
    }
    public Copy() : Material
    {
        return new Material(this);
    }
    public Serialize() : any
    {
        // Virtual
        let M = super.Serialize();
        M.Sampling = this._Sampling as string;
        return M;
    }
    public Deserialize(Data:any) : void
    {
        // Virtual
        super.Deserialize(Data);
        this._Sampling = Data.Sampling as TextureSamplingType;
    }
}