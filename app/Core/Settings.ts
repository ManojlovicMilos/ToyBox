export  { Settings, Quality };

const DATA_SERIALIZATION = "Data";
const RESOURCE_SERIALIZATION = "Resource";

enum Quality
{
    Low = 1,
    Medium = 2,
    High = 4,
}
class Settings
{
    public static Version: string = "0.2.1";
    public static LibPath: string = "Resources/";
    public static Graphics: Quality = Quality.High;
    public static IgnoreUICSS: boolean = true;
    public static GlobalFontScale: number = 1.0;
    public static GlobalFontFamily: string = "Arial";
    public static SerializationType: string = RESOURCE_SERIALIZATION;
}