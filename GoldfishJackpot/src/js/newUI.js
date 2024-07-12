import {
    ScreenElement,
    FontUnit,
    Font,
    Vector,
    Label,
    Color,
    Input,
  } from "excalibur";
  import { Resources, ResourceLoader } from "./resources";
  import { DialogueManager } from "./managers/dialogueManager";
  import { Caught } from "./caught";
  import { Trophy } from "./trophy";
  import { TrophyCount } from "./trophycount";
   
  export class newUI extends ScreenElement {
      constructor(game) {
          super();
      }
      onInitialize(engine){
         this.trophycount = new TrophyCount();
         this.trophycount.z = 100;
         this.addChild(this.trophycount);
      }
  }