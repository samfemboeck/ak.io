export class DrawHandler
{
    constructor(entityHandler)
    {
        this.entityHandler = entityHandler;
    }

    draw(sprites)
    {
        let ctx = this.entityHandler.game.ctx;
        let map = this.entityHandler.game.map;

        ctx.clearRect(0, 0, map.width, map.height);

        for (let sprite of sprites)
        {
            ctx.save();
            ctx.translate(sprite.position.x, sprite.position.y);
            ctx.rotate(sprite.rotation);
            ctx.scale(sprite.scale, sprite.scale);
            ctx.scale(DrawHandler.globalScale, DrawHandler.globalScale);
            sprite.draw(ctx);
            ctx.restore();
        }
    }
}

DrawHandler.globalScale = 1;