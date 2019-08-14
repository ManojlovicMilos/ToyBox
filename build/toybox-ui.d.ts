import * as Math from "./toybox-math";
import * as Engine from "./toybox-engine";

export class Border
{
    Width:number;
    Radius:number;
    Color:Math.Color;
    constructor(Old?:Border, Width?:number, Color?:Math.Color)
    Copy() : Border
    Apply(Element:HTMLElement)
}

export class UIControlEvents extends Engine.Events
{
    Click:Function[];
    MouseEnter:Function[];
    MouseLeave:Function[];
    constructor(Old?:UIControlEvents)
    Copy() : UIControlEvents
    Connect(Element:HTMLElement) : void
}

export class UIControl extends Engine.SceneObject
{
    Active:boolean;
    Position:Math.Vector;
    Size:Math.Vector;
    ForeColor:Math.Color;
    BackColor:Math.Color;
    Border:Border;
    Element:HTMLElement;
    constructor(Old?:UIControl)
    Copy() : UIControl
    Update() : void
}

export enum TextAlign
{
    Left = "left",
    Right = "right",
    Center = "center"
}

export class Label extends UIControl
{
    Text:string;
    Font:string;
    TextSize:number;
    Padding:number;
    TextAlign:TextAlign;
    constructor(Old?:Label, Text?:string)
    Copy() : Label
}

export class Button extends Label
{
    Events:UIControlEvents;
    constructor(Old?:Button, Text?:string)
    OnMouseEnter(Event:any) : void
    OnMouseLeave(Event:any) : void
    Copy() : Button
}

export class Panel extends UIControl
{
    Children:UIControl[];
    constructor(Old?:Panel)
    Copy() : Panel
    Attach(Child:UIControl) : void
}