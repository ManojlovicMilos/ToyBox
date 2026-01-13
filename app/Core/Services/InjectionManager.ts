import Service from './Service'

export class InjectionManager {
    private static rootServices: { [key: string]: Service }

    public static Exists(InjectedService: typeof Service): boolean {
        return !!this.rootServices[InjectedService.InjectionToken];
    }

    public static GetService(InjectedService: typeof Service): Service {
        const InjectionToken = InjectedService.InjectionToken;
        if (!this.rootServices) {
            this.rootServices = {};
        }
        if (this.rootServices[InjectionToken]) {
            return this.rootServices[InjectionToken];
        } else {
            this.RegisterService(InjectedService);
            return this.rootServices[InjectionToken];
        }
    }

    public static RegisterService(InjectedService: typeof Service, ForAbstract?: typeof Service): boolean {
        const InjectionToken: string = ForAbstract?.InjectionToken || InjectedService.InjectionToken;
        if (!this.rootServices) {
            this.rootServices = {};
        }
        if (this.rootServices[InjectionToken]) {
            return false;
        } else {
            this.rootServices[InjectionToken] = new InjectedService();
            return true;
        }
    }
}

const Inject = <T>(InjectedService: typeof Service): T => InjectionManager.GetService(InjectedService) as T;

const RegisterService = <T>(InjectedService: typeof Service, ForAbstract?: typeof Service): boolean => InjectionManager.RegisterService(InjectedService, ForAbstract);

export { RegisterService }

export default Inject;
