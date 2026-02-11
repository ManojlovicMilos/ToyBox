import CreateUuid from "../Utilities/CreateUuid";
import Inject from "../Services/InjectionManager";
import FactoryService from "../Services/FactoryService";

class BaseObject {
    public static TypeNameToken: string = 'TBX.BaseObject';

    protected _ID: string;
    protected _Name: string;
    protected ChildrenMap: { [ChildID: string]: BaseObject }

    public Types: string[];
    public Children: BaseObject[];
    public Parent: BaseObject | null;
    public Data: { [key: string]: any };
    
    public get ID(): string { return this._ID; }
    public get Name() { return this._Name; }
    public set Name(value: string) { this._Name = value; }
    public get Type(): string { return this.Types[this.Types.length - 1]; }

    public constructor(Old?: BaseObject) {
        this.Types = [BaseObject.TypeNameToken];
        this._ID = CreateUuid();
        this._Name = Old?._Name || this.ID;
        this.Children = Old?.Children.map((child: BaseObject) => child.Copy()) || [];
        this.ChildrenMap = {};
        if (Old) {
            this.Children.forEach((entry: BaseObject) => this.ChildrenMap[entry.ID] = entry);
        }
        this.Data = Old ? {...Old.Data} : {};
    }

    // virtual
    public Copy(): BaseObject {
        return this;
    }

    public Is(Type: string): boolean
    public Is(Type: typeof BaseObject): boolean
    public Is(Type: string | typeof BaseObject): boolean {
        const typeName = typeof Type === 'string' ? Type : Type.TypeNameToken;
        return this.Types.includes(typeName);
    }

    public IsExactly(Type: string): boolean
    public IsExactly(Type: typeof BaseObject): boolean
    public IsExactly(Type: string | typeof BaseObject): boolean {
        const typeName = typeof Type === 'string' ? Type : Type.TypeNameToken;
        return this.Type === typeName;
    }

    public IsAnyOf(Types: string[]): boolean
    public IsAnyOf(Types: (typeof BaseObject)[]): boolean
    public IsAnyOf(Types: string[] | (typeof BaseObject)[]): boolean {
        return Types.filter((type: string | typeof BaseObject) => this.Is(type as string)).length > 0;
    }

    public HasData(DataQuery: string, ValueQuery?: any): boolean {
        return !!this.Data[DataQuery] && (!ValueQuery || this.Data[DataQuery] === ValueQuery);
    }

    public HasMultipleData(DataQueries: string[]): boolean {
        for (let i in DataQueries) {
            if (this.Data[DataQueries[i]] != null) return true;
        }
        return false;
    }

    public Attach(Child: BaseObject): void {
        if (Child.Parent) {
            Child.Parent.Remove(Child);
        }
        this.Children.push(Child);
        this.ChildrenMap[Child.ID] = Child;
        Child.Parent = this;
        this.OnAttachChild(Child);
        Child.OnAttach(this);
    }

    public Remove(Child: string): void
    public Remove(Child: BaseObject): void
    public Remove(Child: string | BaseObject): void {
        const childId = typeof Child === 'string' ? Child : Child.ID;
        if (this.ChildrenMap[childId]) {
            this.ChildrenMap[childId].Parent = null;
            this.ChildrenMap[childId].OnRemove(this);
        }
        this.Children = this.Children.filter((child: BaseObject) => child.ID !== childId);
        this.ChildrenMap[childId] = undefined;
        this.OnRemoveChild(childId);
    }

    public HasChild(ChildID: string): boolean {
        return !!this.ChildrenMap[ChildID]
    }

    public FindChild<T extends BaseObject>(ChildID: string): T | undefined {
        return this.ChildrenMap[ChildID] as T;
    }

    public FindChildByName<T extends BaseObject>(Name: string): T | undefined {
        return this.Children.find((Child: BaseObject) => Child.Name === Name) as T;
    }

    public FindChildrenByType<T extends BaseObject>(Type: string | typeof BaseObject): T[] {
        const typeName = typeof Type === 'string' ? Type : Type.TypeNameToken;
        return this.Children.filter(item => item.Is(typeName)) as T[];
    }

    public FindChildrenByExactType<T extends BaseObject>(Type: string | typeof BaseObject): T[] {
        const typeName = typeof Type === 'string' ? Type : Type.TypeNameToken;
        return this.Children.filter(item => item.IsExactly(typeName)) as T[];
    }

    public FindChildrenByData<T extends BaseObject>(DataQuery: string, ValueQuery?: any): T[] {
        return this.Children.filter(item => item.HasData(DataQuery, ValueQuery)) as T[];
    }

    public FindChildIndexByName(Name: string): number {
        let foundIndex = -1;
        this.Children.forEach((entry: BaseObject, index) => {
            if (entry.Name === Name) {
                foundIndex = index;
            }
        });
        return foundIndex;
    }

    // virtual
    public OnAttach(Parent: BaseObject): void {}

    // virtual
    public OnRemove(Parent: BaseObject): void {}

    // virtual
    public OnAttachChild(Child: BaseObject): void {}

    // virtual
    public OnRemoveChild(ChildID: string): void {}

    // virtual
    public Serialize(): any {
        return {
            ID: this.ID,
            Name: this.Name,
            Type: this.Type,
            Children: this.Children.map((entry: BaseObject) => entry.Serialize()),
            Data: this.Data,
        };
    }

    // virtual
    public Deserialize(Data: any): void {
        const factoryService: FactoryService = Inject(FactoryService);
        this._ID = Data.ID;
        this._Name = Data.Name;
        this.Children = [];
        this.Data = Data.Data;
        Data.Children?.forEach((entry: any) => {
            const Deserialized: BaseObject = factoryService.Create(Data.Type);
            Deserialized.Deserialize(entry);
            this.Attach(Deserialized);
        });
    }

    protected RegisterType(Type: typeof BaseObject, IsAbstract?: boolean): void {
        const factoryService: FactoryService = Inject(FactoryService);
        this.Types.push(Type.TypeNameToken);
        if (!IsAbstract) {
            factoryService.Register(Type, () => new Type());
        }
    }
}

export default BaseObject;
