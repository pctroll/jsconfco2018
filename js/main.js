
let game;

game = new Phaser.Game(1280, 720, Phaser.AUTO, '');
game.state.add('StateMovement', StateMovement);
game.state.add('StateMovementEnemy', StateMovementEnemy);
game.state.add('StateSeekFlee', StateSeekFlee);
game.state.add('StateMovementCar', StateMovementCar);

// game.state.start('StateMovement');
// game.state.start('StateMovementEnemy');
// game.state.start('StateMovementCar');
game.state.start('StateSeekFlee');