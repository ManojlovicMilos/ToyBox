import * as Core from "../Core/Core";
import * as Engine from "../Engine/Engine";
import * as Math from "../Mathematics/Mathematics";
import SceneObjectRenderer from "./RenderMethod";

const DEFAULT_RESOLUTION = new Math.Vertex(1920, 1080, 1);

class Renderer extends Core.Service {
    public fixedSize: boolean;
    protected _resolution: Math.Vertex;
    protected _globalScale: Math.Vertex;
    protected canvas: HTMLCanvasElement;
    protected parent: HTMLDivElement;
    protected activeScene?: Engine.Scene;
    protected loaderService: Core.LoaderService;
    protected renderMethods: { [key: string]: SceneObjectRenderer };

    public get resolution(): Math.Vertex { return this._resolution; }
    public set resolution(value: Math.Vertex) { this._resolution = value; }
    public get globalScale(): Math.Vertex { return this._globalScale; }
    
    public constructor() {
        super();
        this.fixedSize = false;
        this._resolution = DEFAULT_RESOLUTION;
        this._globalScale = new Math.Vertex(1, 1, 1);
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.parent = document.getElementById("canvas-parent") as HTMLDivElement;
        this.loaderService = Core.inject(Core.LoaderService);
        this.renderMethods = {};
    }

    // virtual
    public render(scene: Engine.Scene): void {
        if (scene !== this.activeScene) {
            this.activeScene = scene;
            this.resize();
        }
        scene.children.forEach((entry: Engine.SceneObject) => {
            const renderMethod = this.findRenderMethod(entry);
            if (renderMethod) {
                renderMethod(entry);
            }
        });
    }

    // virtual
    public resize(): void {
        let width: number = this.parent.clientWidth;
        let height: number = this.parent.clientHeight;
        if (this.activeScene) {
            this.resizeActiveCamera();
            this.activeScene.onResize({
                scene: this.activeScene,
                globalScale: this._globalScale,
                cameraScale: this.activeScene.camera.transformation.scale,
                ratio: width * 1.0 / height,
            });
        }
    }

    public loadScene(scene: Engine.Scene): Promise<boolean> {
        const resourceList = scene.generateResourceList();
        const resourcePromises = resourceList.map((entry: Core.Resource) => this.loaderService.load(entry));
        return Promise.all(resourcePromises).then(() => true);
    }

    public transformToCanvas(vertex: Math.Vertex): Math.Vertex {
        return new Math.Vertex(
            (vertex.x / this.canvas.clientWidth) * this._resolution.x,
            (vertex.y / this.canvas.clientHeight) * this._resolution.y,
            0,
        );
    }

    // virtual
    protected findRenderMethod(sceneObject: Engine.SceneObject): SceneObjectRenderer | undefined {
        const types = [...sceneObject.types].reverse();
        for(let type in types) {
            if (this.renderMethods[type]) {
                return this.renderMethods[type];
            }
        }
        return undefined;
    }

    // virtual
    protected resizeActiveCamera(): void {}

    protected registerRenderMethod(type: typeof Engine.SceneObject, renderer: SceneObjectRenderer): void {
        this.renderMethods[type.name] = renderer;
    }
}

export default Renderer;
