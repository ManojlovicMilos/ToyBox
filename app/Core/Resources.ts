export { Resources };

import { BaseObject, BaseObjectCollection } from "./BaseObject";

class Resources {
    private _Objects: BaseObjectCollection
    private _ObjectsPerType: { [type: string]: BaseObject[] };

    public constructor(Old?: Resources) {
        if (Old != null) {
            this._Objects = { ...Old._Objects };
        }
        else {
            this._Objects = {};
        }
    }

    public Copy(): Resources {
        return new Resources(this);
    }

    public Get(Key: string): BaseObject {
        return this._Objects[Key];
    }

    public GetPerType(Type: string): BaseObject[] {
        return this._ObjectsPerType[Type];
    }

    public New(Key: string): BaseObject {
        return this._Objects[Key].Copy();
    }

    public Set(Key: string, Data: BaseObject): void {
        if (this._Objects[Key]) {
            return;
        }
        Data.ResourceKey = Key;
        this._Objects[Key] = Data;
        this._ObjectsPerType[Data.Type].push(Data);
    }
    
    public Exists(Key: string): boolean {
        return this._Objects[Key] != null;
    }
}
