import { Actor, Color, Vector, CollisionType } from "excalibur";

export class Border extends Actor {
    constructor(x, y, width, height, engine) {
        super({
            pos: new Vector(x,y),
            width: width,
            height: height,
            collisionType: CollisionType.Fixed
          
        });
    }
}