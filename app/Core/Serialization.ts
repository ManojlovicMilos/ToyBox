export {
    SerializedBaseObjectData,
    SerializedBaseObjectReference
}
import Log from './Log';
import Utility from './Service';
import BaseObject from './BaseObject';
import { TagCollection } from './Tag';
import inject from './InjectionManager';

type SerializedJSONbjectData = { [key: string]: SerializedJSONbjectData | string | number | boolean };
type SerializedObjectValueType = SerializedBaseObjectReference | SerializedJSONbjectData | string | number | boolean | null;
type SerializedBaseObjectData = { [key: string]: SerializedBaseObjectReference | TagCollection | SerializedJSONbjectData | string | number | boolean };
type SerializedBaseObjectReference = {
    type: string,
    data: SerializedBaseObjectData,
};

const EDITOR_PREFIX = 'EDITOR_';
const TOYBOX_PREFIX = 'TOYBOX_';

export default class Serialization extends Utility {
    private log: Log;
    private factories: { [key: string]: Function } = {};

    public constructor() {
        super();
        this.log = inject(Log);
    }

    public validSerializedBaseObjectReference(DataObject: Partial<SerializedBaseObjectReference>): boolean {
        if (!DataObject.type) return false;
        if (!DataObject.data) return false;
        return !!this.factories[DataObject.type];
    }

    public register(type: string, Factory: Function): boolean {
        if (this.factories[type]) {
            this.log.warning('Unable to register factory, already registered.');
            return false;
        }
        this.factories[type] = Factory;
        return true;
    }

    public serialize(serialized: BaseObject): SerializedBaseObjectReference {
        return {
            type: serialized.type,
            data: {
                ...this.serializeInstanceData(serialized),
                Tags: this.filterTags(serialized.tags)
            }
        };
    }

    public json(serialized: BaseObject): string {
        return JSON.stringify(this.serialize(serialized));
    }

    private serializeInstanceData(serialized: BaseObject): SerializedBaseObjectData {
        const Data: SerializedBaseObjectData = {};
        Object.keys(serialized).forEach(key => {
            const value: SerializedObjectValueType | null = this.serializeInstanceDataValue(this[key]);
            if (value !== null) {
                Data[key] = value;
            }
        });
        return Data;
    }

    private serializeInstanceDataValue(serializedValue: BaseObject | TagCollection | object | string | number | boolean): SerializedObjectValueType {
        if (typeof serializedValue !== 'function' && typeof serializedValue !== 'object') {
            return serializedValue;
        } else if (typeof serializedValue === 'object' && (serializedValue as object) instanceof BaseObject) {
            return this.serialize(serializedValue as BaseObject);
        } else if (typeof serializedValue === 'object') {
            let Serialized: SerializedJSONbjectData = {};
            Object.keys(serializedValue).forEach(key => {
                const value: SerializedObjectValueType | null = this.serializeInstanceDataValue(this[key]);
                if (value !== null) {
                    Serialized[key] = value;
                }
            });
            return Serialized;
        } else return null;
    }

    private filterTags(serializedTags: TagCollection): TagCollection {
        const FilteredTags: TagCollection = {};
        Object.keys(serializedTags).forEach(key => {
            if (!key.startsWith(EDITOR_PREFIX)
                && !key.startsWith(TOYBOX_PREFIX)) {
                FilteredTags[key] = serializedTags[key];
            }
        });
        return FilteredTags;
    }

    public deserialize(deserializedData: SerializedBaseObjectReference): BaseObject | null {
        let value: BaseObject | null;
        if (!!this.factories[deserializedData.type]) {
            value = this.factories[deserializedData.type]();
            this.deserializeInstanceData(value, deserializedData.data);
        }
        else {
            this.log.error(`Failed to Deserialize Object of Type: ${deserializedData.type}. Missing registered factory.`);
        }
        return value;
    }

    private deserializeInstanceData(deserialized: BaseObject, deserializedData: SerializedBaseObjectData): void {
        Object.keys(deserializedData).forEach(key => {
            const value: BaseObject | object | string | number | boolean | null = this.deserializeInstanceDataValue(deserialized[key]);
            if (value !== null) {
                deserialized[key] = value;
            }
        });
    }

    private deserializeInstanceDataValue(deserializedValue: SerializedBaseObjectReference | string | number | boolean): BaseObject | string | number | boolean | null {
        if (typeof deserializedValue !== 'object' && typeof deserializedValue !== 'function') return deserializedValue;
        if (typeof deserializedValue === 'function') {
            this.log.warning('Invalid json object passed for deserialization. Data cannot contain functions.');
            return null;
        }
        else if (typeof deserializedValue === 'object') {
            if (this.validSerializedBaseObjectReference(deserializedValue)) {
                return this.deserialize(deserializedValue);
            }
            else {
                return null;
            }
        }
        else return null;
    }
}
