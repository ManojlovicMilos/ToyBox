export { SpriteEvents }

import { ImageObjectEvents } from "./ImageObjectEvents";

class SpriteEvents extends ImageObjectEvents
{
    public get SetComplete() : Function[] { return this._Data["SetComplete"]; }
    public constructor(Old?:SpriteEvents)
    {
        super(Old);
        if(Old != null) { }
        else
        {
            this._Data["SetComplete"] = [];
        }
    }
    public Copy() : SpriteEvents
    {
        return new SpriteEvents(this);
    }
}