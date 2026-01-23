import * as Core from '../../Core/Core';
import * as Math from './../../Mathematics/Mathematics';

import Light from './Light';

@Core.TypedObject('TBX.SpotLight')
class SpotLight extends Light {
    private _RadiusAngle: number;

    public get RadiusAngle(): number { return this._RadiusAngle; }
    public set RadiusAngle(value: number) { this._RadiusAngle = value; }
    public override get Parameter(): number { return this._RadiusAngle; }

    public constructor(Old?: SpotLight) {
        super(Old);
        this.RegisterType(SpotLight);
        if (Old != null) {
            this._RadiusAngle = Old._RadiusAngle;
        }
        else {
            this.Direction = new Math.Vertex(0, 1, 0);
            this._RadiusAngle = 60;
        }
    }

    public override Copy(): SpotLight {
        return new SpotLight(this);
    }

    public override Serialize(): any {
        return {
            ...super.Serialize(),
            RadiusAngle: this._RadiusAngle,
        }
    }

    public override Deserialize(Data: any): void {
        super.Deserialize(Data);
        this._RadiusAngle = Data.RadiusAngle;
    }
}

export default SpotLight;
