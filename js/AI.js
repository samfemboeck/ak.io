import {Gun} from "./Gun.js";
import {Vector} from "./Vector.js";

export class AI extends Gun
{
    constructor(ctx, bulletHandler)
    {
        super(ctx, bulletHandler);
        this.attackTime = 60; // 1 second
        this.target = null;
        this.speed = 1;

        this._timer = 0;
        this._isAttacking = false;
    }

    setTarget(gun)
    {
        this.target = gun;
        this.attack();
    }

    attack()
    {
        this._isAttacking = true;
        this.setShooting();
        this._timer = this.attackTime;
    }

    idle()
    {
        this._isAttacking = false;
        this.unsetShooting();
    }

    update()
    {
        super.update();
        if (this._isAttacking)
        {
            this._timer -= 1;
            if (this._timer <= 0)
            {
                this.idle();
                setTimeout($.proxy(this.attack, this), 1000);
                return;
            }

            this.direction = Vector.substract(this.target.pivot, this.pivot).normalize();
        }
    }
}