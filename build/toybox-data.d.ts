export class HTTP
{
    static Get(Url:string) : Promise<any>
    static Delete(Url:string) : Promise<any>
    static Post(Url:string, Body?:Object) : Promise<any>
    static Update(Url:string, Body?:Object) : Promise<any>
}

export class Reader
{
    static Read(FilePath:string): Promise<any>
}

export as namespace Data;