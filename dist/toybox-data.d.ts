import * as Core from "./toybox-core";
import * as Engine from "./toybox-engine";

export class HTTPService extends Core.Service {
    Get(Url: string): Promise<any>
    Delete(Url: string): Promise<any>
    Post(Url: string, Body?: Object): Promise<any>
    Update(Url: string, Body?: Object): Promise<any>
}

export as namespace Data;
