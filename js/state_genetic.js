let StateGenetic = {
  preload: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    const imageKeys = [
      'shipBlue',
      'shipGreen',
      'shipOrange',
      'shipRed' 
    ];
    const imageUrls = [
      'img/playerShip1_blue.png',
      'img/playerShip1_green.png',
      'img/playerShip1_orange.png',
      'img/playerShip1_red.png'
    ];
    this.load.images(imageKeys, imageUrls);
  },
  create: function() {
    let numEnemyType = 4;
    this.enemyList = this.add.group();
    this.enemyList.createMultiple(numEnemyType, 'shipBlue', 0, true);
    this.enemyList.createMultiple(numEnemyType, 'shipGreen', 0, true);
    this.enemyList.createMultiple(numEnemyType, 'shipOrange', 0, true);
    this.enemyList.createMultiple(numEnemyType, 'shipRed', 0, true);

    this.enemyList.align(4, 4, 140, 120);

  }
};