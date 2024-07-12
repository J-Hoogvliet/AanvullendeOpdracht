import { Scene, Actor, Vector, Sprite, Input } from 'excalibur';
import { Resources } from './resources';

export class BeginScene extends Scene {
    constructor(game) {
        super();
        this.game = game;
        this.options = [];
        this.currentSelection = 0; // Keep track of the currently selected option
        this.cooldown = 0; // Cooldown timer for slower selection
    }

    onInitialize(engine) {
        // Titel label (Titel afbeelding als een Sprite)
        const TitelSprite = new Sprite({
            image: Resources.Titel,  // Resources.Titel moet correct zijn gedefinieerd in resources.js
            destSize: { width: 1000, height: 500 }
        });

        const Titel = new Actor({
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2 - 250),
            anchor: new Vector(0.5, 0.5)
        });
        Titel.graphics.use(TitelSprite);  // Gebruik de TitelSprite voor de graphics van Titel Actor
        this.add(Titel);

        // Maak en voeg de knoppen toe aan de scène
        this.addOption(engine, 'Intro', Resources.GameStart, Resources.GameStartSelect, engine.drawWidth / 2, engine.drawHeight / 2 + 150);
        this.addOption(engine, 'options', Resources.Options, Resources.OptionsSelect, engine.drawWidth / 2 + 50, engine.drawHeight / 2 + 260);
        this.addOption(engine, 'controls', Resources.Control, Resources.ControlsSelect, engine.drawWidth / 2 + 5, engine.drawHeight / 2 + 370);

        // Set initial hover effect
        this.updateSelection();
    }

    addOption(engine, scene, sprite, hoverSprite, x, y) {
        const optionSprite = new Sprite({
            image: sprite,
            destSize: { width: 300, height: 75 }
        });

        const optionHoverSprite = new Sprite({
            image: hoverSprite,
            destSize: { width: 300, height: 75 }
        });

        const option = new Actor({
            pos: new Vector(x, y),
            anchor: new Vector(0.5, 0.5)
        });

        option.graphics.use(optionSprite);
        this.add(option);

        // Voeg een event handler toe voor wanneer de muis op de knop wordt losgelaten
        option.on('pointerup', () => {
            this.game.goToScene(scene);
        });

        // Voeg event handlers toe voor hover en leave events
        option.on('pointerenter', () => {
            option.graphics.use(optionHoverSprite);
        });

        option.on('pointerleave', () => {
            option.graphics.use(optionSprite);
        });

        // Add option to the list of options
        this.options.push({ actor: option, defaultSprite: optionSprite, hoverSprite: optionHoverSprite, scene });
    }

    updateSelection() {
        this.options.forEach((option, index) => {
            if (index === this.currentSelection) {
                option.actor.graphics.use(option.hoverSprite);
            } else {
                option.actor.graphics.use(option.defaultSprite);
            }
        });
    }

    onPreUpdate(engine, delta) {
        const gamepad = engine.input.gamepads.at(0);
        if (gamepad) {
            // Decrement cooldown timer
            if (this.cooldown > 0) {
                this.cooldown -= delta;
            }

            const stickY = gamepad.getAxes(Input.Axes.LeftStickY);

            if (this.cooldown <= 0) {
                if (stickY < -0.5) {
                    this.currentSelection = (this.currentSelection - 1 + this.options.length) % this.options.length;
                    this.updateSelection();
                    this.cooldown = 500; // Set cooldown to 500ms
                }
                if (stickY > 0.5) {
                    this.currentSelection = (this.currentSelection + 1) % this.options.length;
                    this.updateSelection();
                    this.cooldown = 500; // Set cooldown to 500ms
                }
            }

            if (gamepad.isButtonPressed(Input.Buttons.Face1)) {
                const selectedOption = this.options[this.currentSelection];
                this.game.goToScene(selectedOption.scene);
            }
        }
    }
}
