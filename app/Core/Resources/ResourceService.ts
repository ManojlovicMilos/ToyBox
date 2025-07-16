import Resource from './Resource';
import BaseObject from '../BaseObject';
import Service from '../Services/Service';

export default class ResourceService extends Service {
    private resources: { [key: string]: Resource }

    public constructor() {
        super();
    }

    public get(key: string): Resource {
        return this.resources[key];
    }

    public new(key: string): Resource {
        return this.resources[key].duplicate();
    }

    public set(key: string, data: BaseObject): void {
        if (this.resources[key]) {
            return;
        }
        this.resources[key] = data;
    }
    
    public exists(key: string): boolean {
        return this.resources[key] != null;
    }
}
