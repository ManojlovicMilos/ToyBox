export  { Log };

class Log
{
    public static LogPrint:boolean = true;
    public static LogInfo:boolean = false;
    public static LogError:boolean = true;
    public static LogWarning:boolean = true;
    public static LogEvent:boolean = false;
    public static Print(Message:any)
    {
        if(!Log.LogPrint) return;
        console.log(" - - - ");
        console.info("Toybox: Message");
        console.info(Message);
        console.log(" - - - ");
    };
    public static Info(Message:any)
    {
        if(!Log.LogInfo) return;
        console.log(" - - - ");
        console.info("Toybox: Info");
        console.info(Message);
        console.log(" - - - ");
    };
    public static Error(Message:any)
    {
        if(!Log.LogError) return;
        console.log(" - - - ");
        console.error("Toybox: Error");
        console.error(Message);
        console.log(" - - - ");
    };
    public static Warning(Message:any)
    {
        if(!Log.LogWarning) return;
        console.log(" - - - ");
        console.warn("Toybox: Warning");
        console.warn(Message);
        console.log(" - - - ");
    };
    public static Event(Message:any)
    {
        if(!Log.LogEvent) return;
        console.log(" - - - ");
        console.info("Toybox: Event");
        console.info(Message);
        console.log(" - - - ");
    };
}