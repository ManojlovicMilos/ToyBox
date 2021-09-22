export { SceneEventPackage }

import { EventManager } from "./EventManager";
import { EventHandlerCollection } from "./EventHandlerCollection";

enum SceneEventTypes
{
    Load = "Load",
    Leave = "Leave",
    Switch = "Switch",
    Resize = "Resize",
    Update = "Update",
    KeyUp = "KeyUp",
    KeyDown = "KeyDown",
    KeyPress = "KeyPress",
    Click = "Click",
    MouseUp = "MouseUp",
    MouseDown = "MouseDown",
    MouseMove = "MouseMove",
    MouseWheel = "MouseWheel",
    TouchEnd = "TouchEnd",
    TouchMove = "TouchMove",
    TouchStart = "TouchStart",
    LoadProgress = "LoadProgress",
    LoadComplete = "LoadComplete"
}

class SceneEventPackage extends EventManager
{
    private _WireTouchEvents:boolean;
    public get WireTouchEvents(): boolean { return this._WireTouchEvents; }
    public set WireTouchEvents(value:boolean) { this._WireTouchEvents = value; }
    public get Load() : EventHandlerCollection { return this._Data[SceneEventTypes.Load]; }
    public get Leave() : EventHandlerCollection { return this._Data[SceneEventTypes.Leave]; }
    public get Switch() : EventHandlerCollection { return this._Data[SceneEventTypes.Switch]; }
    public get Resize() : EventHandlerCollection { return this._Data[SceneEventTypes.Resize]; }
    public get Update() : EventHandlerCollection { return this._Data[SceneEventTypes.Update]; }
    public get KeyUp() : EventHandlerCollection { return this._Data[SceneEventTypes.KeyUp]; }
    public get KeyDown() : EventHandlerCollection { return this._Data[SceneEventTypes.KeyDown]; }
    public get KeyPress() : EventHandlerCollection { return this._Data[SceneEventTypes.KeyPress]; }
    public get Click() : EventHandlerCollection { return this._Data[SceneEventTypes.Click]; }
    public get MouseUp() : EventHandlerCollection { return this._Data[SceneEventTypes.MouseUp]; }
    public get MouseDown() : EventHandlerCollection { return this._Data[SceneEventTypes.MouseDown]; }
    public get MouseMove() : EventHandlerCollection { return this._Data[SceneEventTypes.MouseMove]; }
    public get MouseWheel() : EventHandlerCollection { return this._Data[SceneEventTypes.MouseWheel]; }
    public get TouchEnd() : EventHandlerCollection { return this._Data[SceneEventTypes.TouchEnd]; }
    public get TouchMove() : EventHandlerCollection { return this._Data[SceneEventTypes.TouchMove]; }
    public get TouchStart() : EventHandlerCollection { return this._Data[SceneEventTypes.TouchStart]; }
    public get LoadProgress() : EventHandlerCollection { return this._Data[SceneEventTypes.LoadProgress]; }
    public get LoadComplete() : EventHandlerCollection { return this._Data[SceneEventTypes.LoadComplete]; }
    public constructor(Old?:SceneEventPackage)
    {
        super(Old);
    }
    public Copy() : SceneEventPackage
    {
        return new SceneEventPackage(this);
    }
}
