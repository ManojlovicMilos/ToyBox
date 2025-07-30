import Camera from "./Camera";

class Scene2DCamera extends Camera {
    public constructor(old?: Scene2DCamera) {
        super(old);
        this.registerType(Scene2DCamera);
    }

    public duplicate(): Scene2DCamera {
        return new Scene2DCamera(this);
    }
}

export default Scene2DCamera;
