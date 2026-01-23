import * as Core from '../Core/Core';

import Text from './Text';

@Core.TypedObject('TBX.UI.Label')
class Label extends Text {
    public constructor(Old?: Label, Text?: string) {
        super(Old, Text);
        this.RegisterType(Label);
    }

    public Copy(): Label {
        return new Label(this);
    }

    public override Update(): void {
        super.Update();
        if (!this.Element) return;
        this._TextElement.innerText = this._Text;
    }

    protected override Create(): void {
        super.Create();
        this.Element.className += ' label';
        this._TextElement = document.createElement('p');
        this._TextElement.className = 'text';
        this.Element.appendChild(this._TextElement);
    }
}

export default Label;
