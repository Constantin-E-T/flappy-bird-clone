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
  debugger
}
// display on the screen
function create() {
  debugger
}

new Phaser.Game(config);