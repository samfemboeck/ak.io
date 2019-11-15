import {UIElement} from "./UIElement.js";
import {Vector} from "../Vector.js";

export class MessageObject extends UIElement
{
    constructor(uiSubject)
    {
        super(uiSubject);

        this.message = null;
        this.fontSize = 80;
        this.font = null;
        this.fillStyle = "#00f";
    }

    update(camera)
    {
        super.update(camera);
        this.font = this.fontSize * (1 / this.camera.scale) + "px Roboto";
    }

    draw(ctx)
    {
        if (this.message)
        {
            ctx.font = this.font;
            ctx.textBaseline = "middle";
            let textWidth = ctx.measureText(this.message);
            let pos = new Vector(this.camBounds.width / 2 - textWidth.width / 2, this.camBounds.height / 2);
            ctx.fillStyle = this.fillStyle;
            ctx.fillText(this.message, pos.x, pos.y);
        }
    }

    setMessage(msg, duration)
    {
        this.message = msg;
        if (duration)
            setTimeout(() => this.unsetMessage(), duration);
    }

    unsetMessage()
    {
        this.message = null;
    }
}