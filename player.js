class Player{
  constructor(){
    this.size = 150;
    this.x = 50;
    this.y = height - this.size;
    this.yv = 0;
    this.gravity = 2;
    this.groundHeight = 25;
    this.jumpHeight = 25;
  }
  
  jump(){
    if(this.y == height - this.size - this.groundHeight) this.yv = -this.jumpHeight; //jumping height  
  }
  
  setJump(boost){
    let temp = boost;
    this.jumpHeight += temp;
  }
  
  damage(rock){
    if(!rock.hitPlayer && collideRectRect(this.x, this.y, this.size-50, this.size, rock.x, rock.y, rock.size, rock.size)){
      console.log('Ouch!');
      rock.playerHit();
      hitSound.play();
      return true;
    } else {
      return false;
    }
  }
  
  move(){
    this.y += this.yv;
    this.yv += this.gravity;
    this.y = constrain(this.y, 0, height - this.size - this.groundHeight);
  }
  
  show(){
    image(playerIcon, this.x, this.y, this.size, this.size);
  }
}