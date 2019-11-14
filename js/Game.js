import {Player} from "./Sprite/Player.js";
import {Map} from "./Map.js";
import {AI} from "./Sprite/AI.js";
import {CollisionHandler} from "../CollisionHandler.js";
import {DrawHandler} from "../DrawHandler.js";
import {Camera} from "./Camera.js";
import {SpriteSubject} from "./Subjects/SpriteSubject.js";
import {UISubject} from "./Subjects/UISubject.js";
import {EventHandler} from "../EventHandler.js";

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
        this.opponent = new AI(this.spriteSubject, this.player);
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
        let uiElements = this.uiSubject.update();
        this.drawHandler.drawUI(uiElements);
        this.camera.update();
    }
}
