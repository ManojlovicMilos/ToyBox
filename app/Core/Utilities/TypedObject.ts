import BaseObject from '../Objects/BaseObject';

const TypedObject = (TypeNameToken: string) => {
  return <T extends (typeof BaseObject)>(constructor: T) => {
    (constructor as (typeof BaseObject)).TypeNameToken = TypeNameToken;
    return constructor;
  };
}

export default TypedObject;
