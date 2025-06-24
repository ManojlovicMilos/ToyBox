import { TagCollection } from './Tag';

type SerializedObjectFieldType =
    Array<SerializedObjectFieldType> |
    SerializedObject |
    TagCollection |
    string | number | boolean;

type SerializedObject = {
    type: string;
    data: { [key: string]: SerializedObjectFieldType };
}

type TBONFileData = {
    version: string;
    data: SerializedObject;
}

export {
    SerializedObjectFieldType,
    SerializedObject,
    TBONFileData,
}
