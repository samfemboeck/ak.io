import {Vector} from "./Vector.js";
import { Bounds } from "./Bounds.js";
import { DrawHandler } from "./DrawHandler.js";
import { Gun } from "./Sprite/Gun.js";
import { Scalable } from "./Interface/Scalable.js";

export class Camera implements Scalable
{
    drawHandler: DrawHandler;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    target: Gun;

    constructor(drawHandler: DrawHandler, target: Gun)
    {
        this.drawHandler = drawHandler;
        this.canvas = this.drawHandler.canvasMain;
        this.ctx = this.canvas.getContext("2d");
        this.target = target;
        this.position = target.position;
    }

    get width(): number
    {
        return this.canvas.width * (1 / this.scale);
    }

    get height(): number
    {
        return this.canvas.height * (1 / this.scale);
    }

    get bounds(): Bounds
    {
        return new Bounds(this.position, this.width, this.height);
    }

    get scale(): number
    {
        return this.ctx.getTransform().a;
    }

    get ctxTransform(): Vector
    {
        return new Vector(this.ctx.getTransform().e * (1 / this.scale), this.ctx.getTransform().f * (1 / this.scale));
    }

    get position(): Vector
    {
        return Vector.add(this.ctxTransform.invertedVector, new Vector(0.5 * this.width, 0.5 * this.height));
    }

    set position(pos: Vector)
    {
        let translateVector = Vector.substract(this.position, pos);
        this.ctx.translate(translateVector.x, translateVector.y);
    }

    update(): void
    {
        this.position = this.target.position;
    }

    setScale(scale: number) // TODO es6
    {
        let factor = (1 / this.scale) * scale;
        this.ctx.scale(factor, factor);
        this.position = this.target.position;
    }

    canvasToWorldPosition(pos: Vector): Vector
    {
        return Vector.substract(Vector.times(pos, (1 / this.scale)), this.ctxTransform);
    }

    containsPosition(pos: Vector): boolean
    {
        let min: Vector = this.bounds.min;
        let max: Vector = this.bounds.max;
        return !(pos.x < min.x || pos.x > max.x || pos.y < min.y || pos.y > max.y);
    }
}
