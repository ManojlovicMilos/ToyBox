export {
    Serialization,
    SerializedBaseObjectData,
    SerializedBaseObjectReference
}
import {
    BaseObject,
    TagCollection,
} from "./BaseObject";
import { Log } from "./Log";

type SerializedJSObjectData = { [key: string]: SerializedJSObjectData | string | number | boolean };
type SerializedObjectValueType = SerializedBaseObjectReference | SerializedJSObjectData | string | number | boolean | null;
type SerializedBaseObjectData = { [key: string]: SerializedBaseObjectReference | TagCollection | SerializedJSObjectData | string | number | boolean };
type SerializedBaseObjectReference = {
    Type: string,
    Data: SerializedBaseObjectData,
};

const EDITOR_PREFIX = "EDITOR_";
const TOYBOX_PREFIX = "TOYBOX_";

class Serialization {
    private static _Factories: { [key: string]: Function } = {};

    public static ValidSerializedBaseObjectReference(DataObject: Partial<SerializedBaseObjectReference>): boolean {
        if (!DataObject.Type) return false;
        if (!DataObject.Data) return false;
        return !!this._Factories[DataObject.Type];
    }

    public static Register(Type: string, Factory: Function): boolean {
        if (Serialization._Factories[Type]) {
            Log.Warning("Unable to register factory, already registered.");
            return false;
        }
        Serialization._Factories[Type] = Factory;
        return true;
    }

    public static Serialize(SO: BaseObject): SerializedBaseObjectReference {
        return {
            Type: SO.Type,
            Data: {
                ...Serialization.SerializeInstanceData(SO),
                Tags: Serialization.FilterTags(SO.Tags)
            }
        };
    }

    private static SerializeInstanceData(SO: BaseObject): SerializedBaseObjectData {
        const Data: SerializedBaseObjectData = {};
        Object.keys(SO).forEach(Key => {
            const Value: SerializedObjectValueType | null = this.SerializeInstanceDataValue(this[Key]);
            if (Value !== null) {
                Data[Key] = Value;
            }
        });
        return Data;
    }

    private static SerializeInstanceDataValue(SOValue: BaseObject | TagCollection | object | string | number | boolean): SerializedObjectValueType {
        if (typeof SOValue !== "function" && typeof SOValue !== "object") {
            return SOValue;
        } else if (typeof SOValue === "object" && (SOValue as object) instanceof BaseObject) {
            return Serialization.Serialize(SOValue as BaseObject);
        } else if (typeof SOValue === "object") {
            let Serialized: SerializedJSObjectData = {};
            Object.keys(SOValue).forEach(Key => {
                const Value: SerializedObjectValueType | null = this.SerializeInstanceDataValue(this[Key]);
                if (Value !== null) {
                    Serialized[Key] = Value;
                }
            });
            return Serialized;
        } else return null;
    }

    private static FilterTags(SOTags: TagCollection): TagCollection {
        const FilteredTags: TagCollection = {};
        Object.keys(SOTags).forEach(Key => {
            if (!Key.startsWith(EDITOR_PREFIX)
                && !Key.startsWith(TOYBOX_PREFIX)) {
                FilteredTags[Key] = SOTags[Key];
            }
        });
        return FilteredTags;
    }

    public static Deserialize(DSOData: SerializedBaseObjectReference): BaseObject | null {
        let Value: BaseObject | null;
        if (!!Serialization._Factories[DSOData.Type]) {
            Value = Serialization._Factories[DSOData.Type]();
            Serialization.DeserializeInstanceData(Value, DSOData.Data);
        }
        else {
            Log.Error(`Failed to Deserialize Object of Type: ${DSOData.Type}. Missing registered factory.`);
        }
        return Value;
    }

    private static DeserializeInstanceData(DSO: BaseObject, DSOData: SerializedBaseObjectData): void {
        Object.keys(DSOData).forEach(Key => {
            const Value: BaseObject | object | string | number | boolean | null = Serialization.DeserializeInstanceDataValue(DSO[Key]);
            if (Value !== null) {
                DSO[Key] = Value;
            }
        });
    }

    private static DeserializeInstanceDataValue(DSOValue: SerializedBaseObjectReference | string | number | boolean): BaseObject | string | number | boolean | null {
        if (typeof DSOValue !== "object" && typeof DSOValue !== "function") return DSOValue;
        if (typeof DSOValue === "function") {
            Log.Warning("Invalid json object passed for deserialization. Data cannot contain functions.");
            return null;
        }
        else if (typeof DSOValue === "object") {
            if (Serialization.ValidSerializedBaseObjectReference(DSOValue)) {
                return Serialization.Deserialize(DSOValue);
            }
            else {
                return null;
            }
        }
        else return null;
    }
}
