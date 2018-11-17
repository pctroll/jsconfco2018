
let StateMovement = {
  preload: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.load.image('bkgPurple', 'img/purple.png');
    this.load.image('ufoGreen', 'img/ufoGreen.png');
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
    
    
    this.player = this.add.image(this.world.centerX * 0.33, this.world.centerY * 0.2, 'ufoGreen');
    this.player.anchor.set(0.5, 0.5);
    this.player.speed = 300;
    const speedTextStyle = {
      font: 'bold 20px sans-serif',
      fill: '#fff'
    };
    this.textSpeed = this.add.text(0, 0, '0', speedTextStyle);
    this.textSpeed.anchor.set(0.5);
    this.textSpeed.align = 'center';
    this.player.addChild(this.textSpeed);
    
    
    
    this.keyboard = this.input.keyboard;
    this.player.direction = new Phaser.Point();
    
  },
  update: function() {
    this.handleArrows();

    // INPUT NAIVE
    // this.move();
    
    // INPUT PROPER
    this.movePlayer();
    
    // Show speed on UFO
    // comment this one
    // this.textSpeed.visible = false;
    this.computeSpeed();
    
    
  },
  handleArrows: function() {
    let i;
    for (i = 0; i < this.arrowBlack.length; i++) {
      this.arrowBlack[i].kill();
    }
    if (this.keyboard.isDown(Phaser.Keyboard.RIGHT)) this.arrowBlack[2].revive();
    if (this.keyboard.isDown(Phaser.Keyboard.LEFT)) this.arrowBlack[0].revive();
    if (this.keyboard.isDown(Phaser.Keyboard.UP)) this.arrowBlack[3].revive();
    if (this.keyboard.isDown(Phaser.Keyboard.DOWN)) this.arrowBlack[1].revive();
  },
  move: function() {
    // x += speed * deltaTime | RIGHT
    if (this.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.player.x += this.player.speed * this.time.physicsElapsed;
    }
    // x -= speed * deltaTime | LEFT
    else if (this.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this.player.x -= this.player.speed * this.time.physicsElapsed;
    }
    if (this.keyboard.isDown(Phaser.Keyboard.UP)) {
      this.player.y -= this.player.speed * this.time.physicsElapsed;
    } else if (this.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      this.player.y += this.player.speed * this.time.physicsElapsed;
    }
  },
  movePlayer: function() {
    // get the input in the axis
    let up = this.keyboard.isDown(Phaser.Keyboard.UP);
    let down = this.keyboard.isDown(Phaser.Keyboard.DOWN);
    let right = this.keyboard.isDown(Phaser.Keyboard.RIGHT);
    let left = this.keyboard.isDown(Phaser.Keyboard.LEFT);

    // compute the velocity vector (direction)
    let vertical = 0;
    if (up) vertical -= 1;
    if (down) vertical += 1;
    let horizontal = 0;
    if (left) horizontal -= 1;
    if (right) horizontal += 1;

    // apply velocity to the player movement
    this.player.direction.x = horizontal;
    this.player.direction.y = vertical;
    // IMPORTANT: normalize
    this.player.direction.normalize();

    // x += directionX * speed * deltaTime
    // y += directionY * speed * deltaTime
    this.player.x += this.player.direction.x * this.player.speed * this.time.physicsElapsed;
    this.player.y += this.player.direction.y * this.player.speed * this.time.physicsElapsed;
  },
  computeSpeed: function() {
    let dist = Phaser.Point.distance(this.player.position, this.player.previousPosition, true);
    this.textSpeed.text = dist;
  }
};