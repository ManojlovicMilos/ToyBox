import * as Math from "../../../../Mathematics/Mathematics";

import Light from "../Light/Light";

class DirectionalLight extends Light {
    public direction: Math.Vertex;

    public constructor(old?: DirectionalLight) {
        super(old);
        this.registerType(DirectionalLight);
        this.direction = old?.direction || new Math.Vertex(0, 1, 0);
    }

    public override duplicate(): DirectionalLight {
        return new DirectionalLight(this);
    }
}

export default DirectionalLight;
