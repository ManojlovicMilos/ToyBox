import DirectionalLight from "../DirectionalLight/DirectionalLight";

const DEFAULT_RADIUS_ANGLE = 60;

class SpotLight extends DirectionalLight {
    public radiusAngle: number;

    public constructor(old?: SpotLight) {
        super(old);
        this.registerType(SpotLight)
        this.radiusAngle = old?.radiusAngle || DEFAULT_RADIUS_ANGLE;
    }

    public override duplicate(): SpotLight {
        return new SpotLight(this);
    }
}

export default SpotLight;
