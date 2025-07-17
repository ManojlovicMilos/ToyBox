import * as Core from "../../../Core/Core";
import * as Math from "../../../Mathematics/Mathematics";

import SceneEventArgs from "./SceneEventArgs";
import SceneEventPackage from "./SceneEventPackage";
import SceneObject from "../../Objects/SceneObject/SceneObject";
import DrawObject from "../../Objects/Drawn/DrawObject/DrawObject";

const SCENE_OBJECT_WRONG_TYPE_MESSAGE = 'Cannot add SceneObject, wrong type.';

class Scene extends Core.BaseObject {
    public active: boolean;
    public backColor: Math.Color;
    public events: SceneEventPackage;

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
    public findColliders(): Core.BaseObject[] {
        return [];
    }

    // virtual
    public composite(chunk: Scene): boolean {
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
    public onResize(args: SceneEventArgs): void {
        this.findChildrenByType<DrawObject>(DrawObject)
            .forEach((entry: DrawObject) => entry.onResize(args));
    }

    private resetUIParent(): void {
        let UIParent: HTMLElement = document.getElementById('ui-parent');
        if (UIParent) UIParent.innerHTML = '';
    }
}

export default Scene;
