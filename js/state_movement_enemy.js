
let StateMovementEnemy = {
  preload: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.load.image('bkgPurple', 'img/purple.png');
    this.load.image('ufoRed', 'img/ufoRed.png');
    const imageKeys = [
      'arrowDown',
      'arrowLeft',
      'arrowRight',
      'arrowUp',
      'arrowDownW',
      'arrowLeftW',
      'arrowRightW',
      'arrowUpW' 
    ];
    const imageUrls = [
      'img/arrowDown.png',
      'img/arrowLeft.png',
      'img/arrowRight.png',
      'img/arrowUp.png',
      'img/arrowDownW.png',
      'img/arrowLeftW.png',
      'img/arrowRightW.png',
      'img/arrowUpW.png'
    ];
    this.load.images(imageKeys, imageUrls);

  },
  create: function() {
    this.background = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'bkgPurple');

    this.arrowWhite = [];
    this.arrowWhite[0] = this.add.image(0, 40, 'arrowLeftW');
    this.arrowWhite[1] = this.add.image(40, 40, 'arrowDownW');
    this.arrowWhite[2] = this.add.image(80, 40, 'arrowRightW');
    this.arrowWhite[3] = this.add.image(40, 0, 'arrowUpW');

    this.arrowBlack = [];
    this.arrowBlack[0] = this.add.image(0, 40, 'arrowLeft');
    this.arrowBlack[1] = this.add.image(40, 40, 'arrowDown');
    this.arrowBlack[2] = this.add.image(80, 40, 'arrowRight');
    this.arrowBlack[3] = this.add.image(40, 0, 'arrowUp');
    
    // this.killArrows();

    this.keyboard = this.input.keyboard;
    // this.player.direction = new Phaser.Point();
    

    this.enemy = this.add.image(0, this.world.centerY, 'ufoRed');
    this.enemy.anchor.set(0, 0.5);
    this.enemy.amplitude = 600;
    this.enemy.timeMultiplier = 6;
    this.enemy.speed = 400;
    // this.enemy.kill();

    // this.enemy.steering = new Steering();
    this.enemy.speed = 200;
    this.enemy.velocity = new Phaser.Point();

    const textStyle = {
      font: 'bold 32px sans-serif',
      fill: '#fff'
    };
    this.textSpeed = this.add.text(140, 0, 'Speed: ' + this.enemy.speed, textStyle);
    this.textAmplitude = this.add.text(140, 46, 'Amplitude: ' + this.enemy.amplitude, textStyle);

  },
  keydown: function(obj) {
    console.log(obj);
  },
  update: function() {
    this.handleArrows();

    this.textSpeed.text = 'Speed: ' + this.enemy.speed;
    this.textAmplitude.text = 'Amplitude: ' + this.enemy.amplitude;

    // AUTOMATIC MOVEMENT
    this.enemyMovement();


  },
  killArrows: function() {
    let i;
    for (i = 0; i < this.arrowBlack.length; i++) {
      this.arrowBlack[i].kill();
      this.arrowWhite[i].kill();
    }
  },
  handleArrows: function() {
    let i;
    const speedStep = 50;
    const amplitudeStep = 50;
    for (i = 0; i < this.arrowBlack.length; i++) {
      this.arrowBlack[i].kill();
    }
    if (this.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.arrowBlack[2].revive();
      this.enemy.speed += speedStep;
    }
    if (this.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this.arrowBlack[0].revive();
      this.enemy.speed -= speedStep;
    }
    if (this.keyboard.isDown(Phaser.Keyboard.UP)) {
      this.arrowBlack[3].revive();
      this.enemy.amplitude += amplitudeStep;
    }
    if (this.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      this.arrowBlack[1].revive();
      this.enemy.amplitude -= amplitudeStep;
    }

    if (this.enemy.speed < 0) this.enemy.speed = 0;
    if (this.enemy.amplitude < 1) this.enemy.amplitude = 1;

  },
  enemyMovement: function() {

    if (!this.enemy.alive) return;

    this.enemy.x += this.enemy.speed * this.time.physicsElapsed;
    // this.enemy.y = this.world.centerY;
    // this.enemy.y += Math.sin(this.time.totalElapsedSeconds() * this.enemy.timeMultiplier) * this.enemy.amplitude;
    
    if (this.enemy.x > this.world.width) {
      this.enemy.y = Math.random() * this.world.height;
      this.enemy.x = -this.enemy.width;
    }
  }
};