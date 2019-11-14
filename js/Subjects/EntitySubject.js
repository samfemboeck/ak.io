/**
 * Base Subject Class
 */
export class EntitySubject
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

    update()
    {
        for (let i = 0; i < this.entities.length; i++)
        {
            let entity = this.entities[i];
            entity.update();
            this.onEntityUpdate(entity);
        }

        return this.entities;
    }

    onEntityUpdate(entity)
    {
        // implement in child class
    }
}
