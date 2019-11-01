import {Vector} from "./Vector.js";

// TODO Node.js installieren

class MyMath
{
    /*
   y' = y*cos(a) - x*sin(a)
   x' = y*sin(a) + x*cos(a)
   */
    static getPositionForRotation(pos, radians)
    {
        let v = new Vector(pos.x, pos.y);
        v.y = v.y * Math.cos(radians) - v.x * Math.sin(radians);
        v.x = v.y * Math.sin(radians) - v.x * Math.cos(radians);
    }
}

let pos = new Vector(0, 1);
console.log(Vector.equals(MyMath.getPositionForRotation(pos, 0.5 * Math.PI), new Vector(1, 0)));