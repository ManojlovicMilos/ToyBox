import Service, { InjectionType } from './Service'

export class InjectionManager {
    private static rootServices: { [key: string]: object }

    public static getService(service: typeof Service): object {
        const name = service.name;
        if (service.injectionType === InjectionType.Instance) {
            return new service();
        }
        if (!this.rootServices) {
            this.rootServices = {};
        }
        if (this.rootServices[name]) {
            return this.rootServices[name];
        } else {
            this.registerService(service);
            return this.rootServices[name];
        }
    }

    public static registerService(service: typeof Service, forAbstract?: typeof Service): boolean {
        const registerName: string = forAbstract?.name || service.name;
        if (!this.rootServices) {
            this.rootServices = {};
        }
        if (this.rootServices[registerName]) {
            return false;
        } else {
            this.rootServices[registerName] = new service();
            return true;
        }
    }
}

const inject = <T>(service: typeof Service) => {
    return InjectionManager.getService(service) as T;
}

export default inject;
