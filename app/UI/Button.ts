export { Button }

import * as Math from "./../Mathematics/Mathematics";

import { Label } from "./Label";
import { Settings } from "../Core/Settings";

class Button extends Label
{
    public constructor(Old?:Button, Text?:string)
    {
        super(Old, Text);
        if(Old) { }
        else
        {
            this.BackColor = Math.Color.FromRGBA(127,127,127,255);
        }
    }
    public Copy() : Button
    {
        return new Button(this);
    }
    public Update() : void
    {
        super.Update();
        if(!this.Element) return;
        if(Settings.IgnoreUICSS)
        {
            this.Element.style.cursor = "pointer";
        }
    }
    protected Create() : void
    {
        super.Create();
        this.Element.className += " button";
        this.Events.MouseEnter.push(this.OnMouseEnter.bind(this));
        this.Events.MouseLeave.push(this.OnMouseLeave.bind(this));
    }
    protected OnMouseEnter(Event:any) : void
    {
        if(Settings.IgnoreUICSS)
        {
            this.Element.style.backgroundColor = this.BackColor.Copy().Lighten().ToString();
        }
    }
    protected OnMouseLeave(Event:any) : void
    {
        if(Settings.IgnoreUICSS)
        {
            this.Element.style.backgroundColor = this.BackColor.ToString();
        }
    }
}