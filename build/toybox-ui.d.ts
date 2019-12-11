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

export class ControlEventPackage extends Engine.EventPackage
{
    Click:Function[];
    Input:Function[];
    MouseEnter:Function[];
    MouseLeave:Function[];
    constructor(Old?:ControlEventPackage)
    Copy() : ControlEventPackage
    Connect(Control:Engine.SceneObject, Element:HTMLElement) : void
}

export class Control extends Engine.SceneObject
{
    Active:boolean;
    Position:Math.Vertex;
    Size:Math.Vertex;
    ForeColor:Math.Color;
    BackColor:Math.Color;
    Border:Border;
    Element:HTMLElement;
    Events:ControlEventPackage;
    constructor(Old?:Control)
    Copy() : Control
    Create() : void
    Update() : void
}

export enum TextAlign
{
    Left = "left",
    Right = "right",
    Center = "center"
}

export class Text extends Control
{
    Text:string;
    Font:string;
    TextSize:number;
    Padding:number;
    TextAlign:TextAlign;
    TextElement:HTMLElement;
    constructor(Old?:Text, Text?:string)
    Copy() : Text
}

export class Label extends Text
{
    constructor(Old?:Label, Text?:string)
    Copy() : Label
}

export class Input extends Text
{
    constructor(Old?:Input, Text?:string)
    Copy() : Input
}

export class Button extends Label
{
    constructor(Old?:Button, Text?:string)
    OnMouseEnter(Event:any) : void
    OnMouseLeave(Event:any) : void
    Copy() : Button
}

export class Panel extends Control
{
    Children:Control[];
    constructor(Old?:Panel)
    Copy() : Panel
    Attach(Child:Control) : void
}