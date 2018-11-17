
let StateSeekFlee = {
  preload: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.load.image('ufoRed', 'img/ufoRed.png');
    this.load.image('ufoGreen', 'img/ufoGreen.png');
    this.load.image('bkgPurple', 'img/purple.png');
  },
  create: function() {
    this.background = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'bkgPurple');
    this.enemy = this.add.image(this.world.centerX, this.world.centerY, 'ufoRed');
    this.enemy.anchor.set(0.5, 0.5);
    this.enemy.speed = 600; // seek
    
    this.targetRadius = 100;

    this.player = this.add.image(this.world.centerX, this.world.centerY, 'ufoGreen');
    this.player.anchor.set(0.5, 0.5);
    this.player.kill();

    this.input.onDown.add(this.onMouseDown, this);
    this.input.onUp.add(this.onMouseUp, this);
  },
  update: function() {
    if (!this.player.alive) return;

    this.player.x = this.input.x;
    this.player.y = this.input.y;


    let direction = new Phaser.Point();

    // SEEK
    // direction  = vPlayerPosition - vEnemyPosition
    direction = Phaser.Point.subtract(this.player.position, this.enemy.position);

    






    // FLEE
    // this.enemy.speed = 200; // flee
    // direction = Phaser.Point.subtract(this.enemy.position, this.player.position);
    
    
    

    let distance = direction.getMagnitude();
    if (distance < this.targetRadius) return;
    
    





    // Remember normalization? OH, YEAH!
    direction.normalize();
    // Same old, same old traslation
    // position += direction * speed * deltaTime
    this.enemy.x += direction.x * this.enemy.speed * this.time.physicsElapsed;
    this.enemy.y += direction.y * this.enemy.speed * this.time.physicsElapsed;
    











  },
  onMouseDown: function(pointer) {
    this.player.revive();
    this.player.x = pointer.x;
    this.player.y = pointer.y;
  },
  onMouseUp: function(pointer) {
    this.player.kill();
  }
};