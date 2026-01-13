import CreateUuid from './CreateUuid';
import Service from '../Services/Service';

const Injectable = (InjectionToken?: string) => {
  return <T extends (typeof Service)>(constructor: T) => {
    (constructor as (typeof Service)).InjectionToken = InjectionToken || CreateUuid();
    return constructor;
  };
}

export default Injectable;
