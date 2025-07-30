import * as Math from "../../../../Mathematics/Mathematics";

const DEFAULT_ATTENUATION = 0.3;

class LightAttenuation {
    public constant: number;
    public linear: number;
    public quadratic: number;

    public constructor(old?: LightAttenuation, constant?: number, linear?: number, quadratic?: number) {
        this.constant = constant || old.constant || DEFAULT_ATTENUATION;
        this.linear = linear || old.linear || DEFAULT_ATTENUATION;
        this.quadratic = quadratic || old.quadratic || DEFAULT_ATTENUATION;
    }

    public duplicate(): LightAttenuation {
        return new LightAttenuation(this);
    }

    public toVertex(): Math.Vertex {
        return new Math.Vertex(this.constant, this.linear, this.quadratic);
    }
}

export default LightAttenuation;
