import CreateUuid from './CreateUuid';
import Service from '../Services/Service';

const TBXService = (InjectionToken?: string) => {
  return <T extends (typeof Service)>(constructor: T) => {
    (constructor as (typeof Service)).InjectionToken = InjectionToken || CreateUuid();
    return constructor;
  };
}

export default TBXService;
