import {Gun} from "./Gun.js";
import {Vector} from "../Vector.js";
import {CollisionHandler} from "../CollisionHandler.js";

/**
 * Imitates very basic player behaviour
 */
//TODO rename 'Bot'
export class AI extends Gun
{
    constructor(spriteHandler, target)
    {
        super(spriteHandler);

        this.LAYERS = [CollisionHandler.LAYERS.OPPONENT];
        this.OBJECTNAME = "Bot";
        AI.INSTANCES++;

        this.target = target;
        this.position = Vector.add(this.target.position, new Vector(200, 200));
        this.speed = 1;
        this.fireRate = 500;
        this.displayName = "bot-" + AI.INSTANCES;

        this.setShooting();
    }

    update()
    {
        this.direction = Vector.substract(this.target.position, this.position).unitVector;
        return super.update();
    }

    shootBullet()
    {
        let bullet = super.shootBullet();
        bullet.LAYERS.push(CollisionHandler.LAYERS.OPPONENT);
        bullet.strokeStyle = "#f00";
    }
}

AI.INSTANCES = 0;
