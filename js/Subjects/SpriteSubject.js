import {EntitySubject} from "./EntitySubject.js";
import {Player} from "../Sprite/Player.js";
import {ScaleInterpolator} from "../ScaleInterpolator.js";
import {Game} from "../Game.js";

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
            {
                new ScaleInterpolator(this.game.camera, this.game.camera.scale - 0.06, 500);
            }

            victim.die();
            victim.setRandomPosition();

            if (victim instanceof Player)
            {
                this.game.camera.setScale(1);
            }

            let msg = `${killer.getChatColor()}${killer.displayName} <#fff>killed ${victim.getChatColor()}${victim.displayName}<#fff>!`;
            Game.messageObject.setMessage(msg, 1000);

            this.checkKillStreak(killer);

            this.game.drawHandler.drawScoreboard();

            if (killer.kills >= 10)
                this.game.end(killer);
        }
        else
        {
            console.error("Can't find entity with tag " + tag + ".");
        }
    }

    // TODO fix
    checkKillStreak(gun)
    {
        let msg = `${gun.getChatColor()}${gun.displayName}<#fff>: `;
        switch(gun.kills)
        {
            case 3:
                Game.messageObject.setMessage(msg + "<#ebff56>Killing Spree<#fff>!");
                break;
            case 6:
                Game.messageObject.setMessage(msg + "<#ffb85b>Rampage<#fff>!");
                break;
            case 9:
                Game.messageObject.setMessage(msg + "<#ff7575>Unstoppable<#fff>!");
                break;
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
        sprite.onPostUpdate(this.game.camera, this.game.map);
    }
}