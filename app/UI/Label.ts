export { Label  }

import { UIText } from "./UIText";

const LABEL_TYPE = "UILabelObject";

class Label extends UIText
{
    public constructor(Old?:Label, Text?:string)
    {
        super(Old, Text);
        this.RegisterType(LABEL_TYPE);
        this.RegisterFactory(() => new Label());
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