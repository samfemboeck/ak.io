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

    preUpdate()
    {
        return null; // implement in Child Class
    }

    update()
    {
        for (let i = 0; i < this.entities.length; i++)
        {
            let entity = this.entities[i];
            let params = this.preUpdate();
            let ret = entity.update(params);
            this.postUpdate(ret);
        }

        return this.entities;
    }

    postUpdate(ret)
    {
        // implement in Child Class
    }
}
