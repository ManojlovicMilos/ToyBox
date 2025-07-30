import * as Core from "../../../Core/Core";
import * as Math from "../../../Mathematics/Mathematics";

import SceneEventArgs from "./SceneEventArgs";
import Camera from "../../Objects/Cameras/Camera";
import SceneEventPackage from "./SceneEventPackage";
import SceneObject from "../../Objects/SceneObject/SceneObject";
import DrawObject from "../../Objects/Drawn/DrawObject/DrawObject";
import SceneResizeEventArgumants from "./SceneResizeEventArguments";

const HTML_UI_PARENT = 'ui-parent';
const SCENE_OBJECT_WRONG_TYPE_MESSAGE = 'Cannot add SceneObject, wrong type.';

class Scene extends Core.BaseObject {
    public active: boolean;
    public backColor: Math.Color;
    public events: SceneEventPackage;
    protected activeCamera?: Camera;

    public get camera(): Camera { return this.activeCamera }

    public constructor(old?: Scene) {
        super(old);
        this.active = false;
        this.backColor = Math.Color.FromRGBA(40, 40, 40, 255);
        this.events = new SceneEventPackage();
        if (old) {
            this.backColor = old.backColor;
            this.events = old.events.duplicate();
        }
    }

    public override duplicate(): Scene {
        return new Scene(this);
    }

    public override attach(sceneObject: SceneObject): void {
        if (sceneObject.is(SceneObject)) {
            this.attach(sceneObject);
        } else {
            this.log.warning(SCENE_OBJECT_WRONG_TYPE_MESSAGE)
        }
    }

    public findActive(type?: string | typeof SceneObject): SceneObject[] {
        const typeName = type ? (typeof type === 'string' ? type : type.name) : undefined;
        const sceneObjects = typeName ? this.findChildrenByType(typeName) : this.children;
        return sceneObjects.filter((entry: SceneObject) => entry.active) as SceneObject[];
    }

    // virtual
    public setCamera(camera: Camera | string): boolean {
        const newActiveCamera = typeof camera === 'string' ? this.findChild<Camera>(camera) : camera;
        if (!newActiveCamera) {
            return false;
        }
        this.activeCamera = newActiveCamera;
        return true;
    }

    // virtual
    public findColliders(): Core.BaseObject[] {
        return [];
    }

    // virtual
    public loadChunk(chunk: Scene, offset: Math.Vertex): boolean {
        return false;
    }

    // virtual
    public onLeave(): void {
        this.active = false;
    }

    // virtual
    public onSwitch(): void {
        this.active = true;
        this.resetUIParent();
        this.findChildrenByType<SceneObject>(SceneObject)
            .forEach((entry: SceneObject) => entry.onSwitch());
    }

    // virtual
    public onResize(args: SceneEventArgs & SceneResizeEventArgumants): void {
        this.findChildrenByType<DrawObject>(DrawObject)
            .forEach((entry: DrawObject) => entry.onResize(args));
    }

    // virtual
    public generateResourceList(): Core.Resource[] {
        let resourceList = [];
        this.children.forEach((entry: SceneObject) => resourceList = [...resourceList, ...entry.generateResourceList()]);
        return resourceList;
    }

    private resetUIParent(): void {
        let UIParent: HTMLElement = document.getElementById(HTML_UI_PARENT);
        if (UIParent) UIParent.innerHTML = '';
    }
}

export default Scene;
