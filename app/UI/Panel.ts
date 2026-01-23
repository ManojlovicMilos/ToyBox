export { Panel }

import * as Core from '../Core/Core';

import Control from './Control';

@Core.TypedObject('TBX.UI.Panel')
class Panel extends Control {
    public constructor(Old?: Panel) {
        super(Old);
        this.Children = Old?.Children.map((entry: Control) => entry.Copy()) || [];
    }

    public override Copy(): Panel {
        return new Panel(this);
    }

    public override Update(): void {
        super.Update();
        if (!this.Element) return;
        (this.Children as Control[]).forEach((entry: Control) => {
            entry.Check();
            if (!entry.Data['AppendedTo' + this.ID]) {
                this.Element.appendChild(entry.Element);
                entry.Data['AppendedTo' + this.ID] = true;
            }
            entry.Offset = this.Position;
            entry.Update();
        });
    }

    protected override Create(): void {
        super.Create();
        this.Element.className += ' panel';
        (this.Children as Control[]).forEach((entry: Control) => {
            entry.Check();
            entry.Update();
            this.Element.appendChild(entry.Element);
            entry.Data['AppendedTo' + this.ID] = true;
        });
    }

    public override Attach(Child: Control): void {
        if (Child.Is(Control)) {
            super.Attach(Child);
            Child.Scale = this.Scale;
        }
    }

    public override OnResize(Args: any): void {
        super.OnResize(Args);
        this.Children.forEach(Entry => (Entry as Control).OnResize(Args));
        super.OnResize(Args);
    }

    public RemoveAll(): void {
        this.Children
            .forEach(Entry => {
                Entry.OnRemove(this);
            });
        this.Children = [];
    }
}

export default Panel;
