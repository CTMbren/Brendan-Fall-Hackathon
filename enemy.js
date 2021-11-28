class Enemy{
  constructor(){
    this.size = 150;
    this.x = width;
    this.y = height - this.size - 25;
    this.groundHeight = 25;
    this.health = 20;
  }
  
  setHealth(level){
    //base enemy health on level
    let temp = random(level, level*5);
    this.health = floor(20 + temp);
  }
  
  move(){
    if(this.x > width - 200) this.x -= 5;
  }
  
  show(){
    image(enemyIcon, this.x, this.y, this.size, this.size);
    text('Enemy Health: '+ this.health, 550, 225);
  }
}