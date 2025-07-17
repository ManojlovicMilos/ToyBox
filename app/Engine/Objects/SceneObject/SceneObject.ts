import * as Core from '../../../Core/Core';
import EventManager from '../../Events/EventManager';

abstract class SceneObject extends Core.BaseObject {
    private _active: boolean;
    protected _events: EventManager;
    public get active(): boolean { return this._active; }
    public set active(value: boolean) { this._active = value; this.onToggle(value); }
    public get events(): EventManager { return this._events as EventManager; }
    public set events(value: EventManager) { this._events = value; }

    public constructor(old?: SceneObject) {
        super(old);
        this.registerType(SceneObject);
        this._active = old ? old._active : true;
        this._events = old?.events.duplicate() || new EventManager();
    }

    // virtual
    public onSwitch(): void {}

    // virtual
    public onToggle(value: boolean): void {}
}

export default SceneObject;
