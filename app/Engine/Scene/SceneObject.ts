export { SceneObject };

import * as Core from "./../../Core/Core";

import { EventManager } from "./../Events/EventManager";

abstract class SceneObject extends Core.BaseObject {
    protected _Events: EventManager;
    public get Events(): EventManager { return this._Events; }

    public constructor(Old?: SceneObject) {
        super(Old);
        this.RegisterType(SceneObject.name);
        this._Events = new EventManager();
        if (Old) {
            this._Events = Old._Events.Copy();
        }
    }

    public Copy(): SceneObject {
        return this; // new SceneObject(this) for non-abstract
    }

    public OnSwitch(): void {
        // Virtual
    }
}
