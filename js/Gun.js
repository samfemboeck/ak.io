import {Sprite} from "./Sprite.js";
import {Bullet} from "./Bullet.js";
import {Vector} from "./Vector.js";

export class Gun extends Sprite
{
    constructor(ctx)
    {
        super(ctx);
        this.width = 100;
        this.height = 20;
        this.position = new Vector(this.ctx.canvas.width / 2 - 0.5 * this.width, this.ctx.canvas.height / 2 - 0.5 * this.height);
        this.speed = 3;
    }

    shoot()
    {
        return new Bullet(this.ctx, {...this.direction}, this.speed * 5, {...this.rotation}, {...this.pivot});
    }
}