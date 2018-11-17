let StatePathfinding = {
    preload: function() {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      const imageKeys = [
        'dotGreen',
        'dotGrey',
        'dotRed', 
      ];
      const imageUrls = [
        'img/barrelGreen_up.png',
        'img/barrelGrey_up.png',
        'img/barrelRed_up.png'
      ];
      this.load.images(imageKeys, imageUrls);
    },
    create: function() {
      let numEnemyType = 4;
  
    }
  };