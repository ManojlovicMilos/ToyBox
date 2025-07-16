import BaseObject from "../BaseObject";

export default class Resource extends BaseObject {
    constructor() {
        super();
        this.registerType(Resource);
    }
}
