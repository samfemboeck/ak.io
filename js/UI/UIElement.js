export class UIElement
{
    constructor(uiSubject)
    {
        this.uiSubject = uiSubject;
        this.uiSubject.add(this);
        this.camera = null;
        this.camBounds = null;
    }

    update(camera)
    {
        this.camera = camera;
        this.camBounds = this.camera.bounds;
    }
}