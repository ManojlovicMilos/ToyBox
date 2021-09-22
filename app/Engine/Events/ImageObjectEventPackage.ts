export { ImageObjectEventPackage }

import { EventManager } from "./EventManager";
import { EventHandlerCollection } from "./EventHandlerCollection";

enum ImageObjectEventTypes
{
    Click = "Click",
    MouseUp = "MouseUp",
    MouseDown = "MouseDown",
    TouchEnd = "TouchEnd",
    TouchStart = "TouchStart",
    
}

class ImageObjectEventPackage extends EventManager
{
    public get Click() : EventHandlerCollection { return this._Data[ImageObjectEventTypes.Click]; } 
    public get MouseUp() : EventHandlerCollection { return this._Data[ImageObjectEventTypes.MouseUp]; }
    public get MouseDown() : EventHandlerCollection { return this._Data[ImageObjectEventTypes.MouseDown]; }
    public get TouchEnd() : EventHandlerCollection { return this._Data[ImageObjectEventTypes.TouchEnd]; }
    public get TouchStart() : EventHandlerCollection { return this._Data[ImageObjectEventTypes.TouchStart]; }
    public constructor(Old?:ImageObjectEventPackage)
    {
        super(Old);
    }
    public Copy() : ImageObjectEventPackage
    {
        return new ImageObjectEventPackage(this);
    }
}
