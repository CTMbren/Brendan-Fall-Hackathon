class Attack{
  constructor(){
    this.x = width/2;
    this.y = 100;
    this.w = 250;
    this.h = 25;
    this.curX = this.x;
    this.curDirection = 1; //1 = right, -1 = left
    this.curSpeed = 5;
  }
  
  updateCursor(){
    if(this.curX > this.x + (this.w / 2)){ // cursor has gone too far right
      this.curX = this.x + (this.w / 2);
      this.curDirection *= -1;
    }
    if(this.curX < this.x - (this.w / 2)){ // cursor has gone too far left
      this.curX = this.x - (this.w / 2);
      this.curDirection *= -1;
    }
    this.curX += this.curSpeed * this.curDirection;
  }
  
  getDamage(power){
    this.curSpeed = 0;
    let distance = abs(this.curX - (width/2));
    distance = 125 - distance; //if the cursor is close damage is high
    if (distance < 40) return 0; //if the cursor is too far out player misses.
    return power + (distance / 5);
  }
  
  show(){
    this.updateCursor();
    image(attackBar, this.x - (this.w / 2), this.y, this.w, this.h);
    push();
    fill(150,150, 255);
    rect(this.curX, this.y, 5, 25);
    pop();
  }
  
}