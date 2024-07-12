import { Actor, Color, CollisionType } from 'excalibur';
import { Player } from './player.js'

export class House extends Actor{
    constructor(x, y){
        super({
            x: x, 
            y: y,
            width: 30,
            height: 10,
            color: Color.Black,
        });
        this.body.collisionType = CollisionType.Fixed;
        this.on('precollision', this.onPreCollision);
    }
    onPreCollision(evt) {
        if (evt.other instanceof Player) {
            console.log("U heeft de deur geraakt");
        }
    }
}
