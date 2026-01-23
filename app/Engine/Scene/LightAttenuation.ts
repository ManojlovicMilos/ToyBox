import * as Math from './../../Mathematics/Mathematics';

class LightAttenuation {
    private _Constant: number;
    private _Linear: number;
    private _Quadratic: number;
    public get Constant(): number { return this._Constant; }
    public set Constant(value: number) { this._Constant = value; }
    public get Linear(): number { return this._Linear; }
    public set Linear(value: number) { this._Linear = value; }
    public get Quadratic(): number { return this._Quadratic; }
    public set Quadratic(value: number) { this._Quadratic = value; }
    public constructor(Old?: LightAttenuation, Constant?: number, Linear?: number, Quadratic?: number) {
        if (Old != null) {
            this._Constant = Old._Constant;
            this._Linear = Old._Linear;
            this._Quadratic = Old._Quadratic;
        }
        else {
            if (Constant != null) this._Constant = Constant;
            else this._Constant = 0.3;
            if (Linear != null) this._Linear = Linear;
            else this._Linear = 0.3;
            if (Quadratic != null) this._Quadratic = Quadratic;
            else this._Quadratic = 0.3;
        }
    }

    public Copy(): LightAttenuation {
        return new LightAttenuation(this);
    }

    public ToVertex(): Math.Vertex {
        return new Math.Vertex(this._Constant, this._Linear, this._Quadratic);
    }

    public Serialize(): any {
        let LA =
        {
            Constant: this._Constant,
            Linear: this._Linear,
            Quadratic: this._Quadratic
        };
        return LA;
    }

    public Deserialize(Data: any): void {
        this._Constant = Data.Constant;
        this._Linear = Data.Linear;
        this._Quadratic = Data.Quadratic;
    }
}

export default LightAttenuation;
