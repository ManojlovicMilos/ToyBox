import EventManager from "../../../Events/EventManager";
import EventHandlerCollection from "../../../Events/EventHandlerCollection";
import MouseEventArguments from "../../../Events/EventArguments/MouseEventArguments";

enum ImageObjectEventTypes {
    Click = 'Click',
    MouseUp = 'MouseUp',
    MouseDown = 'MouseDown',
    TouchEnd = 'TouchEnd',
    TouchStart = 'TouchStart',
}

class ImageObjectEventManager extends EventManager {
    public get click() : EventHandlerCollection<MouseEventArguments> { return this.events[ImageObjectEventTypes.Click]; } 
    public get mouseUp() : EventHandlerCollection<MouseEventArguments> { return this.events[ImageObjectEventTypes.MouseUp]; }
    public get mouseDown() : EventHandlerCollection<MouseEventArguments> { return this.events[ImageObjectEventTypes.MouseDown]; }
    public get touchEnd() : EventHandlerCollection<MouseEventArguments> { return this.events[ImageObjectEventTypes.TouchEnd]; }
    public get touchStart() : EventHandlerCollection<MouseEventArguments> { return this.events[ImageObjectEventTypes.TouchStart]; }

    public constructor(Old?:ImageObjectEventManager) {
        super(Old);
    }
    
    public duplicate() : ImageObjectEventManager {
        return new ImageObjectEventManager(this);
    }
}

export { ImageObjectEventTypes };

export default ImageObjectEventManager;
