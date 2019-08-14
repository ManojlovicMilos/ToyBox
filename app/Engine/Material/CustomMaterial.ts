export { CustomMaterial }

import { Material } from "./Material";
import { MaterialInput, MaterialInputType } from "./MaterialInput";

import { Type } from "./../Types";

class CustomMaterial extends Material
{
    private _Inputs:MaterialInput[];
    public get Inputs():MaterialInput[] { return this._Inputs; }
    public constructor(Old?:CustomMaterial)
    {
        super(Old);
        this.RegisterType(Type.CustomMaterial);
        this.RegisterFactory(() => new CustomMaterial());
        this._Inputs = [];
        if(Old != null)
        {
            this._Inputs = Old._Inputs.map(Input => Input.Copy());
        }
    }
    public Copy() : CustomMaterial
    {
        return new CustomMaterial(this);
    }
    public RegisterInput(ID:string, Type:MaterialInputType) : boolean
    {
        for(let i in this._Inputs) if(this._Inputs[i].ID == ID) return false;
        this._Inputs.push(new MaterialInput(null, ID, Type));
        return true;
    }
    public Serialize() : any
    {
        // Virtual
        let CM = super.Serialize();
        CM.Inputs = this._Inputs.map(Input => Input.Serialize());
        return CM;
    }
    public Deserialize(Data:any) : void
    {
        // Virtual
        super.Deserialize(Data);
        this._Inputs = Data.Inputs.map(Input => new MaterialInput(null, Input.ID, Input.Type));
    }
}