import Service from './Service';
import BaseObject from '../Objects/BaseObject';
import Injectable from '../Utilities/Injectable';

@Injectable('TBX.FactoryService')
class FactoryService extends Service {
    private _Factories: { [Type: string]: () => BaseObject };

    public constructor() {
        super();
        this._Factories = {};
    }

    public Create<T extends BaseObject>(Type: typeof BaseObject): T {
        if (this._Factories[Type.TypeNameToken]) {
            return this._Factories[Type.TypeNameToken]() as T;
        }
    }

    public Register(Type: typeof BaseObject, Factory: () => BaseObject): void {
        this._Factories[Type.TypeNameToken] = Factory;
    }
}

export default FactoryService;
