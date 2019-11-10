import {Vector} from "./Vector.js"

export class DrawHandler
{
    constructor(game)
    {
        this.game = game;
    }

    draw(sprites)
    {
        let ctx = this.game.ctx;
        let map = this.game.map;

        ctx.clearRect(0, 0, map.width, map.height);

        for (let sprite of sprites)
        {
            ctx.save();
            ctx.translate(sprite.position.x, sprite.position.y);
            ctx.rotate(sprite.rotation);
            ctx.scale(sprite.scale, sprite.scale);
            sprite.draw(ctx);
            ctx.restore();
        }
    }

    setScale(sc)
    {
        let ctx = this.game.ctx;
        let currentScale = ctx.getTransform().a;
        if (sc === currentScale)
            return;

        let factor = (1 / currentScale) * sc;
        ctx.scale(factor, factor);

        // recenter
        currentScale = ctx.getTransform().a;
        let newCenter = new Vector(ctx.canvas.width / 2 * (1 / currentScale), ctx.canvas.height / 2 * (1 / currentScale));
        let transform = Vector.times(Vector.substract(newCenter, this.game.player.position), currentScale);
        ctx.setTransform(currentScale, 0, 0, currentScale, transform.x, transform.y);
    }
}