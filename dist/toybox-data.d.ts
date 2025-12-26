import * as Core from "./toybox-core";
import * as Engine from "./toybox-engine";

export class LogService extends Core.Service
{
    Enabled: { [key: string]: boolean }
    RegisterCustomLog(type: string): void
    Out(message: string, data?: any, type?: string, method?: () => void): void
    Info(message: string, data?: any): void
    Error(message: string, data?: any): void
    Event(message: string, data?: any): void
    Warning(message: string, data?: any): void
}

export class HTTPService extends Core.Service
{
    Get(Url:string) : Promise<any>
    Delete(Url:string) : Promise<any>
    Post(Url:string, Body?:Object) : Promise<any>
    Update(Url:string, Body?:Object) : Promise<any>
}

export class SerializationService extends Core.Service
{
    CleanData(Data:any) : any
    DeserializeSceneObject(Data) : Engine.SceneObject
}

export as namespace Data;
