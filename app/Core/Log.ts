export { Log };

class Log {
    public static Enabled: { [key: string]: boolean } = {
        Global: true,
        Info: true,
        Error: true,
        Event: true,
    }

    public static RegisterCustomLog(Type: string): void {
        this.Enabled[Type] = true;
    }

    public static Out(Message: string, Data?: any, Type?: string, Method?: () => void): void {
        if (!this.Enabled.Global) return;
        if (!this.Enabled[Type]) return;
        const LogMethod = Method || console.log;
        LogMethod(" - - - ");
        if (Type) LogMethod("TBX: " + Type);
        else LogMethod("TBX: Message");
        LogMethod(Message);
        if (Data) LogMethod(Data);
        LogMethod(" - - - ");
    };

    public static Info(Message: string, Data?: any): void {
        this.Out(Message, Data, 'Info', console.info);
    };

    public static Error(Message: string, Data?: any): void {
        this.Out(Message, Data, 'Error', console.error);
    };

    public static Warning(Message: string, Data?: any): void {
        this.Out(Message, Data, 'Warning', console.warn);
    };

    public static Event(Message: string, Data?: any): void {
        this.Out(Message, Data, 'Event', console.info);
    };
}
