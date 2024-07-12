import { Color, Engine } from 'excalibur';
import { ResourceLoader, Resources } from './resources.js';
import { GameScene } from './mainGame.js';
import { BeginScene } from './BeginScene.js';
import { OptionsScene } from './OptionsScene.js';
import { IntroScene } from './IntroScene.js';
import { smithScene } from './smithScene.js';
import { ControlsScene } from './controls.js';


export class Game extends Engine {
    constructor() {
        super({
            width: 1440,
            height: 900,
            fixedUpdateFps: 60,
            backgroundColor: Color.White
        });
        var gold = 0;
        var cash = 0;
        this.backgroundMusic = Resources.Muziek;
        
        this.start(ResourceLoader).then(() => this.startGame());
    }

    startGame() {
        let defaultScore = 0
        localStorage.setItem('gold', defaultScore.toString() );
        localStorage.setItem('cash', defaultScore.toString() );

        this.addScenes();
        this.goToScene('begin');

        // Start playing background music
        if (this.backgroundMusic) {
            this.backgroundMusic.loop = true;
            this.backgroundMusic.play();
        }
    }

    addScenes() {
        if (!this.scenes['begin']) {
            const beginScene = new BeginScene(this);
            this.addScene('begin', beginScene);
        }

        if (!this.scenes['GameScene']) {
            const gameScene = new GameScene(this);
            this.addScene('GameScene', gameScene);
        }

        if (!this.scenes['options']) {
            const optionsScene = new OptionsScene(this);
            this.addScene('options', optionsScene);
        }

        if (!this.scenes['Intro']) {
            const introSceneInstance = new IntroScene(this);
            this.addScene('Intro', introSceneInstance);
        }
          if (!this.scenes['smith']) {
            const SmithScene = new smithScene(this);
            this.addScene('smith', SmithScene);
        }
        if (!this.scenes['controls']) {
            const controlsScene = new ControlsScene(this);
            this.addScene('controls', controlsScene);
        }
    }
}

new Game();
