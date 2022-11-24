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
      gravity: {
        y: 400,
      }
    }
  },
  scene: {
    preload,
    create,
    update,
  }
}
// loading assets, such as music, images, animations...
function preload() {
  // 'this' context - scene
  // contains functions and properties we can use
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
}

// put sprite into an variable
let bird = null;
// 
let totalDelta = null;

let flapVelocity = 300;

// display on the screen
function create() {
  // !from line 7,8
  // x (canvas width divided by 2) - to center
  // y (canvas height divided by 2) - to center
  // !
  // key of the image
  this.add.image(0 , 0, 'sky').setOrigin(0 , 0);
  //! move sprite around
  bird = this.physics.add.sprite(config.width * .1, config.height / 2, 'bird').setOrigin(0);
  this.input.on('pointerdown', flap);

  this.input.keyboard.on('keydown_SPACE', flap);

  //! bird.body.gravity.y  = 200;
  // bird.body.velocity.x = VELOCITY;
}

function update(time, delta) {
  

}

function flap() {
  bird.body.velocity.y = -flapVelocity;
}

new Phaser.Game(config);