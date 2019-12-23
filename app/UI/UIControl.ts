export { UIControl }

import * as Util from "./../Util/Util";
import * as Math from "../Mathematics/Mathematics";
import * as Engine from "../Engine/Engine";

import { Settings } from "../Core/Settings";
import { Border } from "./Border";
import { UIControlEvents } from "./UIControlEvents";

const UI_CONTROL_TYPE = "UIControl"

class UIControl extends Engine.SceneObject
{
    protected _Active:boolean;
    protected _Position:Math.Vector;
    protected _Size:Math.Vector;
    protected _ForeColor:Math.Color;
    protected _BackColor:Math.Color;
    protected _Border:Border;
    protected _Element:HTMLElement;
    protected _Offset:Math.Vector;
    protected _Scale:Math.Vector;
    public get Active():boolean { return this._Active; }
    public set Active(value:boolean) { this._Active = value; this.OnToggle(value); this.Update(); }
    public get Position():Math.Vector { return this._Position; }
    public set Position(value:Math.Vector) { this._Position = value; this.Update(); }
    public get Size():Math.Vector { return this._Size; }
    public set Size(value:Math.Vector) { this._Size = value; this.Update(); }
    public get Offset():Math.Vector { return this._Offset; }
    public set Offset(value:Math.Vector) { this._Offset = value; this.Update(); }
    public get ForeColor():Math.Color { return this._ForeColor; }
    public set ForeColor(value:Math.Color) { this._ForeColor = value; this.Update(); }
    public get BackColor():Math.Color { return this._BackColor; }
    public set BackColor(value:Math.Color) { this._BackColor = value; this.Update(); }
    public get Border():Border { return this._Border; }
    public set Border(value:Border) { this._Border = value; this.Update(); }
    public get Element():HTMLElement { return this._Element; }
    public get Events():UIControlEvents { return <UIControlEvents>this._Events; }
    public constructor(Old?:UIControl)
    {
        super(Old);
        this.RegisterType(UI_CONTROL_TYPE);
        this.RegisterFactory(() => new UIControl());
        if(Old)
        {
            this._Active = Old._Active;
            this._Position = Old._Position;
            this._Size = Old._Size;
            this._Offset = new Math.Vector();
            this._Scale = Old._Scale.Copy();
            this._ForeColor = Old._ForeColor.Copy();
            this._BackColor = Old.BackColor.Copy();
            this._Border = Old._Border.Copy();
            this._Events = new UIControlEvents();
        }
        else
        {
            this._Active = true;
            this._Position = new Math.Vector();
            this._Size = new Math.Vector();
            this._Offset = new Math.Vector();
            this._Scale = new Math.Vector(100,100,1);
            this._ForeColor = Math.Color.Black;
            this._BackColor = Math.Color.White;
            this._Border = new Border();
            this._Events = new UIControlEvents();
        }
    }
    public Copy() : UIControl
    {
        return new UIControl(this);
    }
    public OnToggle(Value:boolean) : void
    {
        // Virtual
    }
    public Update() : void
    {
        if(!this._Element) return;
        if(this._Active) this._Element.style.display = "block";
        else this._Element.style.display = "none";
        this._Element.style.margin = "0px";
        this._Element.style.boxSizing = "border-box";
        this._Element.style.position = "absolute";
        this._Element.style.left = (this._Scale.X * (this._Offset.X + this._Position.X - this._Size.X / 2)).toString();
        this._Element.style.top = (this._Scale.Y * (this._Offset.Y + this._Position.Y - this._Size.Y / 2)).toString();
        this._Element.style.width = this._Scale.X * this._Size.X + "px";
        this._Element.style.height = this._Scale.Y * this._Size.Y + "px";
        this._Element.style.zIndex = "3";
        if(Settings.IgnoreUICSS)
        {
            this._Element.style.color = this._ForeColor.ToString();
            if(this._BackColor.A == 0) this._Element.style.backgroundColor = "rgba(0,0,0,0)";
            else this._Element.style.backgroundColor = this._BackColor.ToString();
        }
        this._Border.Apply(this._Element);
    }
    private AddElement() : void
    {
        this.Update();
        let UIParent:HTMLElement = document.getElementById("ui-parent");
        if(!UIParent)
        {
            Util.Log.Error("UI Parent Not Found", "Unnable to find UI parent", "UI");
        }
        UIParent.appendChild(this._Element);
    }
    protected Create() : void
    {
        this._Element = <HTMLDivElement>(document.createElement('div'));
        this._Element.id = this.ID;
        this._Element.className = "control";
        this.Events.Connect(this, this.Element);
    }
    public OnSwitch() : void
    {
        // Override
        this.AddElement();
    }
    public OnResize(Args:any) : void
    {
        // Override
        this._Scale = new Math.Vector(Args.Scale.X / Args.GlobalScale.X, Args.Scale.Y / Args.GlobalScale.Y, 1);
        this.Update();
    }
    public OnRemove(Args:any) : void
    {
        this._Element.remove();
    }
    public OnAttach(Args:any) : void
    {
        super.OnAttach(Args);
        this.Create();
        if(Args.Scene.Current) this.AddElement();
    }
}