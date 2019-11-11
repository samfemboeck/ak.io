import {Sprite} from "./Sprite.js";
import {Bullet} from "./Bullet.js";
import {MyMath} from "./MyMath.js";
import {Polygon} from "./Polygon.js";
import {Vector} from "./Vector.js";

// TODO Bullet position bei scaling fixen
export class Gun extends Sprite
{
    constructor(entityHandler)
    {
        super(entityHandler);

        this.NAME = "Gun";

        this.speed = 3;
        this.fireRate = 300; // every 200 msecs
        this.health = 100;
        this.scale = 2;
        this.polygon = new Polygon(Polygon.Gun);

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
        let bullet = new Bullet(this.entityHandler, {...this.direction}, this.speed * 5, this.rotation);
        bullet.TAG = this.TAG;
        bullet.scale = 0.5 * this.scale;
        let bulletPosition = this.vertices[27]; // position of barrel vertex
        bullet.position = Vector.substract(bulletPosition, new Vector(0, 0.5 * bullet.bounds.y));
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