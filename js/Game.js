class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(displayWidth/2-200, displayHeight/2, 40,40);
    car2 = createSprite(displayWidth/2-100, displayHeight/2, 40,40);
    car3 = createSprite(displayWidth/2, displayHeight/2, 40,40);
    car4 = createSprite(displayWidth/2+100, displayHeight/2, 40,40);

    //cars.push(car1,car2,car3,car4);
    cars = [car1,car2,car3,car4];
    console.log(cars);
    
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      var x = 0;
      var y;
      var index = 0;
      for(var plr in allPlayers){
        index = index +1;
        x = x + 300;
        y = allPlayers[plr].distance;
          cars[index-1].x = x;
          cars[index-1].y = y;

        if(index == player.index) {
          cars[index-1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }

      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    drawSprites();
  }
}