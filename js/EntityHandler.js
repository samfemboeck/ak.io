import {CollisionHandler} from "./CollisionHandler.js";
import {DrawHandler} from "./DrawHandler.js";
import {Vector} from "./Vector.js";
import {Player} from "./Player.js";
import {Bullet} from "./Bullet.js";

/**
 * Subject Class for handling updates and collisions
 */
export class EntityHandler
{
    constructor(game)
    {
        this.game = game;
        this.entities = [];
    }

    add(entity)
    {
        this.entities.push(entity);
    }

    remove(entity)
    {
        for (let i = 0; i < this.entities.length; i++)
        {
            if (this.entities[i] === entity)
            {
                this.entities.splice(i, 1);
            }
        }
    }

    onKill(tag)
    {
        let entity = this.findEntityByTag(tag);
        if (entity)
        {
            entity.scale += 0.5;
            this.game.camera.setScale(this.game.camera.scale - 0.1)
        }
        else
        {
            console.error("Can't find entity with tag " + tag + ".");
        }
    }

    findEntityByTag(tag)
    {
        for (let entity of this.entities)
        {
            if (entity.TAG === tag)
                return entity;
        }
        return null;
    }

    update()
    {
        for (let i = 0; i < this.entities.length; i++)
        {
            let entity = this.entities[i];
            entity.update();
            if (entity.shouldBeRemoved(this.game.camera)){
                console.log("deleted");
                this.remove(entity);
            }

        }

        return this.entities;
    }
}
