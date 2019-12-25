export { UIText, TextAlign }

import * as Mathematics from "../Mathematics/Mathematics";

import { Settings } from "../Core/Settings";
import { UIControl } from "./UIControl";

const TEXT_TYPE = "UITextObject";

enum TextAlign
{
    Left = "left",
    Right = "right",
    Center = "center"
}

class UIText extends UIControl
{
    protected _Text:string;
    protected _Font:string;
    protected _Padding:number;
    protected _TextSize:number;
    protected _TextAlign:TextAlign;
    protected _TextElement:HTMLElement;
    public get Text():string { return this._Text; }
    public set Text(value:string) { this._Text = value; this.Update(); }
    public get Font():string { return this._Font; }
    public set Font(value:string) { this._Font = value; this.Update(); }
    public get TextSize():number { return this._TextSize; }
    public set TextSize(value:number) { this._TextSize = value; this.Update(); }
    public get Padding():number { return this._Padding; }
    public set Padding(value:number) { this._Padding = value; this.Update(); }
    public get TextAlign():TextAlign { return this._TextAlign; }
    public set TextAlign(value:TextAlign) { this._TextAlign = value; this.Update(); }
    public get TextElement():HTMLElement { return this._TextElement; }
    public constructor(Old?:UIText, Text?:string)
    {
        super(Old);
        this.RegisterType(TEXT_TYPE);
        this.RegisterFactory(() => new UIText());
        if(Old)
        {
            this._Text = Old._Text;
            this._Font = Old._Font;
            this._TextSize = Old._TextSize;
            this._Padding = Old._Padding;
            this._TextAlign = Old._TextAlign;
        }
        else
        {
            if(Text) this._Text = Text;
            else this._Text = "";
            this._Font = Settings.UI.GlobalFontFamily;
            this._Padding = 5;
            this._TextSize = 40;
            this._TextAlign = TextAlign.Center;
            this.Size = new Mathematics.Vector(300,60);
            this.Position = new Mathematics.Vector(960,540,0.1);
            this.ForeColor = Mathematics.Color.White;
            this.BackColor = Mathematics.Color.Empty;
        }
    }
    public Copy() : UIText
    {
        return new UIText(this);
    }
    public Update() : void
    {
        super.Update();
        if(!this.Element) return;
        if(Settings.UI.IgnoreUICSS)
        {
            this.Element.style.fontFamily = this._Font;
            this.Element.style.fontSize = Math.floor(Settings.UI.GlobalFontScale * this._Scale.Y * this._TextSize) + "px";
            this.Element.style.textAlign = this._TextAlign;
            this.Element.style.padding = Math.floor(this._Scale.Y * this._Padding) + "px";
            this.Element.style.overflow = "hidden";
        }
        this._TextElement.style.margin = "0px";
    }
}