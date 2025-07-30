import Service from "./Service";

const TOYBOX_PREFIX = 'TBX: ';
const MESSAGE_TEXT_INFO = 'Info';
const MESSAGE_TEXT_ERROR = 'Error';
const MESSAGE_TEXT_EVENT = 'Event';
const MESSAGE_TEXT_WARNING = 'Warning';
const MESSAGE_TEXT_DEFAULT = 'Message';

export default class LogService extends Service {
    public enabled: { [key: string]: boolean } = {
        global: true,
        info: true,
        error: true,
        event: true,
    }

    public registerCustomLog(type: string): void {
        this.enabled[type.toLowerCase()] = true;
    }

    public out(message: string, data?: any, type?: string, method?: () => void): void {
        if (!this.enabled.Global) return;
        if (!this.enabled[type.toLowerCase()]) return;
        const logMethod = method || console.log;
        logMethod(" - - - ");
        if (type) logMethod(TOYBOX_PREFIX + type);
        else logMethod(TOYBOX_PREFIX + MESSAGE_TEXT_DEFAULT);
        logMethod(message);
        if (data) logMethod(data);
        logMethod(" - - - ");
    };

    public info(message: string, data?: any): void {
        this.out(message, data, MESSAGE_TEXT_INFO, console.info);
    };

    public error(message: string, data?: any): void {
        this.out(message, data, MESSAGE_TEXT_ERROR, console.error);
    };

    public event(message: string, data?: any): void {
        this.out(message, data, MESSAGE_TEXT_EVENT, console.info);
    };

    public warning(message: string, data?: any): void {
        this.out(message, data, MESSAGE_TEXT_WARNING, console.warn);
    };
}
