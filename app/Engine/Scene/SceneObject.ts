import * as Core from './../../Core/Core';

import EventPackage from './../Events/EventPackage';

@Core.TypedObject('TBX.SceneObject')
class SceneObject extends Core.BaseObject {
    protected _Events: EventPackage;

    public get Events(): EventPackage { return this._Events; }

    public constructor(Old?: SceneObject) {
        super(Old);
        this.RegisterType(SceneObject, true);
        if (Old != null) {
            this._Events = Old._Events.Copy();
        }
        else {
            this._Events = new EventPackage();
        }
    }

    public OnSwitch(): void {
        // Virtual
    }

    public OnResize(Args: any): void {
        // Virtual
    }
}

export default SceneObject;
