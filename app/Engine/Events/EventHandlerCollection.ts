export { EventHandlerCollection };

import { EventArguments } from "./EventArguments";

class EventHandlerCollection
{
    private _Handlers: Function[];
    public constructor(Old?: EventHandlerCollection)
    {
        this._Handlers = Old ? Old._Handlers : [];
    }
    public Copy(): EventHandlerCollection
    {
        return new EventHandlerCollection(this);
    }
    public Add(Handler: Function): void
    {
        this._Handlers.push(Handler);
    }
    public Remove(Handler: Function): void
    {
        this._Handlers = this._Handlers.filter(Entry => Entry != Handler);
    }
    public Clear(): void
    {
        this._Handlers = [];
    }
    public Invoke(Args: EventArguments): boolean
    {
        if (this._Handlers.length == 0) return false;
        let Handled: boolean = false;
        for (let Handler of this._Handlers)
        {
            Handled = Handled || Handler(Args);
        }
        return Handled;
    }
}
