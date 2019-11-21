import {Scalable} from "./Interface/Scalable.js";

export class ScaleInterpolator
{
    step: number = 10;
    interval: number;

    constructor(public obj: Scalable, public toScale: number, public millis: number)
    {
        this.obj = obj;
        this.millis = millis;
        let stepValue: number = (toScale - obj.scale) / (millis / this.step);
        this.interval = setInterval(() => this.updateValue(stepValue), this.step);
    }

    updateValue(stepValue)
    {
        this.obj.setScale(this.obj.scale + stepValue);
        this.millis -= this.step;
        if (this.millis <= 0)
            clearInterval(this.interval);
    }
}