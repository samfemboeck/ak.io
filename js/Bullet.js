import {Sprite} from "./Sprite.js";

export class Bullet extends Sprite
{
    constructor(canvas, speed, rotation, velocity)
    {
        super(canvas);
        this.speed = speed;
        this.velocity = velocity;
        this.rotation = rotation;
        this.width = 5;
        this.height = 5;
        this.x = 0;
        this.y = 0;
    }



    draw()
    {
        let ctx = this.canvas.getContext("2d");
        ctx.save();
        ctx.translate(this.pivot.x, this.pivot.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = '#f00';
        ctx.fillRect(-0.5 * this.width, -0.5 * this.height, this.width, this.height);
        ctx.restore();
    }
}