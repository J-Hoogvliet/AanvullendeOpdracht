import { Scene, Label, Input, Color, Engine, Font, FontUnit , Actor, Vector} from 'excalibur'; 
import { smithScene } from './smithScene';
import { Background } from './background';
import { Resources, ResourceLoader } from './resources';

export class Trophy extends Actor {
    constructor(){
        super({
            
            width: Resources.TrophyGreen.width * 4,
            height: Resources.TrophyGreen.height * 4,
           
    
        })
    }
    onInitialize(){
        const sprite = Resources.TrophyGreen.toSprite();
        this.graphics.use(sprite);
    }
}