import {EntitySubject} from "./EntitySubject.js";
import {Player} from "../Sprite/Player.js";
import {ScaleInterpolator} from "../ScaleInterpolator.js";
import {CollisionHandler} from "../CollisionHandler.js";

export class SpriteSubject extends EntitySubject
{
    constructor(game)
    {
        super(game);
        this.collisionHandler = new CollisionHandler();
    }

    update()
    {
        let sprites = super.update();
        this.collisionHandler.checkCollisions(sprites);
        return sprites;
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
            this.game.messageObject.scheduleMessage(msg, 2000);

            this.checkKillStreak(killer);

            this.game.drawHandler.drawScoreboard();

            if (killer.kills >= 10)
            {
                this.game.end(killer);
            }
        }
        else
        {
            console.error("Can't find entity with tag " + tag + ".");
        }
    }

    checkKillStreak(gun)
    {
        let msg = `${gun.getChatColor()}${gun.displayName}<#fff>: `;
        let dur = 2000;
        switch(gun.kills)
        {
            case 2:
                this.game.messageObject.scheduleMessage(msg + "<#ebff56>Killing Spree<#fff>!", dur);
                break;
            case 6:
                this.game.messageObject.scheduleMessage(msg + "<#ffb85b>Rampage<#fff>!", dur);
                break;
            case 9:
                this.game.messageObject.scheduleMessage(msg + "<#ff7575>Unstoppable<#fff>!", dur);
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