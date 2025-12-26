export enum Quality
{
    Low = 1,
    Medium = 2,
    High = 4,
}

export class Settings
{
    static Version:string;
    static LibPath:string;
    static Graphics:Quality;
    static EngineUIStyle:boolean;
    static GlobalFontScale:number;
    static GlobalFontFamily:string;
    static GlobalLineHeightFactor:number;
}

export class Service {}

export function Inject<T>(service: typeof Service): T;

export function TBXService(InjectionToken?: string);

export function CreateUuid(): string;

export class UuidService extends Service
{
    Create() : string
}

export as namespace Core;
