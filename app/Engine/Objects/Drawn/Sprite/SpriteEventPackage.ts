import SpriteSetEventArguments from "./SpriteSetCompleteEventArguments";
import EventHandlerCollection from "../../../Events/EventHandlerCollection";
import ImageObjectEventManager from "../ImageObject/ImageObjectEventManager";

export enum SpriteEventTypes {
    SpriteSetComplete = "SpriteSetComplete"
}

class SpriteEventPackage extends ImageObjectEventManager {
    public get spriteSetComplete(): EventHandlerCollection<SpriteSetEventArguments> {
        return this.events[SpriteEventTypes.SpriteSetComplete] as EventHandlerCollection<SpriteSetEventArguments>;
    }

    public constructor(Old?: SpriteEventPackage) {
        super(Old);
    }

    public duplicate(): SpriteEventPackage {
        return new SpriteEventPackage(this);
    }
}

export default SpriteEventPackage;
