export { Settings, Quality };

enum Quality
{
    Low = 1,
    Medium = 2,
    High = 4,
}
const Settings = {
    Version: "0.2.3",
    Resources: "Resources/",
    Graphics:
    {
        Quality: Quality.High
    },
    UI:
    {
        IgnoreCSS: true,
        GlobalFontFamily: "Arial",
        GlobalFontScale: 1.0,
        GlobalFontScaleItchScale: 0.65,
        GlobalFontScaleItchException: true
    }
}
