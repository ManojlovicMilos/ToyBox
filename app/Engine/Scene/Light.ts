import * as Core from './../../Core/Core';
import * as Math from './../../Mathematics/Mathematics';

import DrawObject from './DrawObject';
import LightAttenuation from './LightAttenuation';

@Core.TypedObject('TBX.Light')
class Light extends DrawObject {
    private _Radius: number;
    private _Intensity: number;
    private _Direction: Math.Vertex;
    private _Attenuation: LightAttenuation;
    public get Radius(): number { return this._Radius; }
    public set Radius(value: number) { this._Radius = value; }
    public get Intensity(): number { return this._Intensity; }
    public set Intensity(value: number) { this._Intensity = value; }
    public get Direction(): Math.Vertex { return this._Direction; }
    public set Direction(value: Math.Vertex) { this._Direction = value; }
    public get Attenuation(): LightAttenuation { return this._Attenuation; }
    public set Attenuation(value: LightAttenuation) { this._Attenuation = value; }
    public get Parameter(): number { /*Virtual*/ return -1; }
    
    public constructor(Old?: Light) {
        super(Old);
        this.RegisterType(Light, true);
        if (Old != null) {
            this._Radius = Old._Radius;
            this._Intensity = Old._Intensity;
            this._Attenuation = Old._Attenuation.Copy();
        }
        else {
            this._Radius = 100;
            this._Intensity = 100;
            this._Direction = new Math.Vertex(0, 0, 0);
            this._Attenuation = new LightAttenuation();
        }
    }

    public Copy(): Light {
        return new Light(this);
    }

    public Serialize(): any {
        // Override
        let L = super.Serialize();
        L.Radius = this._Radius;
        L.Intensity = this._Intensity
        L.Direction = this._Direction.Serialize();
        L.Attenuation = this._Attenuation.Serialize();
        return L;
    }

    public Deserialize(Data: any): void {
        // Override
        super.Deserialize(Data);
        this._Radius = Data.Radius;
        this._Intensity = Data.Intensity;
        this._Direction.Deserialize(Data.Direction);
        this._Attenuation.Deserialize(Data.Attenuation);
    }
}

export default Light;
