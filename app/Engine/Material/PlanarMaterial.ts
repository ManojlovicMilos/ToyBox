export { PlanarMaterial }

import { Type } from "./../Types";
import { Material } from "./Material";

class PlanarMaterial extends Material
{
    private _CalculateLight: boolean;
    private _HasNormalVectors: boolean;
    public constructor(Old?:PlanarMaterial)
    {
        super(Old);
        this.RegisterType(Type.PlanarMaterial);
        this.RegisterFactory(() => new PlanarMaterial());
        if(Old != null)
        {
            this._CalculateLight = Old._CalculateLight;
            this._HasNormalVectors = Old._HasNormalVectors;
        }
        else
        {
            this._CalculateLight = true;
            this._HasNormalVectors = false;
        }
    }
    public Copy() : PlanarMaterial
    {
        return new PlanarMaterial(this);
    }
    public Serialize() : any
    {
        // Virtual
        let PM:any = super.Serialize();
        PM.CalculateLight = this._CalculateLight;
        PM._HasNormalVectors = this._HasNormalVectors;
        return PM;
    }
    public Deserialize(Data:any) : void
    {
        // Virtual
        super.Deserialize(Data);
        this._CalculateLight = Data.CalculateLight;
        this._HasNormalVectors = Data.HasNormalVectors;
    }
}