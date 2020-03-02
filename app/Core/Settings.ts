export  { Settings };

enum SerializationType
{
    Data = "Data",
    Resource = "Resource"
}
enum GraphicsQuality
{
    Low = 1,
    Medium = 2,
    High = 4,
}
class DataSettings
{
    public LibPath: string = "Resources/";
    public SerializationType: SerializationType = SerializationType.Resource;
    public IgnoredPrefixes: string[] = [];
}
class GraphicsSettings
{
    public Quality: GraphicsQuality = GraphicsQuality.High;
}
class CollisionSettings
{
    public AdditionalSideCheck: boolean;
}
class MathematicsSettings
{
    public Collision: CollisionSettings = new CollisionSettings();
}
class UISettings
{
    public IgnoreUICSS: boolean = true;
    public GlobalFontScale: number = 1.0;
    public GlobalFontFamily: string = "Arial";
}
class Settings
{
    public static Version ="0.3.0";
    public static Data: DataSettings = new DataSettings();
    public static Graphics: GraphicsSettings = new GraphicsSettings();
    public static Mathematics: MathematicsSettings = new MathematicsSettings();
    public static UI: UISettings = new UISettings();
}