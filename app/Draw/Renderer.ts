import * as Core from "../Core/Core";
import * as Engine from "../Engine/Engine";
import * as Math from "../Mathematics/Mathematics";

import SceneObjectRenderer from "./RenderMethod";

const CANVAS_ELEMENT_ID = 'canvas';
const CANVAS_PARENT_ELEMENT_ID = 'canvas-parent';
const DEFAULT_RESOLUTION = new Math.Vertex(1920, 1080, 1);

class Renderer extends Core.Service {
    public fixedSize: boolean;
    protected _resolution: Math.Vertex;
    protected _globalScale: Math.Vertex;
    protected canvas: HTMLCanvasElement;
    protected parent: HTMLDivElement;
    protected activeScene?: Engine.Scene;
    protected resourceService: Core.ResourceService;
    private renderMethods: { [key: string]: SceneObjectRenderer };
    private renderMethodsPerId: { [key: string]: SceneObjectRenderer };
    public get resolution(): Math.Vertex { return this._resolution; }
    public set resolution(value: Math.Vertex) { this._resolution = value; }
    public get globalScale(): Math.Vertex { return this._globalScale; }
    
    public constructor() {
        super();
        this.fixedSize = false;
        this._resolution = DEFAULT_RESOLUTION;
        this._globalScale = new Math.Vertex(1, 1, 1);
        this.canvas = document.getElementById(CANVAS_ELEMENT_ID) as HTMLCanvasElement;
        this.parent = document.getElementById(CANVAS_PARENT_ELEMENT_ID) as HTMLDivElement;
        this.resourceService = Core.inject(Core.ResourceService);
        this.renderMethods = {};
        this.registerRenderMethod(Engine.Scene, (scene: Engine.Scene) => this.renderGenericScene(scene));
    }

    // virtual
    public render(scene: Engine.SceneObject): void {
        this.renderSceneOrSceneObject(scene);
    }

    // virtual
    public resize(): void {
        let width: number = this.parent.clientWidth;
        let height: number = this.parent.clientHeight;
        if (this.activeScene) {
            this.resizeActiveCameraViewpoint();
            this.activeScene.onResize({
                scene: this.activeScene,
                globalScale: this._globalScale,
                cameraScale: this.activeScene.camera.transformation.scale,
                ratio: width * 1.0 / height,
            });
        }
    }

    // virtual
    public load(scene: Engine.Scene): Promise<boolean> {
        const resourceList = scene.generateResourceList();
        const resourcePromises = resourceList.map((entry: Core.Resource) => this.resourceService.load(entry));
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
    protected renderSceneOrSceneObject(renderTarget: Engine.Scene | Engine.SceneObject): void {
        const renderMethod = this.renderMethodsPerId[renderTarget.id] || this.findRenderMethod(renderTarget);
        if (renderMethod) {
            renderMethod(renderTarget);
        }
    }

    // virtual
    protected renderGenericScene(scene: Engine.Scene): void {
        if (scene !== this.activeScene) {
            this.activeScene = scene;
            this.resize();
        }
        scene.children.forEach((entry: Engine.SceneObject) => {
            this.renderSceneOrSceneObject(entry);
        });
    }

    // virtual
    protected findRenderMethod(sceneObject: Engine.Scene | Engine.SceneObject): SceneObjectRenderer | undefined {
        const types = [...sceneObject.types].reverse();
        for(let type in types) {
            if (this.renderMethods[type]) {
                return this.renderMethods[type];
            }
        }
        return undefined;
    }

    // virtual
    protected resizeActiveCameraViewpoint(): void {}

    protected registerRenderMethod(type: typeof Engine.SceneObject, renderer: SceneObjectRenderer): void {
        this.renderMethods[type.name] = renderer;
    }
}

export default Renderer;
