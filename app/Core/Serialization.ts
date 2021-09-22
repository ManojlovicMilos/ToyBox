export {
    Serialization,
    SerializedBaseObjectData,
    SerializedBaseObjectReference
}

import { Log } from "./Log";
import {
    BaseObject,
    TagCollection,
} from "./BaseObject";

type SimpleObject = { [key: string]: SimpleObject | string | number | boolean }
type SerializedBaseObjectData = { [key: string]: SerializedBaseObjectReference | TagCollection | string | number | boolean }
type SerializedBaseObjectReference = {
    Type: string,
    Data: SerializedBaseObjectData
}

const EDITOR_PREFIX = "EDITOR_";
const TOYBOX_PREFIX = "TOYBOX_";
const MESSAGE_GROUP = "Serialization";

class Serialization
{
    private static _Factories: { [key: string]: Function } = {};
    public static ValidType(Type: string): boolean
    {
        return !!this._Factories[Type];
    }
    public static Register(Type: string, Factory: Function): boolean
    {
        if (Serialization._Factories[Type])
        {
            Log.Warning("Unable to register factory, already registered.", Type, MESSAGE_GROUP);
            return false;
        }
        Serialization._Factories[Type] = Factory;
        return true;
    }
    public static Serialize(SO: BaseObject): SerializedBaseObjectReference
    {
        return {
            Type: SO.Type,
            Data: {
                ...Serialization.SerializeInstanceData(SO),
                Tags: Serialization.FilterTags(SO.Tags)
            }
        };
    }
    private static SerializeInstanceData(SO: BaseObject): SerializedBaseObjectData
    {
        const Data: SerializedBaseObjectData = { };
        Object.keys(this).forEach(Key =>
        {
            const Value: SerializedBaseObjectReference | string | number | boolean | null = this.SerializeInstanceDataValue(this[Key]);
            if (Value !== null)
            {
                Data[Key] = Value;
            }
        });
        return Data;
    }
    private static SerializeInstanceDataValue(SOValue: BaseObject | TagCollection | string | number | boolean): SerializedBaseObjectReference | string | number | boolean | null
    {
        if (typeof SOValue !== "function" && typeof SOValue !== "object") return SOValue; 
        else if (typeof SOValue === "object" && (SOValue as object) instanceof BaseObject)
        {
            return Serialization.Serialize(SOValue as BaseObject);
        }
        else return null;
    }
    private static FilterTags(SOTags: TagCollection): TagCollection
    {
        const FilteredTags: TagCollection = {};
        Object.keys(SOTags).forEach(Key =>
        {
            if (!Key.startsWith(EDITOR_PREFIX)
                && !Key.startsWith(TOYBOX_PREFIX))
            {
                FilteredTags[Key] = SOTags[Key];
            }
        });
        return FilteredTags;
    }
    public static Deserialize(DSOData: SerializedBaseObjectReference): BaseObject
    {
        let Value: BaseObject;
        if (!!Serialization._Factories[DSOData.Type])
        {
            Value = Serialization._Factories[DSOData.Type]();
        }
        else
        {
            Log.Warning("Unable to find factory, falling back to BaseObject.", DSOData.Type, MESSAGE_GROUP);
            Value = new BaseObject();
        }
        Serialization.DeserializeInstanceData(Value, DSOData.Data);
        return Value;
    }
    private static DeserializeInstanceData(DSO: BaseObject, DSOData: SerializedBaseObjectData): void
    {
        Object.keys(DSOData).forEach(Key =>
        {
            const Value: BaseObject | object | string | number | boolean | null = Serialization.DeserializeInstanceDataValue(DSO[Key]);
            if (Value !== null)
            {
                DSO[Key] = Value;
            }
        });
    }
    private static DeserializeInstanceDataValue(DSOValue: SerializedBaseObjectReference | string | number | boolean): BaseObject | string | number | boolean | null
    {
        if (typeof DSOValue !== "object" && typeof DSOValue !== "function") return DSOValue;
        if (typeof DSOValue === "function")
        {
            Log.Warning("Invalid json object passed for deserialization. Data cannot contain function", DSOValue, MESSAGE_GROUP);
            return null;
        }
        else if (typeof DSOValue === "object")
        {
            if (Serialization.ValidType((DSOValue as SerializedBaseObjectReference).Type))
            {
                return Serialization.Deserialize(DSOValue);
            }
            else
            {
                return null;
            }
        }
        else return null;
    }
}
