import {UIElement} from "./UIElement.js";
import {Vector} from "../Vector.js";

export class MessageObject extends UIElement
{
    constructor(uiSubject)
    {
        super(uiSubject);

        this.message = [];
        this.regex = new RegExp("<(#\\w{3,6})>", "g");
        this.regexHexValue = new RegExp("#\\w{3,6}");
        this.boxMargin = 200;
        this.yOffset = 50;
        this.fontColor = "#fff";
    }

    update(camera)
    {
        super.update(camera);
    }

    draw(ctx)
    {
        if (this.message.length > 0)
        {
            debugger;
            let yOffset = 20;
            let boxHeight = this.camBounds.height / 15;
            ctx.font = 0.43 * boxHeight + "px Roboto";
            ctx.textBaseline = "middle";
            let textWidth = ctx.measureText(this.getMessageString()).width;
            let boxWidth = textWidth + 2 * this.boxMargin;
            ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            this.roundRect(ctx, this.camBounds.width / 2 - boxWidth / 2, yOffset, boxWidth, boxHeight);

            ctx.fillStyle = "#fff";
            let pos = new Vector(this.camBounds.width / 2 - textWidth / 2, yOffset + boxHeight / 2);
            for (let part of this.message)
            {
                if (this.regexHexValue.test(part))
                {
                    ctx.fillStyle = part;
                }
                else
                {
                    ctx.fillText(part, pos.x, pos.y);
                    pos.x += ctx.measureText(part).width;
                }
            }
        }
    }

    roundRect(ctx, x, y, width, height)
    {
        let radius = height / 2;
        ctx.beginPath();
        ctx.arc(x + radius, y + radius, radius, 1.5 * Math.PI, 0.5 * Math.PI, true);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + width - radius, y + radius, radius, 1.5 * Math.PI, 0.5 * Math.PI, false);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.lineTo(x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.lineTo(x + radius, y);
        ctx.closePath();
        ctx.fill();
    }

    getMessageString()
    {
        let ret = "";
        for (let part of this.message)
        {
            if (!this.regexHexValue.test(part))
                ret += part;
        }
        return ret;
    }


    //TODO schedule message
    setMessage(msg, duration)
    {
        if (this.message.length > 0)
        {
            setTimeout(this.setMessage.bind(this), 500);
        }
        else
        {
            this.message = msg.split(this.regex);
            if (duration)
                setTimeout(() => this.unsetMessage(), duration);
        }
    }

    unsetMessage()
    {
        this.message = [];
    }
}