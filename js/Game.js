import {Player} from "./Sprite/Player.js";
import {Map} from "./Map.js";
import {Bot} from "./Sprite/Bot.js";
import {CollisionHandler} from "./CollisionHandler.js";
import {DrawHandler} from "./DrawHandler.js";
import {Camera} from "./Camera.js";
import {SpriteSubject} from "./Subjects/SpriteSubject.js";
import {UISubject} from "./Subjects/UISubject.js";
import {EventHandler} from "./EventHandler.js";
import {Scoreboard} from "./UI/Scoreboard.js";
import {MessageObject} from "./UI/MessageObject.js";

/**
 * Game Loop + Event Delegation
 */
export class Game
{
    constructor()
    {
        this.isActive = true;
        this.spriteSubject = new SpriteSubject(this);
        this.uiSubject = new UISubject(this);
        this.collisionHandler = new CollisionHandler(this);
        this.map = new Map(5000, 5000);
        this.drawHandler = new DrawHandler(this);
        this.eventHandler = new EventHandler(this);
    }

    start()
    {
        this.player = new Player(this.spriteSubject);
        this.player.setRandomPosition(this.map);
        this.camera = new Camera(this.drawHandler, this.player);
        this.scoreBoard = new Scoreboard(this.drawHandler.canvasScoreboard);
        this.scoreBoard.addGun(this.player);

        //this.bot = new Bot(this.spriteSubject, this.player);

        for (let i = 0; i < 6; i++)
        {
            let bot = new Bot(this.spriteSubject, this.player);
            bot.setRandomPosition();
            this.scoreBoard.addGun(bot);
        }

        this.drawHandler.drawScoreboard();

        // use everywhere
        Game.messageObject = new MessageObject(this.uiSubject);
        Game.messageObject.setMessage("Go!", 2000);

        this.mainLoop();
    }

    mainLoop()
    {
        window.requestAnimationFrame(() => this.mainLoop());
        if (!this.isActive) return;

        this.update();
    }

    update()
    {
        let sprites = this.spriteSubject.update();
        this.collisionHandler.checkCollisions(sprites);
        this.camera.update();
        this.drawHandler.draw(sprites);
        this.drawHandler.drawUI(this.uiSubject.update());
    }

    end(winner)
    {
        Game.messageObject.setMessage(winner.displayName + " wins!");
        setTimeout(() => this.isActive = false, 10);
    }
}
