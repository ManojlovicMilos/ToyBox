export { Label  }

import * as Mathematics from "./../Mathematics/Mathematics";

import { Text } from "./Text";

class Label extends Text
{
    public constructor(Old?:Label, Text?:string)
    {
        super(Old, Text);
        if(Old)
        {

        }
        else
        {

        }
    }
    public Copy() : Label
    {
        return new Label(this);
    }
    public Update() : void
    {
        super.Update();
        if(!this.Element) return;
        this._TextElement.innerText = this._Text;
    }
    protected Create() : void
    {
        super.Create();
        this.Element.className += " label";
        this._TextElement = document.createElement('p');
        this._TextElement.className = "text";
        this.Element.appendChild(this._TextElement);
    }
}