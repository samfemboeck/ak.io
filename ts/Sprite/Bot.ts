import {Gun} from "./Gun.js";
import {Vector} from "../Vector.js";
import {CollisionHandler} from "../CollisionHandler.js";
import {SpriteSubject} from "./SpriteSubject.js";
import {Bullet} from "./Bullet.js";

/**
 * Imitates very basic player behaviour
 */
export class Bot extends Gun
{
    static INSTANCES = 0;
    private target: Gun;

    constructor(subj: SpriteSubject, target: Gun)
    {
        super(subj);
        Bot.INSTANCES++;
        this.addLayer(CollisionHandler.LAYER.OPPONENT);
        this.target = target;
        this.speed = 1;
        this.fireRate = 500;
        this.displayName = "bot-" + Bot.INSTANCES;
        this.setShooting();
    }

    update(): this
    {
        this.direction = Vector.substract(this.target.position, this.position).unitVector;
        return super.update();
    }

    shootBullet(): Bullet
    {
        let bullet = super.shootBullet();
        bullet.addLayer(CollisionHandler.LAYER.OPPONENT);
        bullet.strokeStyle = "#f00";
        return bullet;
    }
}
