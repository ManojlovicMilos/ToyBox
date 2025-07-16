export { SceneObject };

import * as Core from '../../../Core/Core';

import { EventManager } from '../../Events/EventManager';

abstract class SceneObject extends Core.BaseObject {
    public events: EventManager;
    private _active: boolean;
    public get active(): boolean { return this._active; }
    public set active(value: boolean) { this._active = value; this.onToggle(value); }

    public constructor(old?: SceneObject) {
        super(old);
        this.registerType(SceneObject);
        this.events = old?.events.duplicate() || new EventManager();
        this._active = old ? old._active : true;
    }

    public onSwitch(): void {
        // Virtual
    }

    public onToggle(value: boolean): void {
        // Virtual
    }
}
