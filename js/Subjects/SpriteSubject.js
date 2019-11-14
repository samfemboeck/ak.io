import {EntitySubject} from "./EntitySubject.js";
import {Player} from "../Sprite/Player.js";

export class SpriteSubject extends EntitySubject
{
    constructor(game)
    {
        super(game);
    }

    onKill(victim, tag)
    {
        let killer = this.findSpriteByTag(tag);
        if (killer)
        {
            killer.scale += 0.5;
            if (killer instanceof Player)
                this.game.camera.setScale(this.game.camera.scale - 0.1);
            this.game.setRandomPosition(victim);
        }
        else
        {
            console.error("Can't find entity with tag " + tag + ".");
        }
    }

    findSpriteByTag(tag)
    {
        for (let entity of this.entities)
        {
            if (entity.TAG === tag)
                return entity;
        }
        return null;
    }

    onEntityUpdate(entity)
    {
        if (entity.shouldBeRemoved(this.game.camera))
            this.remove(entity);
    }
}