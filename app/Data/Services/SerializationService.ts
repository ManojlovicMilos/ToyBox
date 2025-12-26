import * as Core from '../../Core/Core';
import * as Engine from '../../Engine/Engine';

const EDITOR_PREFIX = 'EDITOR_';
const TOYBOX_PREFIX = 'TOYBOX_';

@Core.TBXService('TBX.SerializationService')
class SerializationService extends Core.Service {
    public CleanData(Data: any): any {
        let NewData: any = {};
        for (let Key in Data) {
            if (Key.startsWith(EDITOR_PREFIX)) continue;
            if (Key.startsWith(TOYBOX_PREFIX)) continue;
            NewData[Key] = Data;
        }
        return NewData;
    }
    
    public DeserializeSceneObject(Data): Engine.SceneObject {
        let SO: Engine.SceneObject;
        if (Data.Type == Engine.SceneObjectType.Drawn) {
            if (Data.DrawType == Engine.DrawObjectType.Sprite) {
                SO = new Engine.Sprite();
                SO.Deserialize(Data);
            }
            else if (Data.DrawType == Engine.DrawObjectType.Tile) {
                SO = new Engine.Tile();
                SO.Deserialize(Data);
            }
        }
        else if (Data.Type == Engine.SceneObjectType.Sound) {
            SO = new Engine.SoundObject('');
            SO.Deserialize(Data);
        }
        return SO;
    }
}

export default SerializationService;
