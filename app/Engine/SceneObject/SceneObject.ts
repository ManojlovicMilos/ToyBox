export  { SceneObject };

import * as Core from "./../../Core/Core";

import { Type } from "./../Types";
import { Events } from "../Events/Events";

class SceneObject extends Core.BaseObject
{
    // Abstract
    protected _Events:Events;
    public get Events():Events { return this._Events; }
    public constructor(Old?:SceneObject)
    {
        super(Old);
        this.RegisterType(Type.SceneObject);
        this.RegisterFactory(() => new SceneObject());
        if(Old != null)
        {
            this._Events = Old._Events.Copy();
        }
        else
        {
            this._Events = new Events();
        }
    }
    public Copy() : SceneObject
    {
        return new SceneObject(this);
    }
    public OnAttach(Args:any) : void
    {
        // Virtual
    }
    public OnRemove(Args:any) : void
    {
        // Virtual
    }
    public OnSwitch() : void
    {
        // Virtual
    }
    public OnResize(Args:any) : void
    {
        // Virtual
    }
}