import { Actor, Color, CollisionType } from 'excalibur';
import { Player } from './player.js';

export class SeaBorder extends Actor {
    constructor(x, y, width, height) {
        super({
            x: x,
            y: y,
            width: width,
            height: height,
        });
        this.body.collisionType = CollisionType.Passive; 
        this.on('precollision', this.onPreCollision.bind(this)); 
    }

    onPreCollision(evt) {
        if (evt.other instanceof Player) {
            // console.log("You can fish here");
        }
    }
}
