import {Sprite} from "./Sprite.js";
import {Bullet} from "./Bullet.js";
import {Vector} from "./Vector.js";
import {MyMath} from "./MyMath.js";

export class Gun extends Sprite
{
    constructor(entityHandler)
    {
        super(entityHandler);

        this.speed = 3;
        this.fireRate = 200; // every 200 msecs
        this.health = 100;
        this.scale = 4;
        this.polygon = [[-2,8], [8,8], [11,5],[18,3], [20,4], [27,2], [24,-7], [12,0], [10,0], [10, -1], [12, -6], [10, -8], [8,-8], [8, -6], [6, -1], [2,2], [-8, -10], [-10, -8],
            [-2, 2], [-4,2], [-4,2], [-14,3], [-14,4], [-20,4], [-20,3], [-23,3], [-23,4], [-28,4], [-28,5], [-23,5], [-21,6], [-21,7], [-14,7], [-14,8], [-7, 8], [-7,9]];

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
        let barrelPosition = new Vector(this.polygon);
        let bullet = new Bullet(this.entityHandler, {...this.direction}, this.speed * 5, this.rotation, {...barrelPosition});
        bullet.TAG = this.TAG;
        bullet.scale = this.scale;
        return bullet;
    }

    update()
    {
        super.update();
        this.rotation = MyMath.getRotationForDirection(this.direction) - 0.5 * Math.PI; // standard rotation is off
    }

    draw(ctx)
    {
        ctx.fillStyle = '#000';
        super.draw(ctx);
        ctx.fill();

        // Health Bar
        ctx.beginPath();
        ctx.strokeStyle = "rgba(0,255,0, 0.3)";
        ctx.lineWidth = 10;
        ctx.arc(0, 0, 15, 0, this.health * (Math.PI / 50));
        ctx.stroke();
    }

    onCollide(other)
    {
        if (other instanceof Bullet)
        {
            this.health -= other.damage;
            if (this.health <= 0)
            {
                this.entityHandler.onKill(other.TAG);
                this.health = 100;
            }
        }
    }
}