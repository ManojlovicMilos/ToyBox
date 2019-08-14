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
    private _Lit: boolean;
    private _HasNormals: boolean;
    private _Sampling:TextureSamplingType;
    public get Lit(): boolean { return this._Lit; }
    public set Lit(value:boolean) { this._Lit = value; }
    public get HasNormals(): boolean { return this._HasNormals; }
    public set HasNormals(value:boolean) { this._HasNormals = value; }
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
            this._Lit = Old._Lit;
            this._HasNormals = Old._HasNormals;
            this._Sampling = Old._Sampling;
        }
        else
        {
            this._Lit = true;
            this._HasNormals = false;
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
        M.Lit = this._Lit;
        M.HasNormals = this._HasNormals;
        M.Sampling = this._Sampling as string;
        return M;
    }
    public Deserialize(Data:any) : void
    {
        // Virtual
        super.Deserialize(Data);
        this._Lit = Data.Lit;
        this._HasNormals = Data.HasNormals;
        this._Sampling = Data.Sampling as TextureSamplingType;
    }
}