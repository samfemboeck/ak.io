import {UIElement} from "./UIElement.js";
import {Vector} from "../Vector.js";

export class MessageObject extends UIElement
{
    private message: string[] = [];
    private readonly regex = new RegExp("<(#\\w{3,6})>", "g");
    private readonly regexHexValue = new RegExp("#\\w{3,6}");
    private readonly boxMargin = 200;
    private readonly yOffset = 20;

    draw(ctx: CanvasRenderingContext2D): void
    {
        if (this.message.length > 0)
        {
            let boxHeight = this.camBounds.height / 15;
            ctx.font = 0.43 * boxHeight + "px Roboto";
            ctx.textBaseline = "middle";
            let textWidth = ctx.measureText(this.getMessage()).width;
            let boxWidth = textWidth + 2 * this.boxMargin;
            ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            this.roundRect(ctx, this.camBounds.width / 2 - boxWidth / 2, this.yOffset, boxWidth, boxHeight);

            ctx.fillStyle = "#fff";
            let pos = new Vector(this.camBounds.width / 2 - textWidth / 2, this.yOffset + boxHeight / 2);
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

    roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number)
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

    getMessage(): string
    {
        let ret = "";
        for (let part of this.message)
        {
            if (!this.regexHexValue.test(part))
                ret += part;
        }
        return ret;
    }

    scheduleMessage(msg: string, duration: number): void
    {
        if (this.message.length > 0)
        {
            let proxyMessage = this.setMessage.bind(this);
            setTimeout(() => proxyMessage(msg, duration), 100);
        }
        else
        {
            this.setMessage(msg);
            if (duration)
                setTimeout(() => this.unsetMessage(), duration);
        }
    }

    setMessage(msg: string)
    {
        this.message = msg.split(this.regex);
    }

    unsetMessage()
    {
        this.message = [];
    }
}