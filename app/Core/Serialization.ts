export {
    SerializedBaseObjectData,
    SerializedBaseObjectReference
}
import Log from "./Log";
import BaseObject from "./BaseObject";
import { TagCollection } from "./Tag";

type SerializedJSONbjectData = { [key: string]: SerializedJSONbjectData | string | number | boolean };
type SerializedObjectValueType = SerializedBaseObjectReference | SerializedJSONbjectData | string | number | boolean | null;
type SerializedBaseObjectData = { [key: string]: SerializedBaseObjectReference | TagCollection | SerializedJSONbjectData | string | number | boolean };
type SerializedBaseObjectReference = {
    type: string,
    data: SerializedBaseObjectData,
};

const EDITOR_PREFIX = "EDITOR_";
const TOYBOX_PREFIX = "TOYBOX_";

export default class Serialization {
    private static _Factories: { [key: string]: Function } = {};

    public static ValidSerializedBaseObjectReference(DataObject: Partial<SerializedBaseObjectReference>): boolean {
        if (!DataObject.type) return false;
        if (!DataObject.data) return false;
        return !!this._Factories[DataObject.type];
    }

    public static Register(type: string, Factory: Function): boolean {
        if (Serialization._Factories[type]) {
            Log.Warning("Unable to register factory, already registered.");
            return false;
        }
        Serialization._Factories[type] = Factory;
        return true;
    }

    public static Serialize(serialized: BaseObject): SerializedBaseObjectReference {
        return {
            type: serialized.type,
            data: {
                ...Serialization.SerializeInstanceData(serialized),
                Tags: Serialization.FilterTags(serialized.tags)
            }
        };
    }

    private static SerializeInstanceData(serialized: BaseObject): SerializedBaseObjectData {
        const Data: SerializedBaseObjectData = {};
        Object.keys(serialized).forEach(key => {
            const value: SerializedObjectValueType | null = this.SerializeInstanceDataValue(this[key]);
            if (value !== null) {
                Data[key] = value;
            }
        });
        return Data;
    }

    private static SerializeInstanceDataValue(serializedValue: BaseObject | TagCollection | object | string | number | boolean): SerializedObjectValueType {
        if (typeof serializedValue !== "function" && typeof serializedValue !== "object") {
            return serializedValue;
        } else if (typeof serializedValue === "object" && (serializedValue as object) instanceof BaseObject) {
            return Serialization.Serialize(serializedValue as BaseObject);
        } else if (typeof serializedValue === "object") {
            let Serialized: SerializedJSONbjectData = {};
            Object.keys(serializedValue).forEach(key => {
                const value: SerializedObjectValueType | null = this.SerializeInstanceDataValue(this[key]);
                if (value !== null) {
                    Serialized[key] = value;
                }
            });
            return Serialized;
        } else return null;
    }

    private static FilterTags(serializedTags: TagCollection): TagCollection {
        const FilteredTags: TagCollection = {};
        Object.keys(serializedTags).forEach(key => {
            if (!key.startsWith(EDITOR_PREFIX)
                && !key.startsWith(TOYBOX_PREFIX)) {
                FilteredTags[key] = serializedTags[key];
            }
        });
        return FilteredTags;
    }

    public static Deserialize(deserializedData: SerializedBaseObjectReference): BaseObject | null {
        let value: BaseObject | null;
        if (!!Serialization._Factories[deserializedData.type]) {
            value = Serialization._Factories[deserializedData.type]();
            Serialization.DeserializeInstanceData(value, deserializedData.data);
        }
        else {
            Log.Error(`Failed to Deserialize Object of Type: ${deserializedData.type}. Missing registered factory.`);
        }
        return value;
    }

    private static DeserializeInstanceData(deserialized: BaseObject, deserializedData: SerializedBaseObjectData): void {
        Object.keys(deserializedData).forEach(key => {
            const value: BaseObject | object | string | number | boolean | null = Serialization.DeserializeInstanceDataValue(deserialized[key]);
            if (value !== null) {
                deserialized[key] = value;
            }
        });
    }

    private static DeserializeInstanceDataValue(deserializedValue: SerializedBaseObjectReference | string | number | boolean): BaseObject | string | number | boolean | null {
        if (typeof deserializedValue !== "object" && typeof deserializedValue !== "function") return deserializedValue;
        if (typeof deserializedValue === "function") {
            Log.Warning("Invalid json object passed for deserialization. Data cannot contain functions.");
            return null;
        }
        else if (typeof deserializedValue === "object") {
            if (Serialization.ValidSerializedBaseObjectReference(deserializedValue)) {
                return Serialization.Deserialize(deserializedValue);
            }
            else {
                return null;
            }
        }
        else return null;
    }
}
