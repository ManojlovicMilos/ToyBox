export { EventManager };

import { EventArguments } from "./EventArguments";
import { EventHandlerCollection } from "./EventHandlerCollection";

class EventManager
{
    private _StopEvents: boolean;
    protected _Data: { [key: string]: EventHandlerCollection };
    public constructor(Old?: EventManager)
    {
        this._Data = {};
        this._StopEvents = false;
        if (Old)
        {
            this._StopEvents = Old._StopEvents;
            Object.keys(Old._Data).forEach(Key =>
            {
                this._Data[Key] = Old._Data[Key].Copy();
            });
        }
    }
    public Copy(): EventManager
    {
        return new EventManager(this);
    }
    public Invoke(EventName: string, Args: EventArguments): boolean
    {
        return this._Data[EventName].Invoke(Args);
    }
}
