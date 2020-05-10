export { Text }

import * as Mathematics from "./../Mathematics/Mathematics";

import { Control } from "./Control";

class Text extends Control
{
    protected _Text:string;
    protected _TextElement:HTMLElement;
    public get Text():string { return this._Text; }
    public set Text(value:string) { this._Text = value; this.Update(); }
    public get TextElement():HTMLElement { return this._TextElement; }
    public constructor(Old?:Text, Text?:string)
    {
        super(Old);
        if(Old)
        {
            this._Text = Old._Text;
        }
        else
        {
            if(Text) this._Text = Text;
            else this._Text = "";
            this.Size = new Mathematics.Vertex(300,60);
            this.Position = new Mathematics.Vertex(960,540,0.1);
            this.ForeColor = Mathematics.Color.White;
            this.BackColor = Mathematics.Color.Empty;
        }
    }
    public Copy() : Text
    {
        return new Text(this);
    }
    public Update() : void
    {
        // Override
        super.Update();
        if(!this.Element) return;
        this._TextElement.style.margin = "0px";
    }
}