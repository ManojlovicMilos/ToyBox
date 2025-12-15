export { OffsetStyle }

import * as TBXMath from "../../Mathematics/Mathematics";

class OffsetStyle
{
    private _Property: string;
    private _All: number;
    private _Vertical: number;
    private _Horizontal: number;
    private _Top: number;
    private _Bottom: number;
    private _Left: number;
    private _Right: number;
    private _Unit: string;
    public get All():number { return this._All; }
    public set All(value:number) { this._All = value; }
    public get Vertical():number { return this._Vertical; }
    public set Vertical(value:number) { this._Vertical = value; }
    public get Horizontal():number { return this._Horizontal; }
    public set Horizontal(value:number) { this._Horizontal = value; }
    public get Top():number { return this._Top; }
    public set Top(value:number) { this._Top = value; }
    public get Bottom():number { return this._Bottom; }
    public set Bottom(value:number) { this._Bottom = value; }
    public get Left():number { return this._Left; }
    public set Left(value:number) { this._Left = value; }
    public get Right():number { return this._Right; }
    public set Right(value:number) { this._Right = value; }
    public constructor(Old?:OffsetStyle, Property?: string)
    {
        if(Old != null)
        {
            this._Property = Old._Property;
            this._All = Old._All;
            this._Vertical = Old._Vertical;
            this._Horizontal = Old._Horizontal;
            this._Top = Old._Top;
            this._Bottom = Old._Bottom;
            this._Left = Old._Left;
            this._Right = Old._Right;
            this._Unit = Old._Unit;
        }
        else
        {
            this._Property = Property;
            this._All = 0;
            this._Unit = "px";
        }
    }
    public Copy() : OffsetStyle
    {
        return new OffsetStyle(this);
    }
    public Apply(Element:HTMLElement, Scale: TBXMath.Vertex) : void
    {
        Element.style[this._Property] = Math.round(this._All * Scale.Y) + this._Unit;
        if(this._Vertical || this._Horizontal)
        {
            Element.style[this._Property] = Math.round((this._Vertical || this._All) * Scale.Y) + this._Unit + " "
                                        + Math.round((this._Horizontal || this._All) * Scale.Y) + this._Unit;
        }
        if(this._Top)    Element.style[this._Property + 'Top']    = Math.round(this._Top * Scale.Y) + this._Unit;
        if(this._Bottom) Element.style[this._Property + 'Bottom'] = Math.round(this._Bottom * Scale.Y) + this._Unit;
        if(this._Left)   Element.style[this._Property + 'Left']   = Math.round(this._Left * Scale.Y) + this._Unit;
        if(this._Right)  Element.style[this._Property + 'Right']  = Math.round(this._Right * Scale.Y) + this._Unit;
    }
}