import LightAttenuation from "./LightAttenuation";
import DrawObject from "../../Drawn/DrawObject/DrawObject";

abstract class Light extends DrawObject {
    public intensity: number;
    public attenuation: LightAttenuation;

    public constructor(old?: Light) {
        super(old);
        this.registerType(Light);
        this.intensity = old?.intensity || 100;
        this.attenuation = old?.attenuation || new LightAttenuation();
    }
}

export default Light;
