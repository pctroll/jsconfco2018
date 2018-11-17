let StateMovementCar = {
  preload: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.load.image('carBlue', 'img/car_blue_1.png');
    this.load.image('asphalt', 'img/road_asphalt22.png');
    this.load.image('oil', 'img/oil.png');
    this.load.image('start', 'img/arrow_yellow.png');
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
    this.background = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'asphalt');
    this.oil1 = this.add.image(200, 120, 'oil');
    this.start = this.add.image(0, 0, 'start');
    this.start.anchor.set(0.5);
    this.start.scale.set(0.5);
    this.start.x = this.world.centerX;


    this.keyboard = this.input.keyboard;
    this.carBlue = this.add.image(0, 0, 'carBlue');
    this.carBlue.scale.set(0.5);
    this.carBlue.anchor.set(0.5, 0.75);
    this.carBlue.x = this.world.centerX;
    this.carBlue.y = this.world.height * 0.75;
    this.carBlue.speed = 300;
    this.carBlue.angularSpeed = 180;
    this.carBlue.direction = new Phaser.Point();

    this.start.y = this.carBlue.y - this.carBlue.height;


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
  update: function() {
    
    let deltaTime = this.time.physicsElapsed;
    let cos = 0, sin = 0, rotation;
    
    this.handleArrows();
    this.getInput();

    // Comment this one below
    // this.carBlue.angle += this.carBlue.direction.x * this.carBlue.angularSpeed * deltaTime;

    
    if (this.carBlue.direction.y == 0)
      return;
    
    // Uncomment this one when commenting the big if below
    // this.carBlue.angle += this.carBlue.direction.x * this.carBlue.angularSpeed * deltaTime;
    // cos = Math.cos(this.carBlue.rotation);
    // sin = Math.sin(this.carBlue.rotation);




    if (this.carBlue.direction.y > 0) {
      // this is forward
      this.carBlue.angle += this.carBlue.direction.x * this.carBlue.angularSpeed * deltaTime;
      cos = Math.cos(this.carBlue.rotation);
      sin = Math.sin(this.carBlue.rotation);
    }
    else {
      // this is reverse
      // so we invert the direction by using the negative angle
      this.carBlue.angle += -this.carBlue.direction.x * this.carBlue.angularSpeed * deltaTime;
      cos = Math.cos(-this.carBlue.rotation);
      sin = Math.sin(-this.carBlue.rotation);
    }

    // Y = cos(alpha) * speed * time * -direction (because Y is down and forward is up)
    this.carBlue.y += cos * this.carBlue.speed * deltaTime * -this.carBlue.direction.y;
    this.carBlue.x += sin * this.carBlue.speed * deltaTime;
    // X = sin(alpha) * speed * time
      
  },
  getInput: function() {
    let up = this.keyboard.isDown(Phaser.Keyboard.UP);
    let down = this.keyboard.isDown(Phaser.Keyboard.DOWN);
    let right = this.keyboard.isDown(Phaser.Keyboard.RIGHT);
    let left = this.keyboard.isDown(Phaser.Keyboard.LEFT);

    let vertical = 0;
    if (up) vertical += 1;
    if (down) vertical -= 1;
    let horizontal = 0;
    if (left) horizontal -= 1;
    if (right) horizontal += 1;

    this.carBlue.direction.x = horizontal;
    this.carBlue.direction.y = vertical;
    this.carBlue.direction.normalize();

    // this.player.x += this.player.direction.x * this.player.speed * this.time.physicsElapsed;
    // this.player.y += this.player.direction.y * this.player.speed * this.time.physicsElapsed;
  },
};