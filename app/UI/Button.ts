import * as Core from './../Core/Core';
import * as Math from './../Mathematics/Mathematics';

import Label from './Label';

@Core.TypedObject('TBX.UI.Button')
class Button extends Label {
    public constructor(Old?: Button, Text?: string) {
        super(Old, Text);
        this.RegisterType(Button);
        if (!Old) {
            this.BackColor = Math.Color.FromRGBA(127, 127, 127, 255);
        }
    }

    public override Copy(): Button {
        return new Button(this);
    }

    public override Update(): void {
        super.Update();
        if (!this.Element) return;
        if (Core.Settings.EngineUIStyle) {
            this._Style.Values['cursor'] = 'pointer';
        }
    }

    protected override Create(): void {
        super.Create();
        this.Element.className += ' button';
    }
}

export default Button;
