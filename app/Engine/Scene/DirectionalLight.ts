import * as Core from '../../Core/Core';
import * as Math from './../../Mathematics/Mathematics';

import Light from './Light';

@Core.TypedObject('TBX.DirectionalLight')
class DirectionalLight extends Light {
    public constructor(Old?: DirectionalLight) {
        super(Old);
        this.RegisterType(DirectionalLight);
        if (!Old) {
            this.Direction = new Math.Vertex(0, 1, 0);
        }
    }

    public Copy(): DirectionalLight {
        return new DirectionalLight(this);
    }
}

export default DirectionalLight;
