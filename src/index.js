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
const VELOCITY = 200;
const PIPERS_TO_RENDER = 4;
let bird = null;
let pipes = null;

let pipeHorizontalDistance = 0; 

const pipeVerticalDistanceRange = [150, 250];
const pipeHorizontalDistanceRange = [500, 600];

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

  pipes = this.physics.add.group();

  for (let i = 0; i < PIPERS_TO_RENDER; i++) {
    const upperPipe = pipes.create(0 ,0, 'pipe').setOrigin(0, 1);
    const lowerPipe = pipes.create(0, 0, 'pipe').setOrigin(0, 0);

    placePipe(upperPipe, lowerPipe);
  }
  
  pipes.setVelocityX(-200);
  
  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown_SPACE', flap);


}

function update() {
  if (bird.y > config.height || bird.y < - bird.height) {
    restartingBirdPosition();
  }

}

function placePipe(uPipe, lPipe) {
  const rightMostX = getRightMostPipe();
  const pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalDistanceRange);
  const pipeVerticalPosition = Phaser.Math.Between(0 + 20, config.height - 20 - pipeVerticalDistance);
  const pipeHorizontalDistance = Phaser.Math.Between(...pipeHorizontalDistanceRange);


  uPipe.x = rightMostX + pipeHorizontalDistance;
  uPipe.y = pipeVerticalDistance;

  lPipe.x = uPipe.x;
  lPipe.y = uPipe.y + pipeVerticalDistance;
}

function getRightMostPipe() {
  let rightMostX = 0;

  pipes.getChildren().forEach(function (pipe) {
    rightMostX = Math.max(pipe.x, rightMostX);
  })

  return rightMostX;
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