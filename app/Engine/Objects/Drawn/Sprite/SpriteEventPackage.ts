export { SpriteEventPackage }

import { EventHandlerCollection } from "../../Events/EventHandlerCollection";
import { ImageObjectEventPackage } from "../ImageObject/ImageObjectEventManager";

enum SpriteEventTypes {
    SetComplete = "SetComplete"
}

class SpriteEventPackage extends ImageObjectEventPackage {
    public get setComplete(): EventHandlerCollection { return this._Data[SpriteEventTypes.SetComplete]; }
    public constructor(Old?: SpriteEventPackage) {
        super(Old);
    }
    public Copy(): SpriteEventPackage {
        return new SpriteEventPackage(this);
    }
}
