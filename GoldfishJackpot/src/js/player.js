import { Actor, Input, CollisionType } from 'excalibur';
import { Resources } from './resources.js'; // Adjust import path as necessary
import { DialogueManager } from './managers/dialogueManager.js';
import { GameScene } from './mainGame.js';
import { UI } from './ui.js';

export class Player extends Actor {
    constructor(x, y, game) {
        super({
            x: x,
            y: y,
            width: 50,
            height: 50,
            collisionType: CollisionType.Active,
        });
        this.z = 60;
        this.speed = 100;
        const sprite = Resources.Player.toSprite(); // Assuming Resources.Player is defined properly
        sprite.scale.setTo(0.8, 0.8);
        this.graphics.use(sprite);
        this.game = game;
        this.canFish = false; // Flag to determine if player can fish
    }

    onInitialize(engine) {
        this.on('postupdate', () => {
            this.vel.x = 0;
            this.vel.y = 0;

            // Keyboard controls
            if (engine.input.keyboard.isHeld(Input.Keys.W)) {
                this.vel.y = -this.speed;
                const sprite = Resources.Player_back.toSprite();
                sprite.scale.setTo(0.8, 0.8);
                this.graphics.use(sprite);
            }
            if (engine.input.keyboard.isHeld(Input.Keys.S)) {
                const sprite = Resources.Player.toSprite();
                sprite.scale.setTo(0.8, 0.8);
                this.graphics.use(sprite);
                this.vel.y = this.speed;
            }
            if (engine.input.keyboard.isHeld(Input.Keys.A)) {
                const sprite = Resources.Player_left.toSprite();
                sprite.scale.setTo(1, 1);
                this.graphics.use(sprite);
                this.vel.x = -this.speed;
            }
            if (engine.input.keyboard.isHeld(Input.Keys.D)) {
                const sprite = Resources.Player_right.toSprite();
                sprite.scale.setTo(1, 1);
                this.graphics.use(sprite);
                this.vel.x = this.speed;
            }

            // Gamepad controls
            const gamepads = navigator.getGamepads();
            if (gamepads[0]) {
                const gamepad = gamepads[0];
                const threshold = 0.2; // Deadzone threshold

                // Left stick controls
                if (Math.abs(gamepad.axes[0]) > threshold) {
                    this.vel.x = gamepad.axes[0] * this.speed;
                    if (gamepad.axes[0] < 0) {
                        const sprite = Resources.Player_left.toSprite();
                        sprite.scale.setTo(1, 1);
                        this.graphics.use(sprite);
                    } else {
                        const sprite = Resources.Player_right.toSprite();
                        sprite.scale.setTo(1, 1);
                        this.graphics.use(sprite);
                    }
                }
                if (Math.abs(gamepad.axes[1]) > threshold) {
                    this.vel.y = gamepad.axes[1] * this.speed;
                    if (gamepad.axes[1] < 0) {
                        const sprite = Resources.Player_back.toSprite();
                        sprite.scale.setTo(0.8, 0.8);
                        this.graphics.use(sprite);
                    } else {
                        const sprite = Resources.Player.toSprite();
                        sprite.scale.setTo(0.8, 0.8);
                        this.graphics.use(sprite);
                    }
                }
            }
        });
    }

    enableFishing() {
        this.canFish = true; // Enable fishing
    }

    disableFishing() {
        this.canFish = false; // Disable fishing
    }

    fish() {
        if (this.canFish) {
            const outcomes = ['trash', 'nothing', 'gold'];
            const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];

            const scene = this.scene;
            // @ts-ignore (Deze fout is er, maar game werkt wel.)
            const ui = scene?.ui;

            if (ui) {
                switch (randomOutcome) {
                    case 'trash':
                        this.removeGold();
                        ui.caught.changeSprite('trash');
                        ui.changeText('Trash');
                        break;
                    case 'nothing':
                        ui.changeText('Niks');
                        ui.caught.changeSprite('nothing');
                        break;
                    case 'gold':
                        this.addGold();
                        ui.changeText('Goud');
                        ui.caught.changeSprite('gold');
                        break;
                }
            } else {
                console.error('UI is not available in the current scene.');
            }
        } else {
            console.log('Je kan hier niet vissen, ei');
        }
    }

    addGold() {
        const scene = this.scene;
        if (scene instanceof GameScene) {
            scene.ui?.addPoint();
        } else {
            console.warn("addPoint method not found on engine");
        }
    }

    removeGold() {
        const scene = this.scene;
        if (scene instanceof GameScene) {
            scene.ui?.removePoint();
        } else {
            console.warn("removePoint method not found on engine");
        }
    }

    addCash(gold) {

    }

    removeCash(amount) {

    }
}