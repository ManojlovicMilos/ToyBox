import Resource from "./Resource";

type Loader = (resource: Resource) => Promise<Resource>;

export default Loader;
