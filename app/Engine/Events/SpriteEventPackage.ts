export { SpriteEventPackage }

import { EventHandlerCollection } from "./EventHandlerCollection";
import { ImageObjectEventPackage } from "./ImageObjectEventPackage";

enum SpriteEventTypes
{
    SetComplete = "SetComplete"
}

class SpriteEventPackage extends ImageObjectEventPackage
{
    public get SetComplete() : EventHandlerCollection { return this._Data[SpriteEventTypes.SetComplete]; }
    public constructor(Old?:SpriteEventPackage)
    {
        super(Old);
    }
    public Copy() : SpriteEventPackage
    {
        return new SpriteEventPackage(this);
    }
}
