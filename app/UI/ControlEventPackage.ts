export { ControlEventPackage }

import * as Runner from "./../Runner/Runner";
import * as Engine from "./../Engine/Engine";

class ControlEventPackage extends Engine.EventPackage
{
    protected _Element:HTMLElement;
    protected _Sender:Engine.SceneObject;
    public get Click() : Function[] { return this._Data["Click"]; }
    public get Input() : Function[] { return this._Data["Input"]; }
    public get MouseEnter() : Function[] { return this._Data["MouseEnter"]; }
    public get MouseLeave() : Function[] { return this._Data["MouseLeave"]; }
    public constructor(Old?:ControlEventPackage)
    {
        super(Old);
        if(Old)
        {

        }
        else
        {
            this._Data["Click"] = [];
            this._Data["Input"] = [];
            this._Data["MouseEnter"] = [];
            this._Data["MouseLeave"] = [];
        }
    }
    public Copy() : ControlEventPackage
    {
        return new ControlEventPackage(this);
    }
    public Connect(Sender:Engine.SceneObject, Element:HTMLElement) : void
    {
        if(this._Element)
        {
            this._Element.removeEventListener("mousedown", this.OnClick.bind(this));
            this._Element.removeEventListener("input", this.OnInput.bind(this));
            this._Element.removeEventListener("mouseenter", this.OnMouseEnter.bind(this));
            this._Element.removeEventListener("mouseleave", this.OnMouseLeave.bind(this));
        }
        this._Sender = Sender;
        this._Element = Element;
        this._Element.addEventListener("mousedown", this.OnClick.bind(this));
        this._Element.addEventListener("input", this.OnInput.bind(this));
        this._Element.addEventListener("mouseenter", this.OnMouseEnter.bind(this));
        this._Element.addEventListener("mouseleave", this.OnMouseLeave.bind(this));
    }
    private PackEventArgs(Event) : any
    {
        let Args:any = 
        {
            ID: 0,
            Ctrl: Event.ctrlKey,
            Alt: Event.altKey,
            Shift: Event.shiftKey,
            MouseButton: <Engine.MouseButton>Event.button,
            UnscaledLocation: { X:Event.offsetX, Y:Event.offsetY },
            Location: { X:Event.offsetX, Y:Event.offsetY },
            Delta: Event.wheelDelta,
            KeyCode: Event.keyCode,
            Width: window.innerWidth,
            Height: window.innerHeight,
            Sender: this._Sender,
            Event: Event
        }
        if(Event.target) 
        {
            Args.Value = Event.target.value;
            Args.KeyCode = Event.data;
        }
        if(Event.identifier) Args.ID = Event.identifier;
        return Args;
    }
    private OnClick(Event) : void
    {
        this.Invoke("Click", Runner.Runner.Current.Game, this.PackEventArgs(Event));
    }
    private OnInput(Event) : void
    {
        this.Invoke("Input", Runner.Runner.Current.Game, this.PackEventArgs(Event));
    }
    private OnMouseEnter(Event) : void
    {
        this.Invoke("MouseEnter", Runner.Runner.Current.Game, this.PackEventArgs(Event));
    }
    private OnMouseLeave(Event) : void
    {
        this.Invoke("MouseLeave", Runner.Runner.Current.Game, this.PackEventArgs(Event));
    }
}