import BaseObject from './BaseObject';

export default class Resources {
    private _objects: { [key: string]: BaseObject }
    private _objectsPerType: { [type: string]: BaseObject[] };

    public constructor(old?: Resources) {
        this._objects = old ? { ...old._objects } : {};
    }

    public copy(): Resources {
        return new Resources(this);
    }

    public get(key: string): BaseObject {
        return this._objects[key];
    }

    public getPerType(type: string): BaseObject[] {
        return this._objectsPerType[type];
    }

    public new(key: string): BaseObject {
        return this._objects[key].duplicate();
    }

    public set(key: string, data: BaseObject): void {
        if (this._objects[key]) {
            return;
        }
        data.resourceKey = key;
        this._objects[key] = data;
        this._objectsPerType[data.type].push(data);
    }
    
    public exists(key: string): boolean {
        return this._objects[key] != null;
    }
}
