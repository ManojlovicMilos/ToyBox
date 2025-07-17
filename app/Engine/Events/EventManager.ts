import BaseObject from '../../Core/BaseObject';
import EventHandlerCollection from './EventHandlerCollection';

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

    public get<T>(key: string): EventHandlerCollection<T> {
        return this.events[key] as EventHandlerCollection<T>;
    }

    public duplicate(): EventManager {
        return new EventManager(this);
    }

    public invoke<T>(eventName: string, args: T, invoker: BaseObject): boolean {
        return this.events[eventName].invoke(args, invoker);
    }
}

export default EventManager;
