var bg, bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg, zombiegroup //step 1
var police, policeImg, policegroup
var bullet, bulletImg, bulletgroup
var score = 0
var lives = 4
var coin, coinImg, coingroup,goimg,go
function preload() {
  zombieImg = loadImage("assets/zombie.png")//step 2
  policeImg = loadImage("assets/police2.png")
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  bulletImg = loadImage("assets/bullet.png")
  bgImg = loadImage("assets/bg.png")
  coinImg = loadImage("assets/coin.png")
 goimg = loadImage("assets/gameover.png")
}

function setup() {


  createCanvas(500, 700);
  go = createSprite(250, 320, 20, 20)
  go.addImage(goimg)
  go.scale = 0.7

  //adding the background image
  bg = createSprite(250, 320, 20, 20)
  bg.addImage(bgImg)
  bg.scale = 0.7

  edges = createEdgeSprites()
  //creating the player sprite
  player = createSprite(displayWidth - 1150, displayHeight - 300, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
  player.debug = true
  player.setCollider("rectangle", 0, 0, 300, 300)

  zombiegroup = new Group() // step 3
  policegroup = new Group()
  bulletgroup = new Group()
  coingroup = new Group()
}

function draw() {
  background(0);
  player.collide(edges)



  //moving the player up and down and making the game mobile compatible using touches

  if (keyDown("LEFT_ARROW")) {
    player.x = player.x - 30

  }
  if (keyDown("RIGHT_ARROW")) {
    player.x = player.x + 30

  }


  //release bullets and change the image of shooter to shooting position when space is pressed
  if (keyWentDown("space")) {

    player.addImage(shooter_shooting)
    shootingbullet()

  }

  //player goes back to original standing image once we stop pressing the space bar
  else if (keyWentUp("space")) {
    player.addImage(shooterImg)
  }
  goodcoin()
  zombieenemy() //step 5
  policeenemy()
  if (bulletgroup.isTouching(zombiegroup)) {
    for (var i = 0; i < bulletgroup.length; i++) {
      for (var j = 0; j < zombiegroup.length; j++) {
        if (bulletgroup[i].isTouching(zombiegroup[j])) {
          bulletgroup[i].destroy()
          zombiegroup[j].destroy()
          score = score + 1
        }

      }
    }
  }
  if (bulletgroup.isTouching(policegroup)) {
    for (var i = 0; i < bulletgroup.length; i++) {
      for (var j = 0; j < policegroup.length; j++) {
        if (bulletgroup[i].isTouching(policegroup[j])) {
          bulletgroup[i].destroy()
          policegroup[j].destroy()
          score = score + 10
        }

      }
    }
  }
  if (coingroup.isTouching(player)) {

    for (var j = 0; j < coingroup.length; j++) {
      if (coingroup[j].isTouching(player)) {
        coingroup[j].destroy()
        score = score + 20
      }

    }

  }
  if (zombiegroup.isTouching(player) || policegroup.isTouching(player)) {
    for (var i = 0; i < zombiegroup.length; i++) {
      if (zombiegroup[i].isTouching(player)) {
        zombiegroup[i].destroy()
        lives = lives - 1
      }
    }
    for (var i = 0; i < policegroup.length; i++) {
      if (policegroup[i].isTouching(player)) {
        policegroup[i].destroy()
        lives = lives - 1
      }
    }
  }
  if(lives<=0){
zombiegroup.destroyEach()
policegroup.destroyEach()
coingroup.destroyEach()
player.destroy()
bg.destroy()
  }
  drawSprites();
  fill("orange")
  text("score " + score, 20, 690)
  text("lives " + lives, 400, 690)
}

//step 4
function zombieenemy() {
  if (frameCount % 200 === 0) {
    zombie = createSprite(100, 100, 200, 200)
    zombie.addImage(zombieImg)
    zombie.scale = 0.1
    zombie.x = random(100, 450)
    zombie.velocityY = 2
    zombiegroup.add(zombie)
  }
}
function shootingbullet() {
  bullet = createSprite(100, player.y, 200, 200)
  bullet.addImage(bulletImg)
  bullet.scale = 0.1
  bullet.x = player.x
  bullet.velocityY = -4
  bulletgroup.add(bullet)
}

function policeenemy() {
  if (frameCount % 400 === 0) {
    police = createSprite(100, 100, 200, 200)
    police.addImage(policeImg)
    police.scale = 0.2
    police.x = random(100, 450)
    police.velocityY = 3
    policegroup.add(police)

  }
}
function goodcoin() {
  if (frameCount % 100 === 0) {
    coin = createSprite(100, 100, 200, 200)
    coin.addImage(coinImg)
    coin.scale = 0.1
    coin.x = random(100, 450)
    coin.velocityY = 2
    coin.debug = true
    coin.setCollider("circle", 0, 0, 150)
    coingroup.add(coin)
  }
}