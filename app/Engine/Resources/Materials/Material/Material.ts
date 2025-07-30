import * as Core from "../../../../Core/Core";
import * as Math from "../../../../Mathematics/Mathematics";

enum MaterialType {
    Default = "Default",
    Lit = "Lit",
    Phong = "Phong",
    Toon = "Toon",
    Custom = "Custom",
    Shader = "Shader"
}

export enum TextureSamplingType {
    Linear = 'Linear',
    Nearest = 'Nearest'
}

class Material extends Core.BaseObject {
    public color: Math.Color;
    public sampling: TextureSamplingType;

    public constructor(old?: Material) {
        super(old);
        this.registerType(Material);
        this.color = old?.color.duplicate();
        this.sampling = old?.sampling || TextureSamplingType.Linear;
    }

    public duplicate(): Material {
        return new Material(this);
    }
}

export default Material;
