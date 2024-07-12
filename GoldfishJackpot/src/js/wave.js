import { Actor, Engine, Scene, Label, FontUnit, Color, Input, CollisionType } from 'excalibur';

// Create a new Excalibur game
const game = new Engine({
  width: 800,
  height: 600,
});

// Define the MainScene
class MainScene extends Scene {
  onInitialize(engine) {
    const label = new Label({
      text: 'Welcome to the Main Scene!',
      pos: { x: 400, y: 100 },
      font: {
        size: 32,
        unit: FontUnit.Px,
        color: Color.Black,
      },
    });
    this.add(label);

    // Add a door actor
    const door = new Actor({
      pos: { x: 400, y: 300 },
      width: 100,
      height: 200,
      color: Color.Brown,
    });
    door.body.collisionType = CollisionType.Fixed;
    this.add(door);

    // Add a player actor
    const player = new Actor({
      pos: { x: 200, y: 300 },
      width: 50,
      height: 50,
      color: Color.Blue,
    });
    player.body.collisionType = CollisionType.Active;
    player.body.useBoxCollider(50, 50);
    this.add(player);

    // Detect collision with the door
    player.on('postcollision', (evt) => {
      if (evt.other === door) {
        this.openDialog(engine);
      }
    });

    // Add controls to move the player
    this.on('postupdate', () => {
      const speed = 100;
      if (engine.input.keyboard.isHeld(Input.Keys.W)) {
        player.vel.y = -speed;
      } else if (engine.input.keyboard.isHeld(Input.Keys.S)) {
        player.vel.y = speed;
      } else {
        player.vel.y = 0;
      }

      if (engine.input.keyboard.isHeld(Input.Keys.A)) {
        player.vel.x = -speed;
      } else if (engine.input.keyboard.isHeld(Input.Keys.D)) {
        player.vel.x = speed;
      } else {
        player.vel.x = 0;
      }
    });
  }

  openDialog(engine) {
    const dialogBackground = new Actor({
      pos: { x: 400, y: 300 },
      width: 400,
      height: 200,
      color: Color.Gray,
    });
    this.add(dialogBackground);

    const option1 = new Label({
      text: '1. Go to Smit Scene',
      pos: { x: 350, y: 250 },
      font: {
        size: 24,
        unit: FontUnit.Px,
        color: Color.White,
      },
    });
    this.add(option1);

    const option2 = new Label({
      text: '2. Stay here',
      pos: { x: 350, y: 350 },
      font: {
        size: 24,
        unit: FontUnit.Px,
        color: Color.White,
      },
    });
    this.add(option2);

    // Add event listener for key press
    engine.input.keyboard.once('press', (evt) => {
      if (evt.key === Input.Keys.Digit1) {
        engine.goToScene('smit');
      } else if (evt.key === Input.Keys.Digit2) {
        this.remove(dialogBackground);
        this.remove(option1);
        this.remove(option2);
      }
    });
  }
}

// Define the SmitScene
class SmitScene extends Scene {
  onInitialize(engine) {
    const label = new Label({
      text: 'Welcome to the Smit Scene!',
      pos: { x: 400, y: 100 },
      font: {
        size: 32,
        unit: FontUnit.Px,
        color: Color.Black,
      },
    });
    this.add(label);
  }
}

// Add the scenes to the game
game.add('main', new MainScene());
game.add('smit', new SmitScene());

// Start the game with the MainScene
game.goToScene('main');

// Start the game
game.start();
