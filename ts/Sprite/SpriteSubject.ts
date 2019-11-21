import {Player} from "../Sprite/Player.js";
import {ScaleInterpolator} from "../ScaleInterpolator.js";
import {CollisionHandler} from "../CollisionHandler.js";
import {Subject} from "../Subject.js";
import {Sprite} from "./Sprite.js";
import {Gun} from "./Gun.js";
import {Game} from "../Game.js";

export class SpriteSubject extends Subject<Sprite>
{
    collisionHandler = new CollisionHandler();

    public constructor (public game: Game){ super(game); }

    update(): Sprite[]
    {
        let sprites = super.update();
        this.collisionHandler.checkCollisions(sprites);
        return sprites;
    }

    reportKill(victim: Gun, tag: number)
    {
        let killer: Gun = this.findGunByTag(tag);
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

    checkKillStreak(g: Gun)
    {
        let msg = `${g.getChatColor()}${g.displayName}<#fff>: `;
        let dur = 2000;
        switch (g.kills)
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

    findGunByTag(tag): Gun
    {
        for (let sprite of this.observers)
        {
            if (sprite instanceof Gun && sprite.tag == tag)
            {
                return sprite;
            }
        }
        return null;
    }

    postUpdate(s: Sprite)
    {
        s.onPostUpdate(this.game.camera, this.game.map);
    }

    preUpdate(): any {
    }
}