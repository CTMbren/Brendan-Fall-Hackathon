class Menu{
  constructor(){
    this.buttonX = 345;
    this.buttonW = 110;
    this.buttonH = 67;
  }
  
  checkClick(){
    //detect mouse position in the button column
    if(mouseX >= this.buttonX && mouseX <= this.buttonX + this.buttonW){
      if(mouseY >= 161 && mouseY <= 161 + this.buttonH) {
        state = 1;
        startGame(); //161 is the top of the play button measured from the image
      }
      if(mouseY >= 248 && mouseY <= 248 + this.buttonH) {
        state = 5;
        startTrain(); //161 is the top of the play button measured from the image
      }
      if(mouseY >= 335 && mouseY <= 335 + this.buttonH) state = 2; //161 is the top of the play button measured from the image
      if(mouseY >= 421 && mouseY <= 421 + this.buttonH) state = 6; //161 is the top of the play button measured from the image
    }
  }

  show(){
    image(menuImage, 0, 0, width, height);
  }
}