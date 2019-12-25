export { Input }

import { Settings } from "../Core/Settings";
import { UIText } from "./UIText";

const INPUT_TYPE = "UIInputObject";

class Input extends UIText
{
    public constructor(Old?:Input, Text?:string)
    {
        super(Old, Text);
        this.RegisterType(INPUT_TYPE);
        this.RegisterFactory(() => new Input());
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
        this._TextElement.style.fontSize = Math.floor(Settings.UI.GlobalFontScale * this._TextSize) + "px";
        this._TextElement.style.outline = "none";
        this.Element.appendChild(this._TextElement);
        this.Events.Connect(this, this._TextElement);
    }
}