import Service from './Service'

export class InjectionManager {
    private static rootServices: { [key: string]: Service }

    public static getService(service: typeof Service): Service {
        const name = service.name;
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

const inject = <T>(service: typeof Service): T => InjectionManager.getService(service) as T;

const registerService = <T>(service: typeof Service, forAbstract?: typeof Service): boolean => InjectionManager.registerService(service, forAbstract);

export { registerService }

export default inject;
