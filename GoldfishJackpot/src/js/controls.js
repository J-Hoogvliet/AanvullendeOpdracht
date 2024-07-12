import { Scene, Actor, Vector, Sprite, Input } from 'excalibur';
import { Resources } from './resources';

export class ControlsScene extends Scene {
    constructor(game) {
        super();
        this.game = game;
    }

    onInitialize(engine) {
        console.log("Initializing ControlsScene");

        // Titel sprite
        const titleSprite = new Sprite({
            image: Resources.Titel,
            destSize: { width: 1000, height: 500 }
        });
        const titleActor = new Actor({
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2 - 250),
            anchor: new Vector(0.5, 0.5)
        });
        titleActor.graphics.use(titleSprite);
        this.add(titleActor);

        // Control sprite
        const controlSprite = new Sprite({
            image: Resources.Controlpixel,
            destSize: { width: 600, height: 600 }
        });
        const controlActor = new Actor({
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2),
            anchor: new Vector(0.5, 0.5)
        });
        controlActor.graphics.use(controlSprite);
        this.add(controlActor);

        // Home button sprite
        const homeSprite = new Sprite({
            image: Resources.Home,
            destSize: { width: 300, height: 75 }
        });
        const homeHoverSprite = new Sprite({
            image: Resources.HomeSelect,
            destSize: { width: 300, height: 75 }
        });

        // Maak de home knop actor
        const home = new Actor({
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2 + 350),
            anchor: new Vector(0.5, 0.5)
        });
        home.graphics.use(homeSprite);
        this.add(home);

        // Event handler voor klikken op de home knop (muis)
        home.on('pointerup', () => {
            this.goToBeginScene();
        });

        // Event handlers voor hover en leave events (muis)
        home.on('pointerenter', () => {
            home.graphics.use(homeHoverSprite);
        });

        home.on('pointerleave', () => {
            home.graphics.use(homeSprite);
        });
    }
    goToBeginScene() {
        this.game.goToScene('begin');
    }

    onPreUpdate(engine, delta) {
        const gamepad = engine.input.gamepads.at(0);
            if (gamepad.isButtonPressed(Input.Buttons.Face2)) {
                this.game.goToScene('begin');
            }
    }
}
   

