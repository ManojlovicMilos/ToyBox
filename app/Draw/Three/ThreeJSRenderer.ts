import * as ThreeJS from 'three';
import * as Core from "../../Core/Core";
import * as Engine from "../../Engine/Engine";
import * as Math from "../../Mathematics/Mathematics";

import Renderer from "../Renderer";
import ThreeJSMaterialGenerator from "./ThreeMaterialGenerator";

const CAMERA_Z_OFFSET = 5;





class ThreeJSRenderer extends Renderer {
    private _Preload: boolean;
    private _Checked: string[];
    private _Camera: ThreeJS.Camera;
    private _PreloadScene: ThreeJS.Scene;
    private _ToyBoxScene: Engine.Scene2D;
    private _ToyBoxPreloadScene: Engine.Scene2D;

    protected renderScene: ThreeJS.Scene;
    protected renderCamera: ThreeJS.Camera;
    protected renderer: ThreeJS.WebGLRenderer;
    protected threeJSMaterialGenerator: ThreeJSMaterialGenerator;

    public override set resolution(value: Math.Vertex) { this._resolution = value; this.resize(); }

    public constructor(resolution?: Math.Vertex) {
        super();
        this._resolution = resolution || this._resolution;
        this.renderScene = new ThreeJS.Scene();
        this.renderer = new ThreeJS.WebGLRenderer({ canvas: this.canvas });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderObjects = {};
        this.threeJSMaterialGenerator = Core.inject(ThreeJSMaterialGenerator);
        this.resize();
    }

    public override resize(): void {
        super.resize();
        let width: number = this.parent.clientWidth;
        let height: number = this.parent.clientHeight;
        if (!this.fixedSize) {
            this.renderer.setSize(width, height);
            this._globalScale = new Math.Vertex(this.resolution.x / width, this.resolution.y / height, 1);
        }
        else {
            this.renderer.setSize(this.resolution.x, this.resolution.y);
            this._globalScale = new Math.Vertex(1, 1, 1);
        }
    }

    public override render(scene: Engine.Scene): void {
        const renderObjectsArray = Object.keys(this.renderObjects).map((key: string) => this.renderObjects[key]);
        renderObjectsArray.forEach((entry: RenderedObject) => entry.used = false);
        super.render(scene);
        renderObjectsArray.forEach((entry: RenderedObject) => {
            if (!entry.used) {
                this.removeRenderedObject(entry.tbxObject.id, true);
            }
        });
        this.renderer.render(this.renderScene, this.renderCamera);
    }

    protected override resizeActiveCameraViewpoint(): void {
        const cameraScale = this.fixedSize ? this._resolution : this._resolution.scale(this._globalScale);
        if (this.renderObjects[this.activeScene.camera.id]) {
            this.removeRenderedObject(this.activeScene.camera.id);
        }
        let newThreeJSCamera;
        if (this.activeScene.camera.is(Engine.Scene2DCamera)) {
            newThreeJSCamera = new ThreeJS.OrthographicCamera(0, cameraScale.x, 0, cameraScale.y, 1, 100);
            newThreeJSCamera.position.z = CAMERA_Z_OFFSET;
        }
        this.renderObjects[this.activeScene.camera.id] = {
            used: true,
            tbxObject: this.activeScene.camera,
            threeJSType: ThreeJSTypes.Camera,
            threeJSObject: newThreeJSCamera,
        };
    }

    protected removeRenderedObject(id: string, inScene?: boolean): void {
        const renderObject = this.renderObjects[id];
        if (renderObject) {
            if (inScene) {
                this.renderScene.remove(renderObject.threeJSObject);
            }
            if (renderObject.threeJSType === ThreeJSTypes.Mesh) {
                const meshObject = renderObject.threeJSObject as ThreeJS.Mesh;
                meshObject.geometry.dispose();
                (meshObject.material as ThreeJS.Material).dispose();
            }
            delete this.renderObjects[id];
        }
    }
}

export default ThreeJSRenderer;
