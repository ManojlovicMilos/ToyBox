import Service from './Service'

export class InjectionManager {
    private static rootServices: { [key: string]: Service }

    public static Exists(service: typeof Service): boolean {
        return !!this.rootServices[service.InjectionToken];
    }

    public static GetService(service: typeof Service): Service {
        const InjectionToken = service.InjectionToken;
        if (!this.rootServices) {
            this.rootServices = {};
        }
        if (this.rootServices[InjectionToken]) {
            return this.rootServices[InjectionToken];
        } else {
            this.RegisterService(service);
            return this.rootServices[InjectionToken];
        }
    }

    public static RegisterService(service: typeof Service, forAbstract?: typeof Service): boolean {
        const InjectionToken: string = forAbstract?.InjectionToken || service.InjectionToken;
        if (!this.rootServices) {
            this.rootServices = {};
        }
        if (this.rootServices[InjectionToken]) {
            return false;
        } else {
            this.rootServices[InjectionToken] = new service();
            return true;
        }
    }
}

const Inject = <T>(service: typeof Service): T => InjectionManager.GetService(service) as T;

const RegisterService = <T>(service: typeof Service, forAbstract?: typeof Service): boolean => InjectionManager.RegisterService(service, forAbstract);

export { RegisterService }

export default Inject;
