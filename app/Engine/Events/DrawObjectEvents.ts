export { DrawObjectEvents }

import { Events } from "./Events";

class DrawObjectEvents extends Events
{
    public get Collision() : Function[] { return this._Data["Collision"]; }
    public constructor(Old?:DrawObjectEvents)
    {
        super(Old);
        if(Old != null) { }
        else
        {
            this._Data["Collision"] = [];
        }
    }
    public Copy() : DrawObjectEvents
    {
        return new DrawObjectEvents(this);
    }
}