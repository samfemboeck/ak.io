import {Vector} from "./Vector.js";

export class MyMath
{
        static getRotatedPosition(pos, radians, pivot)
        {
            let v = new Vector(0, 0);
            v.x = (pos.x - pivot.x) * Math.cos(radians) - (pos.y - pivot.y) * Math.sin(radians) + pivot.x;
            v.y = (pos.x - pivot.x) * Math.sin(radians) + (pos.y - pivot.y) * Math.cos(radians) + pivot.y;
            return v.round();
        }

        static getRotationForDirection(vector)
        {
            return -Math.atan2(vector.x, vector.y);
        }
}

