export { Settings, Quality };
import Service from '../Services/Service';
import DefaultSettings from './DefaultSettings.json';

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
    engine: {
        useResourceReferenceOnDuplication: boolean,
    },
    ui: {
        ignoreCSS: boolean,
        globalFontFamily: string,
        globalFontScale: number,
        globalFontScaleItchScale: number,
        globalFontScaleItchException: boolean,
    },
}

export default class Settings extends Service {
    public active: SettingsObject = DefaultSettings as SettingsObject;

    public constructor() {
        super();
    }

    public apply(customSettings: Partial<SettingsObject>): void {
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
                engine: {
                    ...this.active.engine,
                    ...customSettings.engine,
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
