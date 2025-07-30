import * as Math from "../../../../Mathematics/Mathematics";

import SceneObject from "../../SceneObject/SceneObject";
import Material from "../../../Resources/Materials/Material/Material";
import SceneEventArgs from "../../../Scenes/Scene/SceneEventArgs";
import SceneResizeEventArgumants from "../../../Scenes/Scene/SceneResizeEventArguments";

abstract class DrawObject extends SceneObject {
    public modified: boolean
    public fixedPosition: boolean;
    public material: Material;
    public transformation: Math.Transformation;
    
    public get color(): Math.Color { return this.material.color; }
    public set color(value: Math.Color) { this.material.color = value; }
    public get position(): Math.Vertex { return this.transformation.translation; }
    public set position(value: Math.Vertex) { this.transformation.translation = value; }
    public get size(): Math.Vertex { return this.transformation.scale; }
    public set size(value: Math.Vertex) { this.transformation.scale = value; }

    public constructor(old?: DrawObject) {
        super(old);
        this.registerType(DrawObject);
        this.modified = false;
        this.fixedPosition = !!old.fixedPosition;
        this.material = old?.material.duplicate() || new Material();
        this.transformation = old?.transformation.duplicate() || new Math.Transformation();
    }

    // virtual
    public onToggle(value: boolean): void {}

    // virtual
    public onResize(args: SceneEventArgs & SceneResizeEventArgumants): void {}
}

export default DrawObject;
