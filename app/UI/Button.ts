export { Button }

import * as Engine from "./../Engine/Engine";
import * as Math from "./../Mathematics/Mathematics";

import { Label } from "./Label";

class Button extends Label
{
    public constructor(Old?:Button, Text?:string)
    {
        super(Old, Text);
        if(Old)
        {

        }
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
        // Override
        super.Update();
        if(!this.Element) return;
        if(Engine.Settings.EngineUIStyle)
        {
            this._Style.Values["cursor"] = "pointer";
        }
    }
    protected Create() : void
    {
        // Override
        super.Create();
        this.Element.className += " button";
    }
}