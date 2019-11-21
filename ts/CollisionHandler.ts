import {Vector} from "./Vector.js";
import { Sprite } from "./Sprite/Sprite.js";

export enum LAYER
{
    NON_COLLIDABLE,
    PLAYER,
    OPPONENT,
    BULLET
}

export class CollisionHandler
{
    static LAYER = LAYER;

    checkCollisions(sprites: Sprite[]): void
    {
        for (let a = 0; a < sprites.length; a++)
        {
            for (let b = a + 1; b < sprites.length; b++)
            {
                let entityA = sprites[a];
                let entityB = sprites[b];

                if (!this.checkLayers(entityA, entityB))
                    continue;

                let normalsA: Vector[] = this.getLeftNormals(entityA.vertices);
                let normalsB: Vector[] = this.getLeftNormals(entityB.vertices);

                let collisionA: boolean = this.checkProjectionsForCollision(entityA.vertices, entityB.vertices, normalsA);
                let collisionB: boolean = this.checkProjectionsForCollision(entityA.vertices, entityB.vertices, normalsB);

                if (collisionA && collisionB)
                {
                    entityA.onCollide(entityB);
                    entityB.onCollide(entityA);
                }
            }
        }
    }

    checkLayers(a: Sprite, b: Sprite): boolean
    {
        for (let layerA of a.layers)
        {
            for (let layerB of b.layers)
            {
                if (layerA === CollisionHandler.LAYER.NON_COLLIDABLE || layerB === CollisionHandler.LAYER.NON_COLLIDABLE || layerA === layerB)
                    return false;
            }
        }
        return true;
    }

    checkProjectionsForCollision(verticesA: Vector[], verticesB: Vector[], axisList: Vector[]): boolean
    {
        for (let i = 0; i < axisList.length; i++)
        {
            let projectionA: {min: number, max: number} = this.getMinMaxProjection(verticesA, axisList[i]);
            let projectionB: {min: number, max: number} = this.getMinMaxProjection(verticesB, axisList[i]);
            let isSeparate: boolean = projectionA.min > projectionB.max || projectionB.min > projectionA.max;
            if (isSeparate)
                return false;
        }
        return true;
    }

    getLeftNormals(vertices: Vector[]): Vector[]
    {
        let normals: Vector[] = [];
        for (let i = 0; i < vertices.length - 1; i++)
        {
            normals.push(Vector.substract(vertices[i + 1], vertices[i]).normalLeft.unitVector);
        }
        normals.push(Vector.substract(vertices[0], vertices[vertices.length - 1]).normalLeft.unitVector);
        return normals;
    }

    getMinMaxProjection(vertices: Vector[], axis: Vector): {min: number, max: number}
    {
        let min:number , max: number;
        min = max = Vector.dotProduct(vertices[0], axis);

        for (let i = 1; i < vertices.length - 1; i++)
        {
            let projection: number = Vector.dotProduct(vertices[i], axis);
            if (projection > max)
                max = projection;
            else if (projection < min)
                min = projection;
        }

        return {min, max};
    }
}