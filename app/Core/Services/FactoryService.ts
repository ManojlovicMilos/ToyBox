import Log from './Log';
import Service from './Service';
import BaseObject from '../BaseObject';
import inject from './InjectionManager';

class FactoryService extends Service {
    private log: Log;
    private factories: { [key: string]: Function } = {};

    public constructor() {
        super();
        this.log = inject(Log);
    }

    public exists(type: string): boolean {
        return !!this.factories[type];
    }

    public create<T extends BaseObject>(type: string): T {
        return this.factories[type]();
    }

    public register(type: string, Factory: Function): boolean {
        if (this.factories[type]) {
            this.log.warning('Unable to register factory, already registered.');
            return false;
        }
        this.factories[type] = Factory;
        return true;
    }
}

const create = <T extends BaseObject>(type: string): T => {
    let service = inject<FactoryService>(FactoryService);
    return service.create(type);
};

const registerFactory = (type: string, factory: Function): boolean => {
    let service = inject<FactoryService>(FactoryService);
    return service.register(type, factory);
};

export { create, registerFactory };

export default FactoryService;
