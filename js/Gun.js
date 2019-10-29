import {Sprite} from "./Sprite.js";
import {Bullet} from "./Bullet.js";

export class Gun extends Sprite
{
    constructor(canvas)
    {
        super(canvas);
        this.width = 100;
        this.height = 20;
        this.speed = 3;
        this.x = this.canvas.width / 2 - 0.5 * this.width;
        this.y = this.canvas.height / 2 - 0.5 * this.height;
        this.bullets = [];
    }

    update()
    {
        super.update();
        for (let bullet of this.bullets)
        {
            bullet.update();
        }
    }

    draw()
    {
        let ctx = this.canvas.getContext("2d");
        ctx.save();
        ctx.translate(this.pivot.x, this.pivot.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = '#000';
        ctx.fillRect(-0.5 * this.width, -0.5 * this.height, this.width, this.height);
        ctx.restore();
    }

    shoot()
    {
        let bullet = new Bullet(this.canvas, this.speed * 4, this.rotation, this.velocity);
        bullet.x = this.pivot.x;
        bullet.y = this.pivot.y;
        this.bullets.push(bullet);
    }
}