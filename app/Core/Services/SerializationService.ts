
import LogService from './Log';
import Service from './Service';
import BaseObject from '../BaseObject';
import { TagCollection } from '../Tag';
import inject from './InjectionManager';
import FactoryService from './FactoryService';

type SerializedJSONbjectData = { [key: string]: SerializedJSONbjectData | string | number | boolean };
type SerializedObjectValueType = SerializedBaseObjectReference | SerializedJSONbjectData | string | number | boolean | null;
type SerializedBaseObjectData = { [key: string]: SerializedBaseObjectReference | TagCollection | SerializedJSONbjectData | string | number | boolean };
type SerializedBaseObjectReference = {
    type: string,
    data: SerializedBaseObjectData,
};

class SerializationService extends Service {
    private logService: LogService;
    private factoryService: FactoryService;

    public constructor() {
        super();
        this.logService = inject(LogService);
    }

    public validSerializedBaseObjectReference(DataObject: Partial<SerializedBaseObjectReference>): boolean {
        if (!DataObject.type) return false;
        if (!DataObject.data) return false;
        return this.factoryService.exists(DataObject.type);
    }

    public serialize(serialized: BaseObject): SerializedBaseObjectReference {
        return {
            type: serialized.type,
            data: {
                ...this.serializeInstanceData(serialized),
            }
        };
    }

    public json(serialized: BaseObject): string {
        return JSON.stringify(this.serialize(serialized));
    }

    private serializeInstanceData(serialized: BaseObject): SerializedBaseObjectData {
        const Data: SerializedBaseObjectData = {};
        Object.keys(serialized).forEach(key => {
            const value: SerializedObjectValueType | null = this.serializeInstanceDataValue(this[key]);
            if (value !== null) {
                Data[key] = value;
            }
        });
        return Data;
    }

    private serializeInstanceDataValue(serializedValue: BaseObject | TagCollection | object | string | number | boolean): SerializedObjectValueType {
        if (typeof serializedValue !== 'function' && typeof serializedValue !== 'object') {
            return serializedValue;
        } else if (typeof serializedValue === 'object' && (serializedValue as object) instanceof BaseObject) {
            return this.serialize(serializedValue as BaseObject);
        } else if (typeof serializedValue === 'object') {
            let Serialized: SerializedJSONbjectData = {};
            Object.keys(serializedValue).forEach(key => {
                const value: SerializedObjectValueType | null = this.serializeInstanceDataValue(this[key]);
                if (value !== null) {
                    Serialized[key] = value;
                }
            });
            return Serialized;
        } else return null;
    }

    public deserialize(deserializedData: SerializedBaseObjectReference): BaseObject | null {
        let value: BaseObject | null;
        if (this.factoryService.exists(deserializedData.type)) {
            value = this.factoryService.create(deserializedData.type);
            this.deserializeInstanceData(value, deserializedData.data);
        }
        else {
            this.logService.error(`Failed to Deserialize Object of Type: ${deserializedData.type}. Missing registered factory.`);
        }
        return value;
    }

    private deserializeInstanceData(deserialized: BaseObject, deserializedData: SerializedBaseObjectData): void {
        Object.keys(deserializedData).forEach(key => {
            const value: BaseObject | object | string | number | boolean | null = this.deserializeInstanceDataValue(deserialized[key]);
            if (value !== null) {
                deserialized[key] = value;
            }
        });
    }

    private deserializeInstanceDataValue(deserializedValue: SerializedBaseObjectReference | string | number | boolean): BaseObject | string | number | boolean | null {
        if (typeof deserializedValue !== 'object' && typeof deserializedValue !== 'function') return deserializedValue;
        if (typeof deserializedValue === 'function') {
            this.logService.warning('Invalid json object passed for deserialization. Data cannot contain functions.');
            return null;
        }
        else if (typeof deserializedValue === 'object') {
            if (this.validSerializedBaseObjectReference(deserializedValue)) {
                return this.deserialize(deserializedValue);
            }
            else {
                return null;
            }
        }
        else return null;
    }
}

const serialize = (serialized: BaseObject): SerializedBaseObjectReference => {
    let service = inject<SerializationService>(SerializationService);
    return service.serialize(serialized);
};

const deserialize = (deserializedData: SerializedBaseObjectReference): BaseObject | null => {
    let service = inject<SerializationService>(SerializationService);
    return service.deserialize(deserializedData);
};

export {
    serialize,
    deserialize,
    SerializedBaseObjectData,
    SerializedBaseObjectReference
}

export default SerializationService;
