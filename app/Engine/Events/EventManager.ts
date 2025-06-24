export { EventManager };
import BaseObject from '../../Core/BaseObject';
import { EventHandlerCollection } from './EventHandlerCollection';

class EventManager {
    protected events: { [key: string]: EventHandlerCollection<unknown> };

    public constructor(old?: EventManager) {
        this.events = {};
        if (old) {
            Object.keys(old.events).forEach(Key => {
                this.events[Key] = old.events[Key].duplicate();
            });
        }
    }

    public duplicate(): EventManager {
        return new EventManager(this);
    }

    public invoke(eventName: string, args: unknown, invoker: BaseObject): boolean {
        return this.events[eventName].invoke(args, invoker);
    }
}
