import * as Math from "./../../Mathematics/Mathematics";

import { TextStyle } from "./TextStyle"
import { BorderStyle } from "./BorderStyle";
import { BackgroundStyle } from "./BackgroundStyle";
import { ContentStyle } from "./ContentStyle";
import { OffsetStyle } from "./OffsetStyle";
import { Control } from "../Control";
import { LayoutStyle } from "./LayoutStyle";

export { Style }

class Style
{
    private _Text: TextStyle;
    private _Border: BorderStyle;
    private _Background: BackgroundStyle;
    private _Content: ContentStyle;
    private _Margin: OffsetStyle;
    private _Padding: OffsetStyle;
    private _Layout: LayoutStyle;
    private _Values: any;
    public get Text():TextStyle { return this._Text; }
    public get Border():BorderStyle { return this._Border; }
    public get Background():BackgroundStyle { return this._Background; }
    public get Content():ContentStyle { return this._Content; }
    public get Margin():OffsetStyle { return this._Margin; }
    public get Padding():OffsetStyle { return this._Padding; }
    public get Layout():LayoutStyle { return this._Layout; }
    public get Values(): any { return this._Values; }
    public get Font():string { return this._Text.Font; }
    public set Font(value:string) { this._Text.Font = value; }
    public constructor(Old?:Style)
    {
        if(Old != null)
        {
            this._Text = Old._Text.Copy();
            this._Border = Old._Border.Copy();
            this._Background = Old._Background.Copy();
            this._Content = Old._Content.Copy();
            this._Margin = Old._Margin.Copy();
            this._Padding = Old._Padding.Copy();
            this._Layout = Old._Layout.Copy();
            this._Values = Object.assign({}, Old._Values);
        }
        else
        {
            this._Text = new TextStyle();
            this._Border = new BorderStyle();
            this._Background = new BackgroundStyle();
            this._Content = new ContentStyle();
            this._Margin = new OffsetStyle(null, "margin");
            this._Padding = new OffsetStyle(null, "padding");
            this._Layout = new LayoutStyle();
            this._Values = {};
        }
    }
    public Copy() : Style
    {
        return new Style(this);
    }
    public Apply(Control: Control) : void
    {
        this._Text.Apply(Control.Element, Control.Scale);
        this._Border.Apply(Control.Element, Control.Scale);
        this._Background.Apply(Control.Element);
        this._Content.Apply(Control.Element, Control.Active);
        this._Margin.Apply(Control.Element, Control.Scale);
        this._Padding.Apply(Control.Element, Control.Scale);
        this._Layout.Apply(Control);
        Object.keys(this._Values)
        .forEach(Key =>
        {
            Control.Element.style[Key] = this._Values[Key];
        });
    }
}