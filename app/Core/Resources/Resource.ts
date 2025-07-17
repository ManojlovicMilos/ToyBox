import { inject } from "../Core";
import BaseObject from "../BaseObject";
import Settings from "../Settings/Settings";

export default class Resource extends BaseObject {
    private settings: Settings;
    protected useReferenceOnDuplication: boolean;

    constructor(old?: Resource) {
        super(old);
        this.registerType(Resource);
        this.settings = inject(Settings);
        this.useReferenceOnDuplication = this.settings.active.engine.useResourceReferenceOnDuplication;
    }

    public duplicate(): Resource {
        if (this.useReferenceOnDuplication) {
            return this;
        } else {
            return new Resource(this);
        }
    }
}
