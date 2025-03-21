import BaseObject from "./BaseObject";

export default class Resources {
    private _objects: { [key: string]: BaseObject }
    private _objectsPerType: { [type: string]: BaseObject[] };

    public constructor(old?: Resources) {
        if (old != null) {
            this._objects = { ...old._objects };
        }
        else {
            this._objects = {};
        }
    }

    public Copy(): Resources {
        return new Resources(this);
    }

    public Get(key: string): BaseObject {
        return this._objects[key];
    }

    public GetPerType(type: string): BaseObject[] {
        return this._objectsPerType[type];
    }

    public New(key: string): BaseObject {
        return this._objects[key].Duplicate();
    }

    public Set(key: string, data: BaseObject): void {
        if (this._objects[key]) {
            return;
        }
        data.resourceKey = key;
        this._objects[key] = data;
        this._objectsPerType[data.type].push(data);
    }
    
    public Exists(key: string): boolean {
        return this._objects[key] != null;
    }
}
