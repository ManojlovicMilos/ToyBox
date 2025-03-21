const TOYBOX_PREFIX = 'TBX: ';
const MESSAGE_TEXT_INFO = 'Info';
const MESSAGE_TEXT_ERROR = 'Error';
const MESSAGE_TEXT_WARNING = 'Warning';
const MESSAGE_TEXT_EVENT = 'Event';
const MESSAGE_TEXT_DEFAULT = 'Message';

export default class Log {
    public static enabled: { [key: string]: boolean } = {
        Global: true,
        Info: true,
        Error: true,
        Event: true,
    }

    public static RegisterCustomLog(type: string): void {
        this.enabled[type] = true;
    }

    public static Out(message: string, data?: any, type?: string, method?: () => void): void {
        if (!this.enabled.Global) return;
        if (!this.enabled[type]) return;
        const logMethod = method || console.log;
        logMethod(" - - - ");
        if (type) logMethod(TOYBOX_PREFIX + type);
        else logMethod(TOYBOX_PREFIX + MESSAGE_TEXT_DEFAULT);
        logMethod(message);
        if (data) logMethod(data);
        logMethod(" - - - ");
    };

    public static Info(message: string, data?: any): void {
        this.Out(message, data, MESSAGE_TEXT_INFO, console.info);
    };

    public static Error(message: string, data?: any): void {
        this.Out(message, data, MESSAGE_TEXT_ERROR, console.error);
    };

    public static Warning(message: string, data?: any): void {
        this.Out(message, data, MESSAGE_TEXT_WARNING, console.warn);
    };

    public static Event(message: string, data?: any): void {
        this.Out(message, data, MESSAGE_TEXT_EVENT, console.info);
    };
}
