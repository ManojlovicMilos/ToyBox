export { TextStyle }

import * as TBXMath from "../../Mathematics/Mathematics";
import { Settings } from "../../Engine/Engine";

class TextStyle
{
    private _Size: number;
    private _Weight: number;
    private _Font: string;
    private _Color: TBXMath.Color;
    public get Size() : number { return this._Size; }
    public set Size(value:number) { this._Size = value; }
    public get Weight() : number { return this._Weight; }
    public set Weight(value:number) { this._Weight = value; }
    public get Font() : string { return this._Font; }
    public set Font(value:string) { this._Font = value; }
    public get Color() : TBXMath.Color { return this._Color; }
    public set Color(value:TBXMath.Color) { this._Color = value; }
    public constructor(Old?:TextStyle)
    {
        if(Old != null)
        {
            this._Size = Old._Size;
            this._Weight = Old._Weight;
            this._Font = Old._Font;
            this._Color = Old._Color.Copy();
        }
        else
        {
            this._Size = 40;
            this._Weight = 400;
            this._Font = Settings.GlobalFontFamily;
            this._Color = TBXMath.Color.White;
        }
    }
    public Copy() : TextStyle
    {
        return new TextStyle(this);
    }
    public Apply(Element:HTMLElement, Scale: TBXMath.Vertex) : void
    {
        Element.style.fontSize = Math.round(Settings.GlobalFontScale * this._Size * Scale.Y) + "px";
        Element.style.lineHeight = Math.round(Settings.GlobalFontScale * this._Size * Scale.Y * Settings.GlobalLineHeightFactor) + "px";
        Element.style.fontWeight = this._Weight.toString();
        if(this._Font) Element.style.fontFamily = this._Font;
        Element.style.color = this._Color.ToString();
    }
}