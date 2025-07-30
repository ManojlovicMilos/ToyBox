import BaseObject from "../BaseObject";

type Loader = (resource: BaseObject) => Promise<BaseObject>;

export default Loader;
