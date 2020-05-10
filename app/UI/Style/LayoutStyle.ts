export { LayoutStyle, DockType }

import { Control } from "../Control";
import * as TBXMath from "../../Mathematics/Mathematics";

enum DockType
{
    None = "None",
    Top = "Top",
    Bottom = "Bottom",
    Left = "Left",
    Right = "Right",
    TopLeft = "TopLeft",
    TopRight = "TopRight",
    BottomLeft = "BottomLeft",
    BottomRight = "BottomRight",
    Center = "Center",
    Stretch = "Stretch"
}

class LayoutStyle
{
    private _Dock: DockType;
    public get Dock():DockType { return this._Dock; }
    public set Dock(value:DockType) { this._Dock = value; }
    public constructor(Old?:LayoutStyle)
    {
        if(Old != null)
        {
            this._Dock = Old._Dock;
        }
        else
        {
            this._Dock = DockType.TopLeft;
        }
    }
    public Copy() : LayoutStyle
    {
        return new LayoutStyle(this);
    }
    public Apply(Control: Control) : void
    {
        let Element: HTMLElement = Control.Element;
        let Size: TBXMath.Vertex = Control.Size;
        let Scale: TBXMath.Vertex = Control.Scale;
        let Position: TBXMath.Vertex = Control.Position;
        Element.style.boxSizing = "border-box";
        Element.style.position = (this._Dock != DockType.None) ? "absolute" : "static";
        if(this._Dock.search("Top") > -1)
        {
            Element.style.bottom = null;
            Element.style.top = Scale.Y * Position.Y + "px";
        }
        else if(this._Dock.search("Bottom") > -1)
        {
            Element.style.top = null;
            Element.style.bottom = Scale.Y * Position.Y + "px";
        }
        if(this._Dock.search("Left") > -1)
        {
            Element.style.right = null;
            Element.style.left = Scale.Y * Position.X + "px";
        }
        else if(this._Dock.search("Right") > -1)
        {
            Element.style.left = null;
            Element.style.right = Scale.Y * Position.X + "px";
        }
        if(this._Dock == DockType.Center || this._Dock == DockType.Top || this._Dock == DockType.Bottom)
        {
            Element.style.right = null;
            let Value: number = Math.round(Scale.Y * (Size.X / 2 - Position.X));
            let Offset: string = (Value > 0) ? "- " + Value : "+ " + (Value * -1); 
            Element.style.left = "calc(50% " + Offset + "px)";
        }
        if(this._Dock == DockType.Center || this._Dock == DockType.Left || this._Dock == DockType.Right)
        {
            Element.style.bottom = null;
            let Value: number = Math.round(Scale.Y * (Size.Y / 2 - Position.Y));
            let Offset: string = (Value > 0) ? "- " + Value : "+ " + (Value * -1); 
            Element.style.top = "calc(50% " + Offset + "px)"; 
        }
        Element.style.zIndex = Math.floor(1 + (Position.Z * 100 || 0)).toString();
        Element.style.width = Scale.Y * Size.X + "px";
        Element.style.height = Scale.Y * Size.Y + "px";
        if(this._Dock == DockType.Stretch)
        {
            let AspectRatioFactor: number = Control.ParentAspectRatio / (16.0 / 9);
            Element.style.top = Scale.Y * Position.Y + "px";
            Element.style.left = AspectRatioFactor * Scale.Y * Position.X + "px";
        }
    }
}