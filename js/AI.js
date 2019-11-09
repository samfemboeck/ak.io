import {Gun} from "./Gun.js";
import {Vector} from "./Vector.js";
import {EntityHandler} from "./EntityHandler.js";

/**
 * Imitates very basic player behaviour
 */
export class AI extends Gun
{
    constructor(game, target)
    {
        super(game);

        this.TAG = EntityHandler.TAGS.OPPONENT;
        this.LAYER = EntityHandler.LAYERS.OPPONENT;

        this.attackTime = 60; // 1 second
        this.target = null;
        this.speed = 1;
        this.fireRate = 300;

        this._timer = 0;
        this._isAttacking = false;

        this.setTarget(target);
    }

    setTarget(gun)
    {
        this.target = gun;
        this.position = Vector.add(this.target.position, new Vector(-0.25 * this.game.canvas.width, -0.25 * this.game.canvas.height));
        this.attack();
    }

    attack()
    {
        this._isAttacking = true;
        this._timer = this.attackTime;
        this.setShooting();
    }

    idle()
    {
        this._isAttacking = false;
        this.unsetShooting();
    }

    update()
    {
        /*if (this._isAttacking)
        {
            this._timer -= 1;
            if (this._timer <= 0)
            {
                this.idle();
                setTimeout($.proxy(this.attack, this), 1000);
                return;
            }

            this.direction = Vector.substract(this.target.pivot, this.pivot).normalize();
        }*/
        this.direction = Vector.substract(this.target.position, this.position).unitVector;
        this.rotate();
        super.update();
    }

    onCollide(other)
    {

    }
}