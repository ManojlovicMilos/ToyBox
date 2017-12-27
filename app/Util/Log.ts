export  { Log };

class Log
{
    public static LogPrint:boolean = true;
    public static LogInfo:boolean = false;
    public static LogError:boolean = true;
    public static LogWarning:boolean = true;
    public static LogEvent:boolean = false;
    public static Print(Message:any) : void
    {
        if(!Log.LogPrint) return;
        console.log(" - - - ");
        console.info("ToyBox: Message");
        console.info(Message);
        console.log(" - - - ");
    };
    public static Info(Message:any) : void
    {
        if(!Log.LogInfo) return;
        console.log(" - - - ");
        console.info("ToyBox: Info");
        console.info(Message);
        console.log(" - - - ");
    };
    public static Error(Message:any) : void
    {
        if(!Log.LogError) return;
        console.log(" - - - ");
        console.error("ToyBox: Error");
        console.error(Message);
        console.log(" - - - ");
    };
    public static Warning(Message:any) : void
    {
        if(!Log.LogWarning) return;
        console.log(" - - - ");
        console.warn("ToyBox: Warning");
        console.warn(Message);
        console.log(" - - - ");
    };
    public static Event(Message:any) : void
    {
        if(!Log.LogEvent) return;
        console.log(" - - - ");
        console.info("ToyBox: Event");
        console.info(Message);
        console.log(" - - - ");
    };
}