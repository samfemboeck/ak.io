import {Sprite} from "./Sprite.js";
import {Bullet} from "./Bullet.js";
import {MyMath} from "../MyMath.js";
import {Polygon} from "./Polygon.js";
import {Vector} from "../Vector.js";
import {ScaleInterpolator} from "../ScaleInterpolator.js";
import {Player} from "./Player.js";
import {SpriteSubject} from "./SpriteSubject.js";

export class Gun extends Sprite
{
    polygon: Polygon = Polygon.GUN;
    fireRate: number = 100;
    health: number = 100;
    kills: number = 0;
    displayName: string = "N/A";
    private interval: number = null;

    constructor(subj: SpriteSubject)
    {
        super(subj);
        this.speed = 3;
    }

    setShooting(): void
    {
        this.shootBullet();
        this.interval = setInterval(() => this.shootBullet(), this.fireRate);
    }

    unsetShooting(): void
    {
        if (this.interval)
        {
            clearInterval(this.interval);
        }
    }

    shootBullet(): Bullet
    {
        let bullet = new Bullet(this.subject, new Vector(this.direction.x, this.direction.y), this.rotation);
        bullet.tag = this.tag;
        bullet.scale = 0.7 * this.scale;
        bullet.speed = this.speed * 5;
        let bulletPosition: Vector = this.vertices[27]; // position of barrel vertex
        bullet.position = Vector.substract(bulletPosition, new Vector(0, 0.5 * bullet.bounds.height));
        return bullet;
    }

    update(): this
    {
        super.update();
        this.rotation = MyMath.getRotationForDirection(this.direction) - 0.5 * Math.PI; // standard rotation is off
        return this;
    }

    draw(ctx: CanvasRenderingContext2D): void
    {
        super.draw(ctx);
        ctx.fill();

        // Health Bar
        ctx.beginPath();
        ctx.strokeStyle = this.getHealthBarColor();
        ctx.lineWidth = 10;
        ctx.arc(0, 0, 15, 0, this.health * (Math.PI / 50));
        ctx.stroke();
    }

    onCollide(other: Sprite): void
    {
        if (other instanceof Bullet)
        {
            new Audio("wav/hitmarker.wav").play();
            this.health -= other.damage;
            if (this.health <= 0)
            {
                this.subject.reportKill(this, other.tag);
                this.health = 100;
            }
        }
    }

    giveKill(): void
    {
        this.kills++;
        new ScaleInterpolator(this, this.scale + 1, 500);
    }

    die(): void
    {
        this.scale = 1;
        this.kills = 0;
        this.setRandomPosition();
    }

    getHealthBarColor(): string
    {

        let blue = 0;
        let green = 255;
        let red = ((100 - this.health) / 100) * 255;
        if (this.health <= 50)
        {
            green = (this.health / 50) * 255;
        }
        return `rgba(${red}, ${green}, ${blue}, 0.5)`
    }

    getChatColor(): string
    {
        return this instanceof Player ? "<#0f0>" : "<#AFC9FC>";
    }

    onPostUpdate(camera, map): void
    {
        if (!map.containsPosition(this.position))
        {
            this.die();
            this.subject.game.messageObject.scheduleMessage(this.getChatColor() + this.displayName + "<#fff> has" +
                " entered" +
                " <#a26afc>the" +
                " void<#fff>.", 1000);
        }
    }
}