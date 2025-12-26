import Service from './Service';
import CreateUuid from '../Utilities/CreateUuid';
import TBXService from '../Utilities/TBXService';

@TBXService('TBX.UuidService')
class UuidService extends Service {
    public Create(): string {
        return CreateUuid();
    }
}

export default UuidService;
