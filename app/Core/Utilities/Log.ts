import Inject from '../Services/InjectionManager';
import LogService from '../Services/LogService';

const Log = (Message: string, Data?: any, Type?: string) => {
    const logService: LogService = Inject(LogService);
    if (logService) {
        logService.Out(Message, Data, Type);
    }
};

export default Log;
