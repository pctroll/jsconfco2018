
let game;

game = new Phaser.Game(1280, 720, Phaser.AUTO, '');
game.state.add('StateMovement', StateMovement);
game.state.add('StateSeekFlee', StateSeekFlee);
game.state.add('StateCarMovement', StateCarMovement);

// game.state.start('StateMovement');
game.state.start('StateCarMovement');
// game.state.start('StateSeekFlee');