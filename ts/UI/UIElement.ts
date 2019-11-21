import {UISubject} from "./UISubject.js";
import {Camera} from "../Camera.js";
import {Bounds} from "../Bounds.js";
import {Observer} from "../Interface/Observer.js";

export abstract class UIElement implements Observer
{
    camera: Camera = null;
    camBounds: Bounds = null;

    constructor(public subj: UISubject)
    {
        this.subj.add(this);
    }

    update(cam: Camera): this
    {
        this.camera = cam;
        this.camBounds = this.camera.bounds;
        return this;
    }

    abstract draw(ctx: CanvasRenderingContext2D): void;
}