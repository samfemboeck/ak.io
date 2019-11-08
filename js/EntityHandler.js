import {Vector} from "./Vector.js";

export class EntityHandler
{
    constructor(game)
    {
        this.game = game;
        this.entities = [];
    }

    add(entity)
    {
        if (!entity.TAG || entity.TAG === EntityHandler.TAGS.NONE)
        {
            console.error("Cant add entity with invalid tag.");
            return;
        }

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
                console.log("deleted")
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
                if (this.entities[a].TAG === EntityHandler.TAGS.NONE ||
                    this.entities[b].TAG === EntityHandler.TAGS.NONE ||
                    this.entities[a].LAYER === this.entities[b].LAYER)
                    continue;

                let normalsA = this.getLeftNormals(this.entities[a].vertices);
                let normalsB = this.getLeftNormals(this.entities[b].vertices);

                let collisionA = this.checkProjectionsForCollision(this.entities[a].vertices, this.entities[b].vertices, normalsA);
                let collisionB = this.checkProjectionsForCollision(this.entities[a].vertices, this.entities[b].vertices, normalsB);

                if (collisionA && collisionB)
                {
                    this.entities[a].onCollide(this.entities[b]);
                    this.entities[b].onCollide(this.entities[a]);
                }
            }
        }
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

EntityHandler.TAGS = {NONE: 0, PLAYER: 1, OPPONENT: 2, BULLET: 3};
EntityHandler.LAYERS = {PLAYER: 0, OPPONENT: 1};