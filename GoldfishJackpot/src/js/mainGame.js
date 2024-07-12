import { BoundingBox, Input, Scene, Timer } from 'excalibur';
import { Player } from './player.js';
import { SeaBorder } from './seaBorder.js';
import { House } from './house.js';
import { Sea } from './sea.js';
import { Border } from './border.js';
import { Resources } from './resources.js';
import { UI } from './ui.js';
import { smithScene } from './smithScene.js';
import { TrophyCount } from './trophycount.js';
import { newUI } from './newUI.js';


export class GameScene extends Scene {
    constructor(engine) {
        super();
        this.engine = engine;
        this.fishingCooldown = 1000; // Cooldown period in milliseconds (2 seconds)
        this.lastFishingTime = 0; // Timestamp of the last fishing action
    }

    onInitialize(engine) {
        Resources.tiledMap.addToScene(this);
        const initialZoomLevel = 2;
        this.camera.zoom = initialZoomLevel;

        const player = new Player(engine.drawWidth / 2, engine.drawHeight / 2, this);
        this.player = player;
        engine.currentScene.camera.strategy.lockToActor(player);
        engine.currentScene.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 1980, 1088));

        const house = new House(1096, 219);
        const sea = new Sea(960, 1050, 3000, 200);
        const sea1 = new Sea(0, 850, 600, 3000);
        const sea2 = new Sea(1930, 945, 1000, 1250);
        const sea3 = new Sea(1985, 315, 440, 800);
        const border = new Border(0, -20, 5000, 10, this);

        const seaBorder = new SeaBorder(960, 1050, 3040, 220);
        const seaBorder1 = new SeaBorder(0, 850, 620, 3020);
        const seaBorder2 = new SeaBorder(1930, 945, 1040, 1270);
        const seaBorder3 = new SeaBorder(1985, 315, 480, 800);

        this.ui = new UI(this.engine);
        this.add(this.ui);
        this.newUI = new newUI(this.engine);
        this.add(this.newUI);


        this.add(house);
        this.add(sea);
        this.add(sea1);
        this.add(sea2);
        this.add(sea3);
        this.add(border);
        this.add(player);
        this.add(seaBorder);
        this.add(seaBorder1);
        this.add(seaBorder2);
        this.add(seaBorder3);

        engine.input.keyboard.on('press', (event) => {
            if (event.key === Input.Keys.Enter) {
                this.handleFishing();
            }
        });

        player.on('collisionstart', (evt) => {
            if (evt.other instanceof SeaBorder) {
                player.enableFishing();
            } else if (evt.other instanceof House) {
                engine.goToScene('smith');
            }
        });

        player.on('collisionend', (evt) => {
            if (evt.other instanceof SeaBorder) {
                player.disableFishing();
            }
        });
    }

    handleFishing() {
        const currentTime = Date.now();
        if (currentTime - this.lastFishingTime >= this.fishingCooldown) {
            // Sufficient cooldown period has passed, allow fishing
            // @ts-ignore
            this.player.fish();
            this.lastFishingTime = currentTime;
        }
    }

    onPreUpdate(engine, delta) {
        // Check gamepad input for fishing
        const gamepad = engine.input.gamepads.at(0);
        if (gamepad && gamepad.isButtonPressed(Input.Buttons.Face1)) {
            this.handleFishing();
        }
    }
}
