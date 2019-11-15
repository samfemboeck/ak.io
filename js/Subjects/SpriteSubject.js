import {EntitySubject} from "./EntitySubject.js";
import {Player} from "../Sprite/Player.js";
import {ScaleInterpolator} from "../ScaleInterpolator.js";

export class SpriteSubject extends EntitySubject
{
    constructor(game)
    {
        super(game);
    }

    reportKill(victim, tag)
    {
        let killer = this.findSpriteByTag(tag);
        if (killer)
        {
            killer.giveKill();

            if (killer instanceof Player)
                new ScaleInterpolator(this.game.camera, this.game.camera.scale - 0.06, 500);

            victim.die();
            victim.position = {...killer.position};

            if (victim instanceof Player)
                this.game.camera.setScale(1);

            this.game.messageObject.setMessage(`${killer.displayName} killed ${victim.displayName}!`, 1000);
            this.game.scoreBoard.sort();

            if (killer.kills >= 10)
                this.game.end(killer);
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

    postUpdate(sprite)
    {
        if (sprite.shouldBeRemoved(this.game.camera))
            this.remove(sprite);
    }
}