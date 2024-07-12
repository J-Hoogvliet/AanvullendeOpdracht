import { ScreenElement, FontUnit, Font, Vector, Label, Color, Input } from "excalibur";
import { Resources,ResourceLoader } from "./resources";
import { DialogueManager } from "./managers/dialogueManager";
import { Caught } from "./caught";
import { Trophy } from "./trophy";
import { TrophyCount } from "./trophycount";
import { smithScene } from "./smithScene";

export class UI extends ScreenElement {
    constructor(game) {
        super();
        this.hasLoggedMessage = false;
        this.spawned = false;
        let storedValue = localStorage.getItem('gold');
        this.goldfish = storedValue !== null ? parseInt(storedValue) : 0;
        if (isNaN(this.goldfish)) {
    console.error('Failed to parse goldfish count from localStorage.');
    // Handle the error or provide a default value
        }
        let storedValue2 = localStorage.getItem('cash');
        this.cash = storedValue2 !== null ? parseInt(storedValue2) : 0;
        if (isNaN(this.cash)) {
            console.error('Failed to parse goldfish count from localStorage.');
    // Handle the error or provide a default value
    }
        this.game = game;
        this.caught = "niks"
        this.goldLabel = new Label({
            text: `Goldfish: ${this.goldfish}`,
            color: Color.White,
            pos: new Vector(170, 140),
            font: new Font({
                family: "impact",
                size: 24,
                unit: FontUnit.Px,
            }),
        });
         this.cashLabel = new Label({
            text: `Cash: ${this.cash}`,
            color: Color.White,
            pos: new Vector(170, 190),
            font: new Font({
                family: "impact",
                size: 24,
                unit: FontUnit.Px,
            }),
        });
         this.caughtLabel = new Label({
            text: "Last Caught:",
            color: Color.White,
            pos: new Vector(170, 240),
            font: new Font({
                family: "impact",
                size: 24,
                unit: FontUnit.Px,
            }),
        });
        this.caught = new Caught(325,255)
        this.catchLabel = new Label({
        pos: new Vector(10, 10), // Position of the label
        font: new Font({ size: 16, unit: FontUnit.Px }),
        text: 'Caught: ', // Initial text
        color: Color.White
    });

    this.Trophy = new Trophy()
    this.Trophy.graphics.use(Resources.TrophyGreen.toSprite())
    this.Trophy.pos = new Vector(198, 70);
    }

    onInitialize(engine) {
        this.goldLabel.z = 1000;
        this.cashLabel.z = 1000;
        this.caughtLabel.z = 1000;
        this.caught.z = 1000;
        this.Trophy.z = 1001
        if (this.game) {
            // Access properties or call methods safely
            console.log('Game instance:', this.game);
          } else {
            console.error('Game instance is undefined!');
          }
      
        
        this.addChild(this.goldLabel);
        this.addChild(this.cashLabel);
        this.addChild(this.caughtLabel);
        if(!this.spawned){
            this.addChild(this.Trophy)
            this.spawned = true
        }
       
        this.addChild(this.caught);
     
    }
      

onPostUpdate(){
    let storedValue = localStorage.getItem('gold');
        this.goldfish = storedValue !== null ? parseInt(storedValue) : 0;
        this.goldLabel.text = `Goldfish: ${this.goldfish}`
        if (isNaN(this.goldfish)) {
    console.error('Failed to parse goldfish count from localStorage.');
    // Handle the error or provide a default value
        }
        let storedValue2 = localStorage.getItem('cash');
        this.cash = storedValue2 !== null ? parseInt(storedValue2) : 0;
        this.cashLabel.text = `Cash: ${this.cash}`
        if (isNaN(this.cash)) {
            console.error('Failed to parse goldfish count from localStorage.');
    // Handle the error or provide a default value
    }
    if (this.cash >= 5000 && this.cash <= 9999) {
        this.Trophy.graphics.use(Resources.TrophyBronze.toSprite());
      } else if (this.cash >= 10000 && this.cash <= 14999) {
        this.Trophy.graphics.use(Resources.TrophySilver.toSprite());
      } else if (this.cash >= 15000 && this.cash <= 19999) {
        this.Trophy.graphics.use(Resources.TrophyGold.toSprite());
      } else if (this.cash >= 20000 && this.cash <= 29999) {
        this.Trophy.graphics.use(Resources.TrophyDiamond.toSprite());
      } else if (this.cash >= 30000) {
        this.Trophy.graphics.use(Resources.TrophyBlack.toSprite());
      }
}

   addPoint() {
    this.goldfish++;
    this.goldLabel.text = `Goldfish: ${this.goldfish}`;
    localStorage.setItem('gold', this.goldfish.toString());
    console.log(this.getCash())
}
    removePoint(){
       if (this.goldfish > 0) {
        this.goldfish--;
        this.goldLabel.text = `Goldfish: ${this.goldfish}`;
        localStorage.setItem('gold', this.goldfish.toString());
    }
    }
    addCash(amount){
        this.cash = this.cash + amount;
        this.cashLabel.text = `Cash: ${this.cash}`;
        localStorage.setItem('cash', this.cash.toString());
    }

     removeCash(amount){
        this.cash = this.cash - amount;
        this.cashLabel.text = `Cash: ${this.cash}`;
    }

    getCash(){
        return this.cash;
    }

    changeText(text){
        this.caughtLabel.text = `Last Caught:`;
    }
    updateLocalStorage() {
        localStorage.setItem("gold", this.goldfish.toString());
        localStorage.setItem("cash", this.cash.toString());
      }
}
