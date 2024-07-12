import { Actor, Sprite } from "excalibur";
import { Resources } from "./resources";

export class Caught extends Actor {
    constructor(x, y) {
        super({
            x: x,
            y: y,
            width: 50,
            height: 50,
        });

        // Initialize with a default sprite (assuming Resources.nothing.toSprite() exists)
        const defaultSprite = Resources.nothing.toSprite(); // Replace with appropriate default sprite
        this.graphics.use(defaultSprite);
    }

    changeSprite(type) {
        let sprite;
        switch (type) {
            case 'gold':
                sprite = Resources.gold.toSprite();
                break;
            case 'trash':
                sprite = Resources.trash.toSprite();
                break;
            case 'nothing':
                sprite = Resources.nothing.toSprite();
                break;
            default:
                sprite = Resources.nothing.toSprite(); // Default to nothing if type is unknown
                break;
        }
        this.graphics.use(sprite);
    }
}
