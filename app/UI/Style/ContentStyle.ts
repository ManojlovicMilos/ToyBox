export { ContentStyle, ContentAlign, ContentDirection }

enum ContentAlign
{
    Start = "flex-start",
    End = "flex-end",
    Center = "center",
    Between = "space-between",
    Around = "space-around"
}

enum ContentDirection
{
    Row = "row",
    Column = "column"
}

class ContentStyle
{
    private _Enabled: boolean;
    private _Direction: ContentDirection;
    private _VerticalAlign: ContentAlign;
    private _HorizontalAlign: ContentAlign;
    public get Enabled():boolean { return this._Enabled; }
    public set Enabled(value:boolean) { this._Enabled = value; }
    public get Align():ContentAlign { return this._HorizontalAlign; }
    public set Align(value:ContentAlign) { this._HorizontalAlign = value; }
    public get VerticalAlign():ContentAlign { return this._VerticalAlign; }
    public set VerticalAlign(value:ContentAlign) { this._VerticalAlign = value; }
    public get HorizontalAlign():ContentAlign { return this._HorizontalAlign; }
    public set HorizontalAlign(value:ContentAlign) { this._HorizontalAlign = value; }
    public constructor(Old?:ContentStyle)
    {
        if(Old != null)
        {
            this._Enabled = Old._Enabled;
            this._Direction = Old._Direction;
            this._VerticalAlign = Old._VerticalAlign;
            this._HorizontalAlign = Old._HorizontalAlign;
        }
        else
        {
            this._Enabled = true;
            this._Direction = ContentDirection.Row;
            this._VerticalAlign = ContentAlign.Center;
            this._HorizontalAlign = ContentAlign.Center;
        }
    }
    public Copy() : ContentStyle
    {
        return new ContentStyle(this);
    }
    public Apply(Element:HTMLElement, Active: boolean) : void
    {
        let DisplayMode: string = (this._Enabled) ? "flex" : "block";
        Element.style.display = (Active) ? DisplayMode : "none";
        if(this._Enabled)
        {
            Element.style.flexDirection = this._Direction;
            if(this._Direction == ContentDirection.Row)
            {
                Element.style.justifyContent = this._HorizontalAlign;
                Element.style.alignItems = this._VerticalAlign;
            }
            else if(this._Direction == ContentDirection.Column)
            {
                Element.style.justifyContent = this._VerticalAlign;
                Element.style.alignItems = this._HorizontalAlign;
            }
        }
    }
}