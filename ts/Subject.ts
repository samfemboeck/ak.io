import {Game} from "./Game.js";
import {Observer} from "./Interface/Observer.js"

export abstract class Subject<T extends Observer>
{
    observers: T[] = [];

    protected constructor(public game: Game){};

    add(observer: T)
    {
        this.observers.push(observer);
    }

    remove(observer: T)
    {
        for (let i = 0; i < this.observers.length; i++)
        {
            if (this.observers[i] === observer)
            {
                this.observers.splice(i, 1);
            }
        }
    }

    abstract preUpdate(): any;

    update(): T[]
    {
        for (let i = 0; i < this.observers.length; i++)
        {
            let entity = this.observers[i];
            let params = this.preUpdate();
            let ret = entity.update(params);
            this.postUpdate(ret);
        }

        return this.observers;
    }

    abstract postUpdate(observer: T);
}
