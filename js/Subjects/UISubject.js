import {EntitySubject} from "./EntitySubject.js";

export class UISubject extends EntitySubject
{
    constructor(game)
    {
        super(game);
    }

    preUpdate()
    {
        return this.game.camera.bounds;
    }
}