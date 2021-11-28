class Rock{
  constructor(){
    this.size = 30;
    this.x = width;
    this.xv = 10
    this.groundHeight = 25;
    this.y = height - this.size/2 - this.groundHeight;
    this.hitPlayer = false;
    this.bonusPaid = false;
  }
  
  playerHit(){
    //toggle if player is hit so that they dont continue to take damage from same rock
    this.hitPlayer = true;
  }
  
  checkDone(){
    //give player a gold if the successfully dodge a rock.
    if(this.x < -this.size){
      this.xv = 0;
      
      if(!this.hitPlayer && !this.bonusPaid){
        this.bonusPaid = true;
        //power += 1;
      }
    }
  }
  
  move(){
    this.x -= this.xv;
  }
  
  show(){
    push();
    fill(100);
    ellipse(this.x, this.y, this.size, this.size);
    pop();
  }
  
}