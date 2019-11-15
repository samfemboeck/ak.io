import {Player} from "./Sprite/Player.js";
import {Map} from "./Map.js";
import {AI} from "./Sprite/AI.js";
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

// TODO setter umschreiben auf ECMA6
// TODO Event Handler
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
        this.scoreBoard = new Scoreboard(this.uiSubject);
        this.scoreBoard.addGun(this.player);

        for (let i = 0; i < 6; i++)
        {
            let bot = new AI(this.spriteSubject, this.player);
            bot.setRandomPosition();
            this.scoreBoard.addGun(bot);
        }

        this.messageObject = new MessageObject(this.uiSubject);
        this.messageObject.setMessage("GO!", 1000);

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
        this.drawHandler.draw(sprites);
        this.drawHandler.drawUI(this.uiSubject.update());
        this.camera.update();
    }

    end(winner)
    {
        this.messageObject.setMessage(winner.displayName + " wins!");
        setTimeout(() => this.isActive = false, 10);
    }
}
