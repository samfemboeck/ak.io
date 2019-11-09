import {Vector} from "./Vector.js";

/**
 * Subject Class for handling updates and collisions
 */
export class EntityHandler
{
    constructor(game)
    {
        this.game = game;
        this.entities = [];
    }

    add(entity)
    {
        this.entities.push(entity);
    }

    remove(entity)
    {
        for (let i = 0; i < this.entities.length; i++)
        {
            if (this.entities[i] === entity)
            {
                this.entities.splice(i, 1);
            }
        }
    }

    findEntityByTag(tag)
    {
        for (let entity in this.entities)
        {
            if (entity.TAG === tag)
                return entity;
        }
    }

    updateEntities()
    {
        for (let i = 0; i < this.entities.length; i++)
        {
            let entity = this.entities[i];
            entity.update();

            if (entity.position.x < 0 ||
                entity.position.x > this.game.map.width ||
                entity.position.y < 0 ||
                entity.position.y > this.game.map.height)
            {
                this.entities.splice(i, 1);
            }
        }

        this.checkCollisions();
    }

    checkCollisions()
    {
        for (let a = 0; a < this.entities.length; a++)
        {
            for (let b = a + 1; b < this.entities.length; b++)
            {
                let entityA = this.entities[a];
                let entityB = this.entities[b];

                if (this.haveCommonLayer(entityA, entityB))
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

    haveCommonLayer(entityA, entityB)
    {
        for (let layerA in entityA.LAYERS)
        {
            for (let layerB in entityB.LAYERS)
            {
                if (layerA === layerB)
                    return true;
            }
        }
        return false;
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

EntityHandler.TAGS = {NONE: 0, PLAYER: 1, OPPONENT: 2};
EntityHandler.LAYERS = {PLAYER: 0, OPPONENT: 1, BULLET: 2};