import BaseObject from "../BaseObject";

type Loader = (resource: BaseObject, status?: (progress: number) => {}) => Promise<BaseObject>;

export default Loader;
