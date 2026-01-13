import Service from './Service';
import CreateUuid from '../Utilities/CreateUuid';
import Injectable from '../Utilities/Injectable';

@Injectable('TBX.UuidService')
class UuidService extends Service {
    public Create(): string {
        return CreateUuid();
    }
}

export default UuidService;
