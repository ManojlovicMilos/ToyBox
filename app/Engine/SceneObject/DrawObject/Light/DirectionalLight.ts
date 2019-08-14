export { DirectionalLight }

import * as Math from "../../../../Mathematics/Mathematics";

import { Light } from "./Light";

const DIRECTIONAL_LIGHT_TYPE = "DirectionalLight";

class DirectionalLight extends Light
{
    public constructor(Old?:DirectionalLight)
    {
        super(Old);
        this.RegisterType(DIRECTIONAL_LIGHT_TYPE);
        if(Old != null)
        {
        }
        else
        {
            this.Direction = new Math.Vector(0,1,0);
        }
    }
    public Copy() : DirectionalLight
    {
        return new DirectionalLight(this);
    }
    public Serialize() : any
    {
        // Override
        let DL = super.Serialize();
        return DL;
    }
    public Deserialize(Data:any) : void
    {
        // Override
        super.Deserialize(Data);
    }
}