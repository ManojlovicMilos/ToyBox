export { Settings, Quality };

enum Quality {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
}

const Settings = {
    Version: "0.3.0",
    Resources: "Resources/",
    Graphics: {
        Quality: Quality.High
    },
    UI: {
        IgnoreCSS: true,
        GlobalFontFamily: "Arial",
        GlobalFontScale: 1.0,
        GlobalFontScaleItchScale: 0.65,
        GlobalFontScaleItchException: true
    }
}
