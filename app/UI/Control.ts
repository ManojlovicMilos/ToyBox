export { Control }

import * as Math from "./../Mathematics/Mathematics";
import * as Engine from "./../Engine/Engine";

import { Settings } from "./../Engine/Settings";
import { Border } from "./Border";

class Control extends Engine.SceneObject
{
    private _Active:boolean;
    private _Position:Math.Vertex;
    private _Size:Math.Vertex;
    private _ForeColor:Math.Color;
    private _BackColor:Math.Color;
    private _Border:Border;
    private _Element:HTMLElement;
    protected _Offset:Math.Vertex;
    protected _Scale:Math.Vertex;
    public get Active():boolean { return this._Active; }
    public set Active(value:boolean) { this._Active = value; this.OnToggle(value); this.Update(); }
    public get Position():Math.Vertex { return this._Position; }
    public set Position(value:Math.Vertex) { this._Position = value; this.Update(); }
    public get Size():Math.Vertex { return this._Size; }
    public set Size(value:Math.Vertex) { this._Size = value; this.Update(); }
    public get Offset():Math.Vertex { return this._Offset; }
    public set Offset(value:Math.Vertex) { this._Offset = value; this.Update(); }
    public get ForeColor():Math.Color { return this._ForeColor; }
    public set ForeColor(value:Math.Color) { this._ForeColor = value; this.Update(); }
    public get BackColor():Math.Color { return this._BackColor; }
    public set BackColor(value:Math.Color) { this._BackColor = value; this.Update(); }
    public get Border():Border { return this._Border; }
    public set Border(value:Border) { this._Border = value; this.Update(); }
    public get Element():HTMLElement { return this._Element; }
    public constructor(Old?:Control)
    {
        super(Old);
        if(Old)
        {
            this._Active = Old._Active;
            this._Position = Old._Position;
            this._Size = Old._Size;
            this._Offset = new Math.Vertex();
            this._Scale = Old._Scale.Copy();
            this._ForeColor = Old._ForeColor.Copy();
            this._BackColor = Old.BackColor.Copy();
            this._Border = Old._Border.Copy();
        }
        else
        {
            this.Type = Engine.SceneObjectType.Control;
            this._Active = true;
            this._Position = new Math.Vertex();
            this._Size = new Math.Vertex();
            this._Offset = new Math.Vertex();
            this._Scale = new Math.Vertex(100,100,1);
            this._ForeColor = Math.Color.Black;
            this._BackColor = Math.Color.White;
            this._Border = new Border();
        }
    }
    public Copy() : Control
    {
        return new Control(this);
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
        UIParent.appendChild(this._Element);
    }
    protected Create() : void
    {
        this._Element = <HTMLDivElement>(document.createElement('div'));
        this._Element.className = "control";
    }
    public OnSwitch() : void
    {
        // Override
        this.AddElement();
    }
    public OnResize(Args:any) : void
    {
        // Override
        this._Scale = new Math.Vertex(Args.Scale.X / Args.GlobalScale.X, Args.Scale.Y / Args.GlobalScale.Y, 1);
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