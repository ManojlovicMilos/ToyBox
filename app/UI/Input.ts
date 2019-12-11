export { Input }

import * as Mathematics from "./../Mathematics/Mathematics";

import { Settings } from "./../Engine/Settings";
import { Text } from "./Text";

class Input extends Text
{
    public constructor(Old?:Input, Text?:string)
    {
        super(Old, Text);
        if(Old)
        {

        }
        else
        {

        }
    }
    public Copy() : Input
    {
        return new Input(this);
    }
    public Update() : void
    {
        super.Update();
        if(!this.Element) return;
        (<HTMLInputElement>this._TextElement).type = "text";
        this._TextElement.setAttribute("value",this._Text); 
    }
    protected Create() : void
    {
        super.Create();
        this.Element.className += " label";
        this._TextElement = document.createElement('input');
        this._TextElement.className = "text";
        this.TextElement.style.color = this._ForeColor.ToString();
        this._TextElement.style.backgroundColor = "transparent";
        this._TextElement.style.borderStyle = "none";
        this._TextElement.style.fontFamily = this._Font;
        this._TextElement.style.fontSize = Math.floor(Settings.GlobalFontScale * this._TextSize) + "px";
        this._TextElement.style.outline = "none";
        this.Element.appendChild(this._TextElement);
        this.Events.Connect(this, this._TextElement);
    }
}