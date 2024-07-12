import { Actor, Color, Font, FontUnit, Label, Vector } from "excalibur";
import { Resources } from "../resources";

export class DialogueManager {
    constructor(x, y, game) {
        this.game = game; // Ensure game is properly initialized
        this.dialogues = [];
        this.currentDialogueIndex = 0;
        this.isActive = false;

        // Dialogue box setup
        this.dialogueBox = new Actor({
            pos: new Vector(0, 0),
            anchor: new Vector(0, 0)
        });

        this.dialogueBox.anchor = new Vector(0, 0);
        

        // Dialogue text setup
        this.dialogueText = new Label({
            pos: new Vector(x - 300, y), // Adjusted for better positioning
            font: new Font({ size: 36, unit: FontUnit.Px }),
            text: '',
            color: Color.White
        });

        this.dialogueBox.z = 1000; // Ensure dialogue box is in front
        this.dialogueText.z = 1001; // Ensure dialogue text is in front of box
    }

     start(dialogues) {
        this.dialogues = dialogues;
        this.currentDialogueIndex = 0;
        this.isActive = true;
        this.showDialogue(); // Wait for dialogue to show initially
    }

     showDialogue() {
    if (this.currentDialogueIndex < this.dialogues.length) {
        this.dialogueText.text = this.dialogues[this.currentDialogueIndex];

        if (this.game) {
            try {
                const sprite = Resources.Textbox.toSprite(); // Load sprite

                if (!sprite) {
                    throw new Error('Failed to load sprite from Resources.Textbox');
                }

                this.dialogueBox.graphics.use(sprite);

                this.game.add(this.dialogueText); // Add dialogue text to game
                this.game.add(this.dialogueBox); // Add dialogue box to game

                console.log('Sprite used:', sprite.image.path);
                console.log('graphic used:', this.dialogueBox.graphics);
                console.log('Dialogue box position:', this.dialogueBox.pos.toString());
                console.log('Dialogue text position:', this.dialogueText.pos.toString());
            } catch (error) {
                console.error('Error loading or using sprite:', error);
            }
        } else {
            console.error('Game instance is not defined.');
        }
    } else {
        this.endDialogue();
    }
}

    nextDialogue() {
        this.currentDialogueIndex++;
        this.showDialogue(); // No need to await here
    }

    endDialogue() {
        this.isActive = false;
        if (this.game) {
            this.game.remove(this.dialogueBox); // Remove dialogue box from game
            this.game.remove(this.dialogueText); // Remove dialogue text from game
        }
    }
}
