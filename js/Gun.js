import {Sprite} from "./Sprite.js";
import {Bullet} from "./Bullet.js";
import {Vector} from "./Vector.js";
import {EntityHandler} from "./EntityHandler.js";

export class Gun extends Sprite
{
    constructor(game)
    {
        super(game);

        this.TAG = EntityHandler.TAGS.PLAYER;

        this.width = 20;
        this.height = 100;
        this.position = new Vector(this.ctx.canvas.width / 2 - 0.5 * this.width, this.ctx.canvas.height / 2 - 0.5 * this.height);
        this.speed = 3;
        this.fireRate = 200; // every 200 msecs

        this._interval = null;
    }

    setShooting()
    {
        this.shootBullet();
        this._interval = setInterval(() => this.shootBullet(), this.fireRate);
    }

    unsetShooting()
    {
        if (this._interval)
        {
            clearInterval(this._interval);
        }
    }

    shootBullet()
    {
        let bullet = new Bullet(this, {...this.game.mouseDirection}, this.speed * 5, this.rotation, {...this.position});
        this.game.entityHandler.add(bullet);
        debugger;
    }
}