import {Vector} from "./Vector.js";

export class Gun
{

    constructor(canvas)
    {
        this.canvas = canvas;
        this.width = 100;
        this.height = 20;
        this.x = this.canvas.width / 2 - 0.5 * this.width;
        this.y = this.canvas.height / 2 - 0.5 * this.height;
        this._rotation = Math.PI;

        $(this.canvas).mousemove($.proxy(this.mouseChanged, this));
    }

    get pivot()
    {
        let x = this.x + 0.5 * this.width;
        let y = this.y - 0.5 * this.height;
        return new Vector(x, y);
    }

    get rotation()
    {
        return this._rotation;
    }

    set rotation(rotation)
    {
        if (rotation !== this.rotation)
        {
            this.rotation = rotation;
            this.rotate(rotation);
        }
    }

    mouseChanged(event)
    {
        let mousePos = new Vector(event.pageX, event.pageY);
        let mouseDirection = mousePos.minus(this.pivot);
        this.rotation = Math.atan2(mouseDirection.x, mouseDirection.y);
    }

    draw()
    {
        let ctx = this.canvas.getContext("2d");
        ctx.save();
        ctx.rotate(this.rotation);
        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.fillRect(this.x, this.y, 100, 20);
        ctx.restore();
    }

    rotate()
    {

    }

    move(x, y)
    {
        this.x += x;
        this.y += y;
    }
}