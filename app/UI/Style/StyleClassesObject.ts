class StyleClassesObject {
    private _Classes: string[];

    public constructor(Old?: StyleClassesObject) {
        this._Classes = Old?._Classes || [];
    }

    public Copy(): StyleClassesObject {
        return new StyleClassesObject(this);
    }

    public Add(ClassName: string): void {
        if(!this._Classes.includes(ClassName)) {
            this._Classes.push(ClassName);
        }
    }
    public Remove(ClassName: string): void {
        this._Classes = this._Classes.filter((entry: string) => entry !== ClassName);
    }

    public Contains(ClassName: string): boolean {
        return this._Classes.includes(ClassName);
    }

    public Clear(): void {
        this._Classes = [];
    }

    public Apply(Element:HTMLElement): void {
        Element.className = this._Classes.join(' ');
    }
}

export default StyleClassesObject;
