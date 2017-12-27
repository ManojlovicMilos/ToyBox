export  { Settings, Quality };

enum Quality
{
    Low = 1,
    Medium = 2,
    High = 4,
}
class Settings
{
    public static Version:string = "0.1.0";
    public static LibPath:string = "/Resources/";
    public static Graphics:Quality = Quality.High;
}