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
let Settings: any =
{
    Version: "0.3.0",
    Data:
    {
        LibPath: "Resources/"
    },
    Graphics:
    {
        Quality: GraphicsQuality.High
    },
    Mathematics:
    {
        Collision:
        {
            AdditionalSideCheck: true
        }
    },
    UI:
    {
        IgnoreUICSS: true,
        GlobalFontScale: 1.0,
        GlobalFontFamily: "Arial",
        SerializationType: SerializationType.Resource
    },
    GraphicsQuality,
    SerializationType
}