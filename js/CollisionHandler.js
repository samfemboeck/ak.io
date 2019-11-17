import {Vector} from "./Vector.js";

export class CollisionHandler
{
    constructor(game)
    {
        this.game = game;
    }

    checkCollisions(entities)
    {
        for (let a = 0; a < entities.length; a++)
        {
            for (let b = a + 1; b < entities.length; b++)
            {
                let entityA = entities[a];
                let entityB = entities[b];

                if (!this.checkLayers(entityA, entityB))
                    continue;

                let normalsA = this.getLeftNormals(entityA.vertices);
                let normalsB = this.getLeftNormals(entityB.vertices);

                let collisionA = this.checkProjectionsForCollision(entityA.vertices, entityB.vertices, normalsA);
                let collisionB = this.checkProjectionsForCollision(entityA.vertices, entityB.vertices, normalsB);

                if (collisionA && collisionB)
                {
                    entityA.onCollide(entityB);
                    entityB.onCollide(entityA);
                }
            }
        }
    }

    checkLayers(entityA, entityB)
    {
        for (let layerA of entityA.LAYERS)
        {
            for (let layerB of entityB.LAYERS)
            {
                if (layerA === CollisionHandler.LAYERS.NON_COLLIDABLE || layerB === CollisionHandler.LAYERS.NON_COLLIDABLE || layerA === layerB)
                    return false;
            }
        }
        return true;
    }

    checkProjectionsForCollision(verticesA, verticesB, axisList)
    {
        for (let i = 0; i < axisList.length; i++)
        {
            let projectionA = this.getMinMaxProjection(verticesA, axisList[i]);
            let projectionB = this.getMinMaxProjection(verticesB, axisList[i]);
            let isSeparate = projectionA.min > projectionB.max || projectionB.min > projectionA.max;
            if (isSeparate)
                return false;
        }
        return true;
    }

    getLeftNormals(vertices)
    {
        let normals = [];
        for (let i = 0; i < vertices.length - 1; i++)
        {
            normals.push(Vector.substract(vertices[i + 1], vertices[i]).normalLeft.unitVector);
        }
        normals.push(Vector.substract(vertices[0], vertices[vertices.length - 1]).normalLeft.unitVector);
        return normals;
    }

    getMinMaxProjection(vertices, axis)
    {
        let min, max;
        min = max = Vector.dotProduct(vertices[0], axis);

        for (let i = 1; i < vertices.length - 1; i++)
        {
            let projection = Vector.dotProduct(vertices[i], axis);
            if (projection > max)
                max = projection;
            else if (projection < min)
                min = projection;
        }

        return {min, max};
    }
}

CollisionHandler.LAYERS = {NON_COLLIDABLE: 0, PLAYER: 1, OPPONENT: 2, BULLET: 3};