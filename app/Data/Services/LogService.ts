import * as Core from '../../Core/Core';

const TOYBOX_PREFIX = 'TBX: ';
const MESSAGE_TEXT_INFO = 'Info';
const MESSAGE_TEXT_ERROR = 'Error';
const MESSAGE_TEXT_EVENT = 'Event';
const MESSAGE_TEXT_WARNING = 'Warning';
const MESSAGE_TEXT_DEFAULT = 'Message';

@Core.TBXService('TBX.LogService')
export default class LogService extends Core.Service {
    public Enabled: { [key: string]: boolean } = {
        global: true,
        info: true,
        error: true,
        event: false,
    }

    public RegisterCustomLog(type: string): void {
        this.Enabled[type.toLowerCase()] = true;
    }

    public Out(message: string, data?: any, type?: string, method?: () => void): void {
        if (!this.Enabled.global) return;
        if (!this.Enabled[type.toLowerCase()]) return;
        const logMethod = method || console.log;
        logMethod(" - - - ");
        if (type) logMethod(TOYBOX_PREFIX + type);
        else logMethod(TOYBOX_PREFIX + MESSAGE_TEXT_DEFAULT);
        logMethod(message);
        if (data) logMethod(data);
        logMethod(" - - - ");
    };

    public Info(message: string, data?: any): void {
        this.Out(message, data, MESSAGE_TEXT_INFO, console.info);
    };

    public Error(message: string, data?: any): void {
        this.Out(message, data, MESSAGE_TEXT_ERROR, console.error);
    };

    public Event(message: string, data?: any): void {
        this.Out(message, data, MESSAGE_TEXT_EVENT, console.info);
    };

    public Warning(message: string, data?: any): void {
        this.Out(message, data, MESSAGE_TEXT_WARNING, console.warn);
    };
}
