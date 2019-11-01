import {Gun} from "./Gun.js";
import {Vector} from "./Vector.js";

export class Player extends Gun
{
    constructor(game)
    {
        super(game);
        this._moveRight = false;
        this._moveLeft = false;
        this._moveUp = false;
        this._moveDown = false;
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
        super.update();
        let moveX = this._moveRight - this._moveLeft;
        let moveY = this._moveDown - this._moveUp;
        this.direction = new Vector(moveX, moveY);
    }
}