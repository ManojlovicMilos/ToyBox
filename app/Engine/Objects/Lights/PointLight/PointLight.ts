import Light from "../Light/Light";

const DEFAULT_RADIUS = 100;

class PointLight extends Light {
    public radius: number;

    public constructor(old?: PointLight) {
        super(old);
        this.registerType(PointLight);
        this.radius = old?.radius || DEFAULT_RADIUS;
    }

    public override duplicate(): PointLight {
        return new PointLight(this);
    }
}

export default PointLight;
