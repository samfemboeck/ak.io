export class ScaleInterpolator
{
    constructor(scaleObj, targetScale, milliseconds)
    {
        this.scaleObj = scaleObj;
        this.step = 10;
        this.milliseconds = milliseconds;
        this.stepValue = (targetScale - scaleObj.scale) / (milliseconds / this.step);
        this.interval = setInterval(() => this.updateValue(), this.step);
    }

    updateValue()
    {
        this.scaleObj.setScale(this.scaleObj.scale + this.stepValue);
        this.milliseconds -= this.step;
        if (this.milliseconds <= 0)
            clearInterval(this.interval);
    }
}