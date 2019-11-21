import {Subject} from "../Subject.js";
import {UIElement} from "./UIElement.js";

export class UISubject extends Subject<UIElement>
{
    constructor(game)
    {
        super(game);
    }

    preUpdate()
    {
        return this.game.camera;
    }

    postUpdate(observer: UIElement) {
    }
}