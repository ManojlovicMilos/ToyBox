export { Panel }

import { UIControl } from "./UIControl";

class Panel extends UIControl
{
    private _Children:UIControl[];
    public get Children():UIControl[] { return this._Children; }
    public constructor(Old?:Panel)
    {
        super(Old);
        this._Children = [];
        if(Old)
        {
            for(let i in Old._Children)
            {
                this._Children.push(Old._Children[i].Copy())
            }
        }
        else
        {
            
        }
    }
    public Copy() : Panel
    {
        return new Panel(this);
    }
    public Update() : void
    {
        super.Update();
        if(!this.Element) return;
        for(let i in this._Children)
        {
            if(!this._Children[i].Data["AppendedTo" + this.ID])
            {
                this.Element.appendChild(this._Children[i].Element);
                this._Children[i].Data["AppendedTo" + this.ID] = true;
            }
            this._Children[i].Offset = this.Position;
            this._Children[i].Update();
        }
    }
    protected Create() : void
    {
        super.Create();
        this.Element.className += " panel";
        for(let i in this._Children)
        {
            this._Children[i].Update();
            this.Element.appendChild(this._Children[i].Element);
            this._Children[i].Data["AppendedTo" + this.ID] = true;
        }
    }
    public Attach(Child:UIControl) : void
    {
        this._Children.push(Child);
    }
}