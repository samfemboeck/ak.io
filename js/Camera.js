import {Vector} from "./Vector.js";
import {Bounds} from "./Bounds.js";

export class Camera
{
    constructor(drawHandler, target)
    {
        this.drawHandler = drawHandler;
        this.target = target;
        this.position = new Vector(0, 0);
        this.center();
    }

    get bounds()
    {
        let width = this.drawHandler.canvas.width * (1 / this.scale);
        let height = this.drawHandler.canvas.height * (1 / this.scale);
        return new Bounds(this.position, width, height);
    }

    get scale()
    {
        return this.drawHandler.ctx.getTransform().a;
    }

    get ctxTransform()
    {
        return new Vector(this.drawHandler.ctx.getTransform().e * (1 / this.scale), this.drawHandler.ctx.getTransform().f * (1 / this.scale));
    }

    moveTo(pos)
    {
        this.drawHandler.ctx.setTransform(this.scale, 0, 0, this.scale, -pos.x, -pos.y);
        this.position = pos;
    }

    update()
    {
        this.center();
    }

    setScale(scale)
    {
        let factor = (1 / this.scale) * scale;
        this.drawHandler.ctx.scale(factor, factor);
        this.center();
    }

    center()
    {
        let pos = Vector.substract(this.target.position, new Vector(this.bounds.width / 2, this.bounds.height / 2));
        this.moveTo(Vector.times(pos, this.scale));
    }

    canvasToWorldPosition(pos)
    {
        return Vector.substract(Vector.times(pos, (1 / this.scale)), this.ctxTransform);
    }
}
