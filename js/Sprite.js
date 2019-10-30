import {Vector} from "./Vector.js";

export class Sprite
{
    constructor(ctx)
    {
        this.ctx = ctx;
        this.speed = 0;
        this.width = 0;
        this.height = 0;
        this.rotation = Math.PI;
        this.direction = new Vector(0, 0);
        this.position = new Vector(0, 0);
    }

    get pivot()
    {
        let x = this.position.x + 0.5 * this.width;
        let y = this.position.y - 0.5 * this.height;
        return new Vector(x, y);
    }

    get velocity()
    {
        return Vector.times(this.direction, this.speed);
    }

    update()
    {
        this.move();
        this.rotate();
        this.draw();
    }

    move()
    {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    draw()
    {
        this.ctx.save();
        this.ctx.translate(this.pivot.x, this.pivot.y);
        this.ctx.rotate(this.rotation);
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(-0.5 * this.width, -0.5 * this.height, this.width, this.height);
        this.ctx.restore();
    }

    rotate(direction)
    {
        let dir = direction ? direction : this.direction;
        this.rotation = -Math.atan2(dir.x, dir.y) - 0.5 * Math.PI;
    }
}