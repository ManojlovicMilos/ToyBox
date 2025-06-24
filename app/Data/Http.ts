import * as Core from '../Core/Core';

enum RequestType {
    Get = 'GET',
    Post = 'POST',
    Update = 'PUT',
    Delete = 'DELETE'
}

export type HTTPContentBody = { [key: string]: string | number | boolean | object };

export default class HTTP extends Core.Service {
    private serialization: Core.Serialization;

    public constructor() {
        super();
        this.serialization = Core.inject(Core.Serialization);
    }

    public get<T>(url: string): Promise<T> {
        return this.request<T>(RequestType.Get, url);
    }

    public delete(url: string): Promise<boolean> {
        return this.request<boolean>(RequestType.Delete, url);
    }

    public post<T>(url: string, body?: Core.BaseObject): Promise<T> {
        return this.request<T>(RequestType.Post, url, body);
    }

    public update<T>(url: string, body?: Partial<T>): Promise<T> {
        return this.request<T>(RequestType.Update, url, body as unknown as Core.BaseObject);
    }
    
    private request<T>(type: RequestType, url: string, body?: Core.BaseObject): Promise<T> {
        return fetch(url, {
            method: type,
            body: this.serialization.json(body),
        })
        .then((response: Response) => response.json());
    }
}
