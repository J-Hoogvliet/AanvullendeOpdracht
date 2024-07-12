import { Scene, Label, Input, Color, Engine, Font, FontUnit , Actor, Vector} from 'excalibur'; 
import { smithScene } from './smithScene';
import { Background } from './background';
import { Resources, ResourceLoader } from './resources';

export class TrophyCount extends Actor {
    constructor(){
        super({
            
            width: Resources.TrophyCount.width,
            height: Resources.TrophyCount.height,
            pos: new Vector(0, 0),
            anchor: new Vector(0, 0)
        })
    }
    onInitialize(){
        const sprite = Resources.TrophyCount.toSprite();    
        this.graphics.use(sprite);
        console.log(sprite)
        console.log(this.graphics)
    }
}