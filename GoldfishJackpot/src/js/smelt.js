import { Scene, Label, Input, Color, Font, FontUnit, Vector } from 'excalibur';
import { Background } from './background';
import { Trophy } from './trophy';
import { UI } from './ui';

export class smelt extends Scene {
  constructor(goldfish, cash, game) {
    super();
    this.game = game;
    this.cash = cash;
    this.goldfish = goldfish;
    this.selectedFishCount = 0;
  }

  onInitialize(engine) {
    this.ui = new UI();
    this.add(this.ui);
    this.currentTrophy = new Trophy();
    this.currentTrophy.z = 101;
    this.currentTrophy.pos = new Vector(198, 70);
    this.add(this.currentTrophy);
    
    const background = new Background();
    this.add(background);

    const welkomTekst = new Label({
      x: 200,
      y: 800,
      text: "U heeft gekozen om uw vissen in te leveren.",
      color: Color.Black,
      font: new Font({ size: 24, unit: FontUnit.Px }),
    });

    const optie1Tekst = new Label({
      x: 200,
      y: 300,
      text: "1. Wilt u uw vissen inleveren?",
      color: Color.Black,
      font: new Font({ size: 24, unit: FontUnit.Px }),
    });

    const optie3Tekst = new Label({
      x: 200,
      y: 450,
      text: "3. Ga terug naar buiten.",
      color: Color.Black,
      font: new Font({ size: 24, unit: FontUnit.Px }),
    });

    // Voeg de labels toe aan de scene
    this.add(welkomTekst);
    this.add(optie1Tekst);
    this.add(optie3Tekst);

    // Event handler voor toetsen
    this.input.keyboard.on("press", (evt) => {
      this.handleInput(evt.key);
    });
  }

  handleInput(key) {
    if (key === Input.Keys.Digit1) {
      // Option 1: Convert goldfish to coins
      if (this.selectedFishCount > 0 && this.goldfish >= this.selectedFishCount) {
        const coinsToAdd = this.selectedFishCount * 2000;
        this.goldfish -= this.selectedFishCount;
        this.cash += coinsToAdd;
        alert(`U heeft ${this.selectedFishCount} vissen omgezet in ${coinsToAdd} munten.`);
        this.selectedFishCount = 0; // Reset selected count after conversion
      } else {
        alert("U heeft niet genoeg vissen om in te leveren.");
      }
    } else if (key === Input.Keys.Digit3) {
      this.engine.goToScene("smithScene"); // Option 3: Go back outside (redirect to GameScene)
    }
  }

  onPostUpdate(engine) {
    const trophy = new Trophy();
  }

  onPreUpdate(engine, delta) {
    // Check gamepad input for selecting fish count
    const gamepad = engine.input.gamepads.at(0);
    if (gamepad) {
      const stickY = gamepad.getAxes(Input.Axes.LeftStickY);
      if (stickY < -0.1) {
        // Move selection up (increase fish count)
        this.selectedFishCount++;
      } else if (stickY > 0.1 && this.selectedFishCount > 0) {
        // Move selection down (decrease fish count)
        this.selectedFishCount--;
      }
    }

    // Check gamepad input for other options
    if (gamepad && gamepad.isButtonPressed(Input.Buttons.Face1)) {
      this.handleInput(Input.Keys.Digit1);
    } else if (gamepad && gamepad.isButtonPressed(Input.Buttons.Face3)) {
      this.handleInput(Input.Keys.Digit3);
    }
  }
}
