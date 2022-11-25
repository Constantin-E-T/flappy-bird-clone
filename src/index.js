import Phaser from 'phaser';


const config = {
  // WebGL (web graphics library) JS api for rendering 2D and 3D graphics
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    // arcade physics plugin, manages physics simulations
    default: 'arcade',
    arcade: {
      debug: true,
    }
  },
  scene: {
    preload,
    create,
    update,
  }
}


// put sprite into an variable
let bird = null;
let upperPipe = null;
let lowerPipe = null;

const pipeVerticalDistanceRange = [150, 250];
// let pipeVerticalDistance = Phaser.Math.Between(pipeVerticalDistanceRange[0], pipeVerticalDistanceRange[1]);
let pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalDistanceRange);

let pipeVerticalPosition = Phaser.Math.Between(0 + 20, config.height - 20 - pipeVerticalDistance);

const initialBirdPosition = {x: config.width * .1, y: config.height / 2}
const flapVelocity = 300;


// loading assets, such as music, images, animations...
function preload() {
  // 'this' context - scene
  // contains functions and properties we can use
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
  this.load.image('pipe', 'assets/pipe.png');
}


// display on the screen
function create() {
  this.add.image(0, 0, 'sky').setOrigin(0, 0);
  //! move sprite around
  bird = this.physics.add.sprite(initialBirdPosition.x,initialBirdPosition.y, 'bird').setOrigin(0);
  bird.body.gravity.y = 400;
  upperPipe = this.physics.add.sprite(500, pipeVerticalPosition, 'pipe').setOrigin(0, 1);
  lowerPipe = this.physics.add.sprite(500, upperPipe.y + pipeVerticalDistance, 'pipe').setOrigin(0, 0);

  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown_SPACE', flap);


}

function update() {
  if (bird.y > config.height || bird.y < - bird.height) {
    restartingBirdPosition();
  }

}

function restartingBirdPosition() {
  bird.x = initialBirdPosition.x;
  bird.y = initialBirdPosition.y;
  bird.body.velocity.y = 0;
}

function flap() {
  bird.body.velocity.y = -flapVelocity;
}

new Phaser.Game(config);