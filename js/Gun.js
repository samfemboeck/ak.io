import {Sprite} from "./Sprite.js";
import {Bullet} from "./Bullet.js";
import {Vector} from "./Vector.js";
import {MyMath} from "./MyMath.js";

export class Gun extends Sprite
{
    constructor(game)
    {
        super(game);

        this.width = 20;
        this.height = 100;
        this.position = new Vector(this.ctx.canvas.width / 2 - 0.5 * this.width, this.ctx.canvas.height / 2 - 0.5 * this.height);
        this.speed = 3;
        this.fireRate = 200; // every 200 msecs
        this.scale = 2;
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
        let barrelPosition = this.vertices[27];
        let bullet = new Bullet(this.game, {...this.direction}, this.speed * 5, this.rotation, {...barrelPosition});
        bullet.TAG = this.TAG; // dont let bullet collide with this object;
    }

    get vertices()
    {
        let ret = [];

        for (let i in this.polygon)
        {
            let x = this.scale * this.polygon[i][0];
            let y = this.scale * this.polygon[i][1];
            let pos = new Vector(this.position.x + x, this.position.y + y);
            ret.push(MyMath.getRotatedPosition(pos, this.rotation, this.position));
        }

        return ret;
    }

    draw()
    {
        this.ctx.save();
        this.ctx.translate(this.position.x, this.position.y);
        this.ctx.rotate(this.rotation);
        this.ctx.fillStyle = '#000';

        // Collision vertices
        this.ctx.beginPath();
        this.ctx.moveTo(this.scale * this.polygon[0][0], this.scale * this.polygon[0][1]);

        for (let i = 1; i < this.polygon.length; i++)
        {
            this.ctx.lineTo(this.scale * this.polygon[i][0], this.scale * this.polygon[i][1])
        }

        this.ctx.lineTo(this.scale * this.polygon[0][0], this.scale * this.polygon[0][1]);
        this.ctx.closePath();
        this.ctx.fill();

        this.ctx.restore();
    }
}