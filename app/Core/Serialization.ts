export { Serialization }

import { Settings } from "./Settings";
import { Resources } from "./Resources";
import { BaseObject } from "./BaseObject";

const DATA_SERIALIZATION = "Data";
const RESOURCE_SERIALIZATION = "Resource";

class Serialization
{
    private static _Factories: { [key: string]:Function } = { };
    public static Register(Type:string, Factory:Function) : boolean
    {
        if(Serialization._Factories[Type]) return false;
        Serialization._Factories[Type] = Factory;
        return true;
    }
    public static Deserialize(Data:any) : BaseObject
    {
        if(Data.Serialization == RESOURCE_SERIALIZATION && Resources.All.Exists(Data.Key))
        {
            return Resources.All.New(Data.Key);
        }
        let Value:BaseObject = Serialization._Factories[Data.Type]();
        Value.Deserialize(Data);
        if(Data.Serialization == RESOURCE_SERIALIZATION)
        {
            Resources.All.Set(Data.Key, Value.Copy());
        }
        return Value;
    }
    public static Serialize(Data:BaseObject) : any
    {
        let Package:any =
        {
            Name: Data.Name,
            Type: Data.Type,
            Serialization: Settings.SerializationType
        };
        if(Settings.SerializationType != RESOURCE_SERIALIZATION) Package.Data = Data.Serialize();
        else Package.Key = Data.ResourceKey;
        return Package;
    }
}