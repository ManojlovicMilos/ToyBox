export { EventManager };

import { EventArguments } from "./EventArguments";
import { EventHandlerCollection } from "./EventHandlerCollection";

class EventManager {
    protected _StopEvents: boolean;
    protected _Events: { [key: string]: EventHandlerCollection };

    public constructor(Old?: EventManager) {
        this._Events = {};
        this._StopEvents = false;
        if (Old) {
            this._StopEvents = Old._StopEvents;
            Object.keys(Old._Events).forEach(Key => {
                this._Events[Key] = Old._Events[Key].Copy();
            });
        }
    }

    public Copy(): EventManager {
        return new EventManager(this);
    }

    public Invoke(EventName: string, Args: EventArguments): boolean {
        return this._Events[EventName].Invoke(Args);
    }
}
