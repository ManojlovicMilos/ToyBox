export { Settings, Quality };
import DefaultSettings from './Data/DefaultSettings.json';

enum Quality {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
}

export type SettingsObject = {
    version: string,
    resources: {
        url: string,
    }
    math: {
        collision: {
            additionalSideCheck: boolean,
        }
    },
    graphics: {
        quality: Quality,
    },
    ui: {
        ignoreCSS: boolean,
        globalFontFamily: string,
        globalFontScale: number,
        globalFontScaleItchScale: number,
        globalFontScaleItchException: boolean,
    },
}

export default class Settings {
    public static active: SettingsObject = DefaultSettings as SettingsObject;

    public static Apply(customSettings: Partial<SettingsObject>): void {
        if (this.active.version === customSettings.version) {
            this.active = {
                version: this.active.version,
                resources: {
                    ...this.active.resources,
                    ...customSettings.resources,
                },
                math: {
                    ...this.active.math,
                    ...customSettings.math,
                },
                graphics: {
                    ...this.active.graphics,
                    ...customSettings.graphics,
                },
                ui: {
                    ...this.active.ui,
                    ...customSettings.ui,
                }
            }
        }
    }
}
