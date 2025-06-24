export enum InjectionType {
    Root = 'Root',
    Instance = 'Instance'
}

export default class Service {
    public static injectionType: InjectionType = InjectionType.Root;

    public constructor() {}
}
