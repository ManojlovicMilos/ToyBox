import Resource from "./Resource";
import Service from "../Services/Service";

class ResourceService extends Service {
    private resourceData: { [key: string]: unknown }

    public constructor() {
        super();
    }
}

export default ResourceService;
