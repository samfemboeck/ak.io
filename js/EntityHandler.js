export class EntityHandler
{
    constructor(game)
    {
        this.game = game;
        this.entities = [];
    }

    add(entity)
    {
        if (!entity.TAG || entity.TAG === EntityHandler.TAGS.NONE)
        {
            console.error("Cant add entity with invalid tag.");
            return;
        }

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

    updateEntities()
    {
        for (let entity of this.entities)
        {
            entity.update();
        }

        this.checkCollisions();
    }

    checkCollisions()
    {
        for (let i = 0; i < this.entities.length; i++)
        {
            for (let a = i + 1; a < this.entities.length; a++)
            {
                if (this.entities[a].TAG === EntityHandler.TAGS.NONE ||
                    this.entities[i].TAG === EntityHandler.TAGS.NONE ||
                    this.entities[a] === this.entities[i])
                    continue;

                if (this.entities[i].overlaps(this.entities[a]))
                {
                    console.log("overlap");
                    this.entities[i].onCollide(this.entities[a]);
                    this.entities[a].onCollide(this.entities[i]);
                }
            }
        }
    }

    /*
    * for (let i = 0; i < this.bullets.length; i++)
        {
            let bullet = this.bullets[i];
            if (bullet.position.x < 0 ||
                bullet.position.x > this.map.width ||
                bullet.position.y < 0 ||
                bullet.position.y > this.map.height)
            {
                this.bullets.splice(i, 1);
            }
            else
            {
                bullet.update();
            }
        }
    * */
}

EntityHandler.TAGS = {NONE: 0, PLAYER: 1, OPPONENT: 2, BULLET: 3};