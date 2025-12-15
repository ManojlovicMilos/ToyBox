import * as Math from "./toybox-math";
import * as Engine from "./toybox-engine";

export namespace UI
{
    class BackgroundStyle
    {
        Image: string;
        Color: Math.Color;
        constructor(Old?:BackgroundStyle)
        Copy() : BackgroundStyle
        Apply(Element:HTMLElement) : void
    }

    class BorderStyle
    {
        Width: number;
        Radius: number;
        Color: Math.Color;
        constructor(Old?:BorderStyle, Width?:number, Color?:Math.Color)
        Copy() : BorderStyle
        Apply(Element:HTMLElement, Scale: Math.Vertex) : void
    }

    class TextStyle
    {
        Size: number;
        Weight: number;
        Font: string;
        Color: Math.Color;
        constructor(Old?:TextStyle)
        Copy() : TextStyle
        Apply(Element:HTMLElement, Scale: Math.Vertex) : void
    }

    enum ContentAlign
    {
        Start,
        End,
        Center,
        Between,
        Around
    }

    enum ContentDirection
    {
        Row,
        Column
    }

    class ContentStyle
    {
        Enabled: boolean;
        Direction: ContentDirection;
        Align: ContentAlign;
        VerticalAlign: ContentAlign;
        HorizontalAlign: ContentAlign;
        constructor(Old?:ContentStyle)
        Apply(Element: HTMLElement, Active) : void
    }

    class OffsetStyle
    {
        All: number;
        Vertical: number;
        Horizontal: number;
        Top: number;
        Bottom: number;
        Left: number;
        Right: number;
        Unit: string;
        constructor(Old?:OffsetStyle, Property?: string)
        Copy() : OffsetStyle
        Apply(Element: HTMLElement, Scale: Math.Vertex) : void
    }

    enum DockType
    {
        None,
        Top,
        Bottom,
        Left,
        Right,
        TopLeft,
        TopRight,
        BottomLeft,
        BottomRight,
        Center,
        Stretch
    }

    class LayoutStyle
    {
        Dock: DockType;
        constructor(Old?:LayoutStyle)
        Copy() : LayoutStyle
        Apply(Control: Control) : void
    }

    class Style
    {
        Text: TextStyle;
        Border: BorderStyle;
        Background: BackgroundStyle;
        Content: ContentStyle;
        Margin: OffsetStyle;
        Padding: OffsetStyle;
        Layout: LayoutStyle;
        Values: { [key: string]: string; };
        Font: string;
        constructor(Old?:Style)
        Copy() : Style
        Apply(Control: Control) : void
    }

    class ControlEventPackage extends Engine.EventPackage
    {
        Click:Function[];
        Input:Function[];
        MouseEnter:Function[];
        MouseLeave:Function[];
        constructor(Old?:ControlEventPackage)
        Copy() : ControlEventPackage
        Connect(Control:Engine.SceneObject, Element:HTMLElement) : void
    }

    class Control extends Engine.SceneObject
    {
        Active: boolean;
        ParentAspectRatio: number;
        Position: Math.Vertex;
        Size: Math.Vertex;
        Offset: Math.Vertex;
        Style: Style;
        Parent: Control;
        Element: HTMLElement;
        Events: ControlEventPackage;
        Dock: DockType;
        ForeColor: Math.Color;
        BackColor: Math.Color;
        constructor(Old?:Control)
        Copy() : Control
        Update() : void
        Create() : void
        OnToggle(Value:boolean) : void
    }

    class Text extends Control
    {
        Text:string;
        TextElement:HTMLElement;
        constructor(Old?:Text, Text?:string)
        Copy() : Text
    }

    class Label extends Text
    {
        constructor(Old?:Label, Text?:string)
        Copy() : Label
    }

    class Input extends Text
    {
        Placeholder:string;
        PlaceholderColor:Math.Color;
        constructor(Old?:Input, Text?:string)
        Copy() : Input
    }

    class Button extends Label
    {
        constructor(Old?:Button, Text?:string)
        OnMouseEnter(Event:any) : void
        OnMouseLeave(Event:any) : void
        Copy() : Button
    }

    class Panel extends Control
    {
        Children:Control[];
        constructor(Old?:Panel)
        Copy() : Panel
        Attach(Child:Control) : void
        Remove(Child:Control) : void
        RemoveAll() : void
    }
}