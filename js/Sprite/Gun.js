import {Sprite} from "./Sprite.js";
import {Bullet} from "./Bullet.js";
import {MyMath} from "../MyMath.js";
import {Polygon} from "./Polygon.js";
import {Vector} from "../Vector.js";
import {ScaleInterpolator} from "../ScaleInterpolator.js";
import {Game} from "../Game.js";

export class Gun extends Sprite
{
    constructor(spriteHandler)
    {
        super(spriteHandler);

        this.OBJECTNAME = "Gun";

        this.speed = 3;
        this.fireRate = 100; // every 200 msecs
        this.health = 100;
        this.scale = 2;
        this.polygon = new Polygon(Polygon.Gun);
        this.kills = 0;

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
        let bullet = new Bullet(this.spriteHandler, {...this.direction}, this.rotation);
        bullet.TAG = this.TAG;
        bullet.scale = 0.7 * this.scale;
        bullet.speed = this.speed * 5;
        let bulletPosition = this.vertices[27]; // position of barrel vertex
        bullet.position = Vector.substract(bulletPosition, new Vector(0, 0.5 * bullet.bounds.height));
        return bullet;
    }

    update()
    {
        let ret = super.update();
        this.rotation = MyMath.getRotationForDirection(this.direction) - 0.5 * Math.PI; // standard rotation is off
        return ret;
    }

    draw(ctx)
    {
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
            new Audio("wav/hitmarker.wav").play();
            this.health -= other.damage;
            if (this.health <= 0)
            {
                this.spriteHandler.reportKill(this, other.TAG);
                this.health = 100;
            }
        }
    }

    giveKill()
    {
        this.kills++;
        new ScaleInterpolator(this, this.scale + 1, 500);

    }

    die()
    {
        this.scale = 1;
        this.kills = 0;
        this.setRandomPosition();
    }
}