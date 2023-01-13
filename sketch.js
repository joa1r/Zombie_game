var bg, bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieAnm;

var end;
var endImg;
var endSound;

var winner;
var winnerImg;

var mira;
var miraImg;
var score = 0;

var tiro;
var tiroImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;

var lifes = 3;

function preload() {
  heart1Img = loadImage("heart_1.png");
  heart2Img = loadImage("heart_2.png");
  heart3Img = loadImage("heart_3.png");

  endImg = loadImage("end.png");
  winnerImg = loadImage("winner.png");

  shooterImg = loadImage("player.png");
  shooter_shooting = loadImage("player2.png");

  miraImg = loadImage("mira.png");

  tiroImg = loadImage("tiro.png");

  zombieImg = loadAnimation("zombiF1.png");

  bgImg = loadImage("backgroun.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //adicionar a imagem de fundo

  bg = createSprite(displayWidth / 2 - 20, displayHeight / 2 - 40, 20, 20);
  bg.addImage(bgImg);
  bg.scale = 1.5;

  //criar o sprite do jogador
  player = createSprite(displayWidth - 1500, displayHeight - 300, 50, 50);
  player.addImage(shooterImg);
  player.scale = 0.3;
  player.debug = true;
  player.setCollider("rectangle", 0, 0, 300, 300);

  end = createSprite(displayWidth / 2, displayHeight / 2);
  end.addImage(endImg);
  end.visible = false;

  winner = createSprite(displayWidth / 2, displayHeight / 2);
  winner.addImage(winnerImg);
  winner.visible = false;

  mira = createSprite(displayWidth / 2, displayHeight / 2);
  mira.addImage(miraImg);
  mira.scale = 0.3;

  //criar sprites para representar as vidas restantes
  heart1 = createSprite(displayWidth - 150, 40, 20, 20);
  heart1.visible = false;
  heart1.addImage("heart1", heart1Img);
  heart1.scale = 0.4;

  heart2 = createSprite(displayWidth - 100, 40, 20, 20);
  heart2.visible = false;
  heart2.addImage("heart2", heart2Img);
  heart2.scale = 0.4;

  heart3 = createSprite(displayWidth - 150, 40, 20, 20);
  heart3.addImage("heart3", heart3Img);
  heart3.scale = 0.4;

  //criar o grupo para os zumbis
  zombieGroup = new Group();
  tiroGroup = new Group();
}

function draw() {
  background(0);
  //mover o jogador para cima e para baixo e tornar o jogo compatível com dispositivos móveis usando touches (toques)
  player.y = mouseY;
  mira.y = mouseY;
  mira.x = mouseX;
  //disparar as balas e mudar a imagem do atirador para a posição de tiro quando a tecla espaço for pressionada
  if (keyWentUp("space")) {
    player.changeImage(shooter_shooting);
    tiro = createSprite(mouseX, mouseY);
    tiro.addImage(tiroImg);
    player.changeImage(shooter_shooting);
    tiro.scale = 0.5;
    tiro.lifetime = 1;
    tiroGroup.add(tiro);
  }

  //o jogador volta à imagem original quando paramos de pressionar a tecla espaço
  else {
    player.changeImage(shooterImg);
  }
  if (zombieGroup.isTouching(tiroGroup)) {
    for (var i = 0; i < zombieGroup.length; i++) {
      if (zombieGroup[i].isTouching(tiroGroup)) {
        zombieGroup[i].destroy();
        score += 1;
      }
    }
  }

  //destruir o zumbi quando o jogador toca nele
  if (zombieGroup.isTouching(player)) {
    for (var i = 0; i < zombieGroup.length; i++) {
      if (zombieGroup[i].isTouching(player)) {
        zombieGroup[i].destroy();
        lifes = lifes - 1;
      }
    }
  }
  if (lifes === 2) {
    heart3.visible = false;
    heart2.visible = true;
  }
  if (lifes === 1) {
    heart3.visible = false;
    heart2.visible = false;
    heart1.visible = true;
  }
  if (lifes <= 0) {
    heart3.visible = false;
    heart2.visible = false;
    heart1.visible = false;
    player.destroy();
    zombieGroup.destroyEach();
    end.visible = true;
  }
  if (lifes === 0) {
    player.destroy();
    end.visible = true;
  }
  if (score === 50) {
    zombieGroup.destroyEach();
    player.destroy();
    winner.visible = true;
  }

  //chamar a função para gerar os zumbis
  enemy();

  textSize(70)
  drawSprites();
  text(score,350,100)
  text("SCORE:",80,100)
}

//criar função para gerar os zumbis
function enemy() {
  if (frameCount % 25 === 0) {
    //atribuir posições x e y aleatórias para o zumbi aparecer
    zombie = createSprite(2000, random(40, 1500), 40, 40);

    zombie.addAnimation("zombi", zombieImg);
    zombie.scale = 0.3;
    zombie.velocityX = -15;
    zombie.debug = true;
    zombie.setCollider("rectangle", 0, 0, 400, 400);

    zombie.lifetime = 400;
    zombieGroup.add(zombie);
  }
}
