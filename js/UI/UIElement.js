export class UIElement
{
    constructor(uiSubject)
    {
        this.uiSubject = uiSubject;
        this.uiSubject.add(this);
    }
}