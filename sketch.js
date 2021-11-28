var state; //Game state, 0=menu, 1=playing, 2=shop, 3=victory screen, 4=defeat screen, 5=training, 6=info
let menu;
let menuImage;
let victoryImage;
let missImage;
let shopImage;
let infoImage;
let winSound;
let loseSound
let hitSound;
let goldSound;
let player;
let jumpBoost = 0;
let playerIcon;
let enemy;
let enemyIcon;
let rocks = [];
let gold;
let power;
let attackBar;
let attack;
let maxRocks;
let rockCount;
let attackPhase;
let damage;
let level;

function setup() {
  createCanvas(800, 600);
  gold = 0; 
  power = 10;
  level = 1;
  menu = new Menu();
  attackPhase = false;
  state = 0;
}

function preload(){
  menuImage = loadImage('Images/Main Menu.jpg');
  playerIcon = loadImage('Images/Player.png');
  attackBar = loadImage('Images/attack bar.jpg');
  enemyIcon = loadImage('Images/Enemy.png');
  victoryImage = loadImage('Images/Victory.jpg');
  missImage = loadImage('Images/Miss.jpg');
  shopImage = loadImage('Images/Shop.jpg');
  infoImage = loadImage('Images/Info.jpg');
  
  winSound = loadSound('Sounds/win.mp3');
  loseSound = loadSound('Sounds/lose.mp3');
  hitSound = loadSound('Sounds/hit.mp3');
  goldSound = loadSound('Sounds/cash.mp3');
}

function keyPressed(){
  if (key == ' ') player.jump();
  if (keyCode === ESCAPE) state = 0;
  if (attackPhase && (key == 'j' || key == 'J')){
    damage = attack.getDamage(power);
    console.log('Damage: ' + damage);
    checkVictory();
  } 
  if (state == 2){
    if(key == '1'){
      if(gold >= (power - 5)){
        gold -= (power - 5);
        power ++;
        goldSound.play();
      }
    }
    if(key == '2'){
      if(gold >= (5 + jumpBoost*5)){
        gold -= (5 + jumpBoost*5);
        jumpBoost ++;
        goldSound.play();
      }
    }
  }
}

function mousePressed(){
  if(state == 0) menu.checkClick();
}

function updateHUD(){
  textSize(24);
  text('GOLD: '+ gold, 10, 100);
  text('Power: '+ power, 10, 130);
  text('Level: '+ level, 10, 70);
}

function checkVictory(){
  attackPhase = false;
  if(damage >= enemy.health){
    if(state == 5){
      gold += 5; // only 5 gold for completing training
    } else {
    gold += random(5, 5+(level*10));
    gold = ceil(gold);
    level ++;
    }
    winSound.play();
    state = 3;
  } else{
    loseSound.play();
    state = 4;
  }
}

function startGame(){
  stage = 1;
  player = new Player();
  player.setJump(jumpBoost);
  enemy = new Enemy();
  enemy.setHealth(level);
  attack = new Attack();
  maxRocks = 4 + level;
  rockCount = 0;
  attackPhase = false;
}

function startTrain(){
  stage = 5;
  player = new Player();
  player.setJump(jumpBoost);
  enemy = new Enemy();
  enemy.setHealth(1); // training keep enemies level 1
  attack = new Attack();
  maxRocks = 4;
  rockCount = 0;
  attackPhase = false;
}

function draw() {
  background(200);
  
  
  if(state == 0){
    menu.show();
  } 
  
  if(state == 2){
    background(shopImage);
    push();
    textAlign(CENTER);
    text('PRESS 1 TO PURCHASE POWER FOR: ' + (power-5) + ' GOLD', width/2, 250);
    text('PRESS 2 TO PURCHASE JUMP UPGRADE FOR: ' + (5 + jumpBoost*5) + ' GOLD', width/2, 280);
    pop();
  }
  
  if(state == 3){
    background(victoryImage);
    push();
    textAlign(CENTER);
    text('YOU BEAT LEVEL ' + level +'!', width/2, 400);
    text('PRESS ESC TO RETURN TO THE MENU', width/2, 430);
    pop();
  }
  
  if(state == 4){
    background(missImage);
    push();
    textAlign(CENTER);
    text('UNFORTUNATLY YOU COULDNT BEAT THE KNIGHT', width/2, 400);
    text('PRESS ESC TO RETURN TO THE MENU', width/2, 430);
    pop();
  }
  
  if(state == 6){
    background(infoImage);
  }
  
  if(state == 1 ||state == 5){
    if(state == 5) background(200,200,50);
    player.show();
    player.move();
    
    if(attackPhase){
      push();
      textSize(32);
      textAlign(CENTER);
      text('PRESS J TO Joust!', width/2, 75);
      pop();
      attack.show();
      enemy.show();
      enemy.move();
    } 
    
    if(random(1) < 0.01 && rockCount < maxRocks){
      rocks.push(new Rock());
      rockCount ++;
    } 
    
    if(rockCount >= maxRocks){//rock phase over
      attackPhase = true;
    }

    for(let r of rocks){
      r.move();
      r.show();
      r.checkDone();
      if(player.damage(r) && power > 0) power -= 1; //loose one power for each rock hit.

    }
    
  }
  
  updateHUD();
  
  
}