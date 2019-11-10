import {CollisionHandler} from "./CollisionHandler.js";
import {DrawHandler} from "./DrawHandler.js";
import {Vector} from "./Vector.js";
import {Player} from "./Player.js";

/**
 * Subject Class for handling updates and collisions
 */
export class EntityHandler
{
    constructor(game)
    {
        this.game = game;
        this.entities = [];
        this.collisionHandler = new CollisionHandler(this.game);
        this.drawHandler = new DrawHandler(this.game);
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

    setRandomPosition(sprite)
    {
        let rndX = Math.random() * (this.game.map.width - sprite.width);
        let rndY = Math.random() * (this.game.map.height - sprite.height);
        sprite.position = new Vector(rndX, rndY);
    }

    onKill(tag)
    {
        let entity = this.findEntityByTag(tag);
        if (entity)
        {
            entity.scale += 1;
            if (entity instanceof Player)
            {
                this.drawHandler.globalScale -= 0.1;
            }
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

    updateEntities()
    {
        for (let i = 0; i < this.entities.length; i++)
        {
            let entity = this.entities[i];
            entity.update();

            if (entity.position.x < 0 ||
                entity.position.x > this.game.map.width ||
                entity.position.y < 0 ||
                entity.position.y > this.game.map.height)
            {
                this.entities.splice(i, 1);
            }

            this.drawHandler.draw(this.entities);
        }

        this.collisionHandler.checkCollisions(this.entities);
    }
}