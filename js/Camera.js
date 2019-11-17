import {Vector} from "./Vector.js";
import {Bounds} from "./Bounds.js";

export class Camera
{
    constructor(drawHandler, target)
    {
        this.drawHandler = drawHandler;
        this.canvas = this.drawHandler.canvasMain;
        this.ctx = this.canvas.getContext("2d");
        this.target = target;
        this.position = target.position;
    }

    get width()
    {
        return this.canvas.width * (1 / this.scale);
    }

    get height()
    {
        return this.canvas.height * (1 / this.scale);
    }

    get bounds()
    {
        return new Bounds(this.position, this.width, this.height);
    }

    get scale()
    {
        return this.ctx.getTransform().a;
    }

    get ctxTransform()
    {
        return new Vector(this.ctx.getTransform().e * (1 / this.scale), this.ctx.getTransform().f * (1 / this.scale));
    }

    get position()
    {
        return Vector.add(this.ctxTransform.invertedVector, new Vector(0.5 * this.width, 0.5 * this.height));
    }

    set position(pos)
    {
        let translateVector = Vector.substract(this.position, pos);
        this.ctx.translate(translateVector.x, translateVector.y);
    }

    update()
    {
        this.position = this.target.position;
    }

    setScale(scale)
    {
        let factor = (1 / this.scale) * scale;
        this.ctx.scale(factor, factor);
        this.position = this.target.position;
    }

    canvasToWorldPosition(pos)
    {
        return Vector.substract(Vector.times(pos, (1 / this.scale)), this.ctxTransform);
    }

    containsPosition(pos)
    {
        let min = this.bounds.min;
        let max = this.bounds.max;
        return !(pos.x < min.x || pos.x > max.x || pos.y < min.y || pos.y > max.y);
    }
}
