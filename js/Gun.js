import {Sprite} from "./Sprite.js";
import {Bullet} from "./Bullet.js";
import {Vector} from "./Vector.js";

export class Gun extends Sprite
{
    constructor(ctx, bulletHandler)
    {
        super(ctx, bulletHandler);

        this.TAG = Gun.instances++;

        this.width = 100;
        this.height = 20;
        this.position = new Vector(this.ctx.canvas.width / 2 - 0.5 * this.width, this.ctx.canvas.height / 2 - 0.5 * this.height);
        this.speed = 3;
        this.fireRate = 200; // every 200 msecs

        this._interval = null;
        this._bulletHandler = bulletHandler;
    }

    setShooting()
    {
        this._bulletHandler.push(new Bullet(this.ctx, {...this.direction}, this.speed * 5, {...this.rotation}, {...this.pivot}));
        this._interval = setInterval($.proxy(() => this._bulletHandler.push(new Bullet(this.ctx, {...this.direction}, this.speed * 5, {...this.rotation}, {...this.pivot})), this), this.fireRate);
    }

    unsetShooting()
    {
        if (this._interval)
        {
            clearInterval(this._interval)
        }
    }
}

Gun.instances = 0;