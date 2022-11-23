import Phaser from 'phaser';


const config = {
  // WebGL (web graphics library) JS api for rendering 2D and 3D graphics
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    // arcade physics plugin, manages physics simulations
    default: 'arcade'
  },
  scene: {
    preload,
    create,
  }
}
// loading assets, such as music, images, animations...
function preload() {
  // 'this' context - scene
  // contains functions and properties we can use
  this.load.image('sky', 'assets/sky.png');
}
// display on the screen
function create() {
  // !from line 7,8
  // x (canvas width divided by 2)
  // y (canvas height divided by 2)
  // !
  // key of the image
  this.add.image(config.width / 2, config.height / 2, 'sky');
}

new Phaser.Game(config);