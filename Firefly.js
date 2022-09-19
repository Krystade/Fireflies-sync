function Firefly(x, y, w, h){
	this.x = x
	this.y = y
	this.w = w
	this.h = h
	
	//How long the flash lasts
	this.flashTime = 0.15
	//Min time between flashes
	this.flashSpace = 0.05
	//frequency of flashes, number of flashes per second
	this.freq = random(.25,1/(this.flashTime + this.flashSpace))
	//Start with a random time until next flash
	this.timer = random(0,1/this.freq*fr)
	
	 this.update = function(){
		 //print(this.freq, this.timer, this.flashTime*fr, this.flashing)
		 this.tick()
		 if(this.timer < this.flashTime*fr){
			 if(this.flashing == false){
				 //print("Flash!")
				 this.print()
				 //Check timers of other fireflies
				 //if under 20 they just flashed within .2 seconds
				 //Loop through every other firefly
				 for(var i = 0; i < flies.length; i++){
					 //If the other firefly is within 100 pixels, adjust to their speed
					 if(this != flies[i] && dist(this.x, this.y, flies[i].x, flies[i].y) < 50){
						 if(flies[i].timer <= 20){
							 //print("fly " + i + " just blinked")
							 //Do nothing if the fireflies are in sync already
							 if(flies[i].timer == this.timer && flies[i].freq == this.freq){
								 print("In sync with fly " + i)
							 //Speed up if the other flashed recently
							 }else{
								 this.freq = constrain(this.freq - .01, .25,1/(this.flashTime + this.flashSpace))
							 }
						 //Slow down if the other is going to speed up
						 }else if(flies[i].timer >= flies[i].freq*60-20){
								 this.freq = constrain(this.freq + .01, .25,1/(this.flashTime + this.flashSpace))
							 //print("fly " + i + " blinking soon")
						 }else{
							 print("no idea for fly " + i + ". do nothing")
							 print("no idea for fly " + i + ". slow")
							 this.freq = constrain(this.freq + .01, .25,1/(this.flashTime + this.flashSpace))
							 //this.freq =  constrain(this.freq + random(-.5, .5), .25,1/(this.flashTime + this.flashSpace))
						 }
					 }
				 }
				 //if over j.freq - 20 then they will flash within .2 seconds
			 }
			this.flashing = true
		}else{
			this.flashing = false
		}
		 this.display()
	 }
	 
	 this.tick = function(){
		 this.timer++
		 this.timer %= 1/this.freq*fr
	 }
	
	this.display = function(){
		stroke(0)
		strokeWeight(1.5)
		//Draw the body
		fill(100,70,0)
		ellipse(this.x, this.y, this.w, this.h)
		
		//Draw the light
		if(this.flashing){
			stroke(0)
			fill(240,240,50)
		}else{
			noStroke()
			noFill()			
		}
		ellipse(this.x, this.y + this.h/2 - this.h/4/2, this.w) 
		//Need to rotate them randomly later to make it look nicer
	}
	
	this.print = function(){
		print(this.freq, this.flashTime, this.flashSpace, this.timer)
	}
}