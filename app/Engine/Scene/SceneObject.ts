export { SceneObject };

import * as Core from "./../../Core/Core";

import { EventManager } from "./../Events/EventManager";

class SceneObject extends Core.BaseObject
{
    // Abstract
    protected _Events: EventManager;
    public get Events(): EventManager { return this._Events; }
    public constructor(Old?: SceneObject)
    {
        super(Old);
        this.RegisterType(SceneObject.name);
        this._Events = new EventManager();
        if (Old)
        {
            this._Events = Old._Events.Copy();
        }
    }
    public Copy(): SceneObject
    {
        return new SceneObject(this);
    }
    public OnAttach(Args: any): void
    {
        // Virtual
    }
    public OnRemove(Args: any): void
    {
        // Virtual
    }
    public OnSwitch(): void
    {
        // Virtual
    }
    public OnResize(Args: any): void
    {
        // Virtual
    }
}
