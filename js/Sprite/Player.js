import {Gun} from "./Gun.js";
import {Vector} from "../Vector.js";
import {CollisionHandler} from "../CollisionHandler.js";
import {MyMath} from "../MyMath.js";

/**
 * Handles Player Input
 */
export class Player extends Gun
{
    constructor(spriteHandler)
    {
        super(spriteHandler);

        this.LAYERS = [CollisionHandler.LAYERS.PLAYER];
        this.OBJECTNAME = "Player";

        this.displayName = "wundertuete";

        // TODO moveDirection, lookDirection
        this._mouseDirection = new Vector(0, 0);
        this._moveRight = false;
        this._moveLeft = false;
        this._moveUp = false;
        this._moveDown = false;
    }

    set mouseDirection(dir)
    {
        this._mouseDirection = dir;
    }

    handleKeyDown(key)
    {
        if (key === "d")
            this._moveRight = true;
        if (key === "a")
            this._moveLeft = true;
        if (key === "w")
            this._moveUp = true;
        if (key === "s")
            this._moveDown = true;
    }

    handleKeyUp(key)
    {
        if (key === "d")
            this._moveRight = false;
        if (key === "a")
            this._moveLeft = false;
        if (key === "w")
            this._moveUp = false;
        if (key === "s")
            this._moveDown = false;
    }

    update()
    {
        let ret = super.update();
        let moveX = this._moveRight - this._moveLeft;
        let moveY = this._moveDown - this._moveUp;
        this.direction = new Vector(moveX, moveY);
        this.rotation = MyMath.getRotationForDirection(this._mouseDirection) - 0.5 * Math.PI;
        return ret;
    }

    shootBullet()
    {
        let bullet = super.shootBullet();
        bullet.direction = this._mouseDirection;
        bullet.strokeStyle = "#25ad00";
        bullet.LAYERS.push(CollisionHandler.LAYERS.PLAYER);
    }
}