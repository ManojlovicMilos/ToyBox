import * as Math from "../../../Mathematics/Mathematics";

import SceneObject from "../SceneObject/SceneObject";
import SceneEventArgs from "../../Scenes/Scene/SceneEventArgs";
import SceneResizeEventArgumants from "../../Scenes/Scene/SceneResizeEventArguments";

// abstract
abstract class Camera extends SceneObject {
    public transformation: Math.Transformation;

    public get position(): Math.Vertex { return this.transformation.translation; }
    public set position(value: Math.Vertex) { this.transformation.translation = value; }
    public get viewportSize(): Math.Vertex { return this.transformation.scale; }
    public set viewportSize(value: Math.Vertex) { this.transformation.scale = value; }

    public constructor(old?: Camera) {
        super(old);
        this.registerType(Camera);
        this.transformation = old?.transformation.duplicate() || new Math.Transformation();
    }

    // virtual
    public onResize(args: SceneEventArgs & SceneResizeEventArgumants) {}
}

export default Camera;
