import {Vector} from "./Vector.js";
import {Bounds} from "./Bounds.js";

export class Camera
{
    constructor(drawHandler, target)
    {
        this.drawHandler = drawHandler;
        this.target = target;
        this.position = new Vector(0, 0);
        this.moveTo(this.target.position);
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

    worldToCameraPos(pos)
    {
        return Vector.times(pos, this.scale);
    }

    moveTo(pos)
    {
        let cameraPos = this.worldToCameraPos(new Vector(-pos.x + 0.5 * this.bounds.width, -pos.y + 0.5 * this.bounds.height));
        this.drawHandler.ctx.setTransform(this.scale, 0, 0, this.scale, cameraPos.x, cameraPos.y);
        this.position = pos;
    }

    update()
    {
        this.moveTo(this.target.position);
    }

    setScale(scale)
    {
        let factor = (1 / this.scale) * scale;
        this.drawHandler.ctx.scale(factor, factor);
        this.moveTo(this.target.position);
    }

    canvasToWorldPosition(pos)
    {
        return Vector.substract(Vector.times(pos, (1 / this.scale)), this.ctxTransform);
    }
}
