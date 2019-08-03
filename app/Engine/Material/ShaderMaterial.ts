export { ShaderMaterial }

import { Type } from "./../Types";
import { Material } from "./Material";
import { ShaderCode } from "./ShaderCode";

class ShaderMaterial extends Material
{
    private _Shaders:ShaderCode;
    public get Shaders():ShaderCode { return this._Shaders; }
    public constructor(Old?:ShaderMaterial)
    {
        super(Old);
        this.RegisterType(Type.ShaderMaterial);
        this.RegisterFactory(() => new ShaderMaterial());
        if(Old != null)
        {
            this._Shaders = Old._Shaders.Copy();
        }
        else
        {
            this._Shaders = new ShaderCode();
        }
    }
    public Copy() : ShaderMaterial
    {
        return new ShaderMaterial(this);
    }
    public Serialize() : any
    {
        // Virtual
        let PM:any = super.Serialize();
        PM.Shaders = this._Shaders.Serialize();
        return PM;
    }
    public Deserialize(Data:any) : void
    {
        // Virtual
        super.Deserialize(Data);
        this._Shaders.Deserialize(Data.Shaders);
    }
}