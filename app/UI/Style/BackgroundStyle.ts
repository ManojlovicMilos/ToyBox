export { BackgroundStyle }

import * as Math from "../../Mathematics/Mathematics";

class BackgroundStyle
{
    private _Image: string;
    private _Color: Math.Color;
    public get Image() : string { return this._Image; }
    public set Image(value:string) { this._Image = value; }
    public get Color() : Math.Color { return this._Color; }
    public set Color(value:Math.Color) { this._Color = value; }
    public constructor(Old?:BackgroundStyle)
    {
        if(Old != null)
        {
            this._Image = Old._Image;
            this._Color = Old._Color.Copy();
        }
        else
        {
            this._Color = Math.Color.White;
        }
    }
    public Copy() : BackgroundStyle
    {
        return new BackgroundStyle(this);
    }
    public Apply(Element:HTMLElement) : void
    {
        if(this._Image) Element.style.backgroundImage = this._Image;
        if(this.Color.A == 0) Element.style.backgroundColor = "rgba(0,0,0,0)";
        else Element.style.backgroundColor = this._Color.ToString();
    }
}