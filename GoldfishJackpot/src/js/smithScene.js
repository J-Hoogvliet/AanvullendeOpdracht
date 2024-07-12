import { Scene, Label, Input, Color, Font, FontUnit, Vector } from 'excalibur';
import { Background } from './background';
import { Trophy } from './trophy';
import { UI } from './ui';
import { Resources } from './resources'; // Zorg ervoor dat de juiste resources zijn geïmporteerd

export class smithScene extends Scene {
  constructor(game) {
    super();
    this.game = game;
    this.goldfishPerCoin = 1; // Aantal goudvissen dat nodig is voor 1 munt
    this.coinsPerConversion = 2000; // Aantal munten dat wordt verkregen per conversie
  }

  onInitialize(data, engine) {
    let storedValue = localStorage.getItem("gold");
    this.goldfish = storedValue !== null ? parseInt(storedValue) : 0;
    if (isNaN(this.goldfish)) {
      console.error("Kan aantal goudvissen niet parsen uit localStorage.");
      // Behandel de fout of geef een standaardwaarde op
    }
    let storedValue2 = localStorage.getItem("cash");
    this.cash = storedValue2 !== null ? parseInt(storedValue2) : 0;
    if (isNaN(this.cash)) {
      console.error("Kan aantal munten niet parsen uit localStorage.");
      // Behandel de fout of geef een standaardwaarde op
    }
    this.ui = new UI(this);
    this.add(this.ui);
    // this.currentTrophy = new Trophy();
    // this.currentTrophy.z = 101;
  
    // this.trophyCount(this.currentTrophy); // Update trofeeën bij initialisatie
    // this.add(this.currentTrophy);

    const background = new Background();
    this.add(background);

    const welkomTekst = new Label({
      x: 200,
      y: 800,
      text: "Hallo en welkom in mijn winkel. Lever hier uw vissen in.",
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

    const optie2Tekst = new Label({
      x: 200,
      y: 350,
      text: "2. Ga terug naar buiten.",
      color: Color.Black,
      font: new Font({ size: 24, unit: FontUnit.Px }),
    });

    // Voeg de labels toe aan de scene
    this.add(welkomTekst);
    this.add(optie1Tekst);
    this.add(optie2Tekst);

    // Event handler voor toetsenbord
    this.input.keyboard.on("press", (evt) => {
      this.handleInput(evt.key);
    });
  }

  handleInput(key) {
    if (key === Input.Keys.Digit1) {
      // Optie 1: Converteer goudvissen naar munten
      // @ts-ignore
      if (this.goldfish >= this.goldfishPerCoin) {
        this.ui?.removePoint()// Verhoog munten met conversiewaarde
        this.ui?.addCash(this.coinsPerConversion); // Update UI
        // @ts-ignore
        this.goldfish -= this.goldfishPerCoin;
        this.ui?.updateLocalStorage();
      }else{
        console.log(this.goldfish);
      }
    } else if (key === Input.Keys.Digit2) {
      this.ui?.updateLocalStorage();
      this.engine.goToScene("GameScene"); // Optie 2: Ga terug naar buiten
    }
  }

  onPreUpdate(engine, delta) {
    let storedValue = localStorage.getItem("gold");
    this.goldfish = storedValue !== null ? parseInt(storedValue) : 0;
    if (isNaN(this.goldfish)) {
      console.error("Kan aantal goudvissen niet parsen uit localStorage.");
      // Behandel de fout of geef een standaardwaarde op
    }
    // Controleer gamepad input
    const gamepad = engine.input.gamepads.at(0);
    if (gamepad) {
      if (gamepad.isButtonPressed(Input.Buttons.Face1)) {
        this.handleInput(Input.Keys.Digit1);
      } else if (gamepad.isButtonPressed(Input.Buttons.Face2)) {
        this.handleInput(Input.Keys.Digit2);
      }
    }
  }
}
