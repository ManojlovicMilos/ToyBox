export { Input }

import * as Mathematics from "./../Mathematics/Mathematics";

import { Text } from "./Text";
import { Settings } from "./../Engine/Settings";
import { ContentAlign } from "./Style/ContentStyle";

class Input extends Text
{
    private _Placeholder: string;
    private _PlaceholderColor: Mathematics.Color;
    public get Placeholder():string { return this._Placeholder; }
    public set Placeholder(value:string) { this._Placeholder = value; }
    public get PlaceholderColor():Mathematics.Color { return this._PlaceholderColor; }
    public set PlaceholderColor(value:Mathematics.Color) { this._PlaceholderColor = value; }
    public constructor(Old?:Input, Text?:string)
    {
        super(Old, Text);
        if(Old)
        {
            this._Placeholder = Old._Placeholder;
            this._PlaceholderColor = Old._PlaceholderColor.Copy();
        }
        else
        {
            this._Placeholder = "";
            this._PlaceholderColor = Mathematics.Color.FromRGBA(100, 100, 100, 255);
            this._Style.Content.HorizontalAlign = ContentAlign.Start;
        }
    }
    public Copy() : Input
    {
        return new Input(this);
    }
    public Update() : void
    {
        // Override
        super.Update();
        if(!this.Element) return;
        (<HTMLInputElement>this._TextElement).type = "text";
        (<HTMLInputElement>this._TextElement).value = this._Text;
        (<HTMLInputElement>this._TextElement).placeholder = this._Placeholder;
    }
    public Create() : void
    {
        // Override
        super.Create();
        const FontScale = Settings.UI.GlobalFontScale * this._Style.Text.Size;
        this.Element.className += " input";
        this._TextElement = document.createElement('input');
        this._TextElement.className = "text";
        this.TextElement.style.color = this.ForeColor.ToString();
        this._TextElement.style.backgroundColor = "transparent";
        this._TextElement.style.borderStyle = "none";
        this._TextElement.style.fontFamily = this._Style.Font;
        this._TextElement.style.fontSize = Math.floor(Settings.GlobalFontScale * this._Style.Text.Size) + "px";
        this._TextElement.style.outline = "none";
        this.Element.appendChild(this._TextElement);
        this.Events.Connect(this, this._TextElement);
    }
}
