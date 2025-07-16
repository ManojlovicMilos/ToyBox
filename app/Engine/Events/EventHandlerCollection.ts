import BaseObject from '../../Core/BaseObject';

export { EventHandlerCollection };

type HandlerFunctionType<T> = (args: T, invoker: BaseObject) => {};

class EventHandlerCollection<T> {
    public stop: boolean;
    private handlers: (HandlerFunctionType<T>)[];

    public constructor(Old?: EventHandlerCollection<T>) {
        this.stop = false;
        this.handlers = Old ? Old.handlers : [];
    }

    public duplicate(): EventHandlerCollection<T> {
        return new EventHandlerCollection(this);
    }

    public add(handler: HandlerFunctionType<T>): void {
        this.handlers.push(handler);
    }

    public remove(handler: HandlerFunctionType<T>): void {
        this.handlers = this.handlers.filter(entry => entry != handler);
    }

    public clear(): void {
        this.handlers = [];
    }
    
    public invoke(args: T, invoker: BaseObject): boolean {
        if (this.stop) return false;
        if (this.handlers && this.handlers.length === 0) return false;
        for (let handler of this.handlers) {
            handler(args, invoker);
        }
        return true;
    }
}
