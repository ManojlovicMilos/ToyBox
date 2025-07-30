import SceneEventArgs from "./SceneEventArgs";
import EventManager from "../../Events/EventManager";
import SceneResizeEventArgumants from "./SceneResizeEventArguments";
import EventHandlerCollection from "../../Events/EventHandlerCollection";
import MouseEventArguments from "../../Events/EventArguments/MouseEventArguments";
import KeyboardEventArguments from "../../Events/EventArguments/KeyboardEventArguments";

enum SceneEventTypes {
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

class SceneEventPackage extends EventManager {
    public touchOnMouseEvents: boolean;
    public get Load() : EventHandlerCollection<SceneEventArgs> { return this.get(SceneEventTypes.Load); }
    public get Leave() : EventHandlerCollection<SceneEventArgs> { return this.get(SceneEventTypes.Leave); }
    public get Switch() : EventHandlerCollection<SceneEventArgs> { return this.get(SceneEventTypes.Switch); }
    public get Update() : EventHandlerCollection<SceneEventArgs> { return this.get(SceneEventTypes.Update); }
    public get Resize() : EventHandlerCollection<SceneEventArgs & SceneResizeEventArgumants> { return this.get(SceneEventTypes.Resize); }
    public get KeyUp() : EventHandlerCollection<SceneEventArgs & KeyboardEventArguments> { return this.get(SceneEventTypes.KeyUp); }
    public get KeyDown() : EventHandlerCollection<SceneEventArgs & KeyboardEventArguments> { return this.get(SceneEventTypes.KeyDown); }
    public get KeyPress() : EventHandlerCollection<SceneEventArgs & KeyboardEventArguments> { return this.get(SceneEventTypes.KeyPress); }
    public get Click() : EventHandlerCollection<SceneEventArgs & MouseEventArguments> { return this.get(SceneEventTypes.Click); }
    public get MouseUp() : EventHandlerCollection<SceneEventArgs & MouseEventArguments> { return this.get(SceneEventTypes.MouseUp); }
    public get MouseDown() : EventHandlerCollection<SceneEventArgs & MouseEventArguments> { return this.get(SceneEventTypes.MouseDown); }
    public get MouseMove() : EventHandlerCollection<SceneEventArgs & MouseEventArguments> { return this.get(SceneEventTypes.MouseMove); }
    public get MouseWheel() : EventHandlerCollection<SceneEventArgs & MouseEventArguments> { return this.get(SceneEventTypes.MouseWheel); }
    public get TouchEnd() : EventHandlerCollection<SceneEventArgs & MouseEventArguments> { return this.get(SceneEventTypes.TouchEnd); }
    public get TouchMove() : EventHandlerCollection<SceneEventArgs & MouseEventArguments> { return this.get(SceneEventTypes.TouchMove); }
    public get TouchStart() : EventHandlerCollection<SceneEventArgs & MouseEventArguments> { return this.get(SceneEventTypes.TouchStart); }
    public get LoadProgress() : EventHandlerCollection<SceneEventArgs & MouseEventArguments> { return this.get(SceneEventTypes.LoadProgress); }
    public get LoadComplete() : EventHandlerCollection<SceneEventArgs & MouseEventArguments> { return this.get(SceneEventTypes.LoadComplete); }
    
    public constructor(old?: SceneEventPackage) {
        super(old);
        this.touchOnMouseEvents = old?.touchOnMouseEvents || false;
    }

    public duplicate() : SceneEventPackage {
        return new SceneEventPackage(this);
    }
}

export { SceneEventTypes };

export default SceneEventPackage;
