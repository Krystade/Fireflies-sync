function Firefly(x, y, w, h){
	this.x = x
	this.y = y
	this.w = w
	this.h = h
	
	//How long the flash lasts
	this.flashTime = 0.5
	//Min time between flashes
	this.flashSpace = 0.15
	//How many flashes to wait until adjusting flash speed
	this.flashThresh = 3
	//How many flashes since last reset
	this.flashCount = 0
	//If the firefly flashed this frame
	this.flash = false
	//Used to track how many times each fly/light has flashed since last reset
	this.trackFlashed = []
	//List of zeros to reset trackFlashed
	this.flashReset = []
	
	//frequency of flashes, number of flashes per second
	this.freq = random(.15,1/(this.flashTime + this.flashSpace))
	//How much a frequency is adjusted
	this.freqChange = .01
	//Start with a random time until next flash
	this.timer = random(0,1/this.freq*fr)
	//How many pixels away a firefly can see another flash
	this.sightDistance = 500
	
	 this.update = function(){
		 //If the firefly flashed this frame
		 this.flash = false
		 //print(this.freq, this.timer, this.flashTime*fr, this.flashing)
		 this.tick()
		 if(this.timer < this.flashTime*fr){
			 if(this.flashing == false){
				 //print("Flash!")
				 //If this is the first frame of the flash
		 		 this.flash = true
				 this.flashCount += 1
				 this.print()
				 //Loop through every other firefly
				 for(var i = 0; i < flies.length; i++){
					 //If the other firefly is within 100 pixels, adjust to their speed
					 if(this != flies[i] && dist(this.x, this.y, flies[i].x, flies[i].y) < this.sightDistance){
						 //If the current firefly either flashes faster others
						 if(this.trackFlashed[i] == 0){
							 //print("fly " + i + " just blinked")
							 //Do nothing if the fireflies are in sync already
							 if(flies[i].timer == this.timer && flies[i].freq == this.freq){
								 print("In sync with fly " + i)
							 
							 }else{
								 //this.freq -= .05
								 this.freq = constrain(this.freq - this.freqChange, .25,1/(this.flashTime + this.flashSpace))
							 }
						 //Slow down if the other is going to speed up
						 }else if(this.trackFlashed[i] > 1){
							 //this.freq += .05
							 //this.freq = constrain(this.freq + this.freqChange * 1/dist(this.x,this.y, flies[i].x,flies[i].y), .25,1/(this.flashTime + this.flashSpace))
							 this.freq = constrain(this.freq + this.freqChange, .25,1/(this.flashTime + this.flashSpace))
							 //print("fly " + i + " blinking soon")
						 }
					 }
				 }
				 for(var i = 0; i < this.trackFlashed.length; i++){
					 this.trackFlashed[i] = 0
				 }
				 
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
		//fill(100,70,0)
		//ellipse(this.x, this.y, this.w, this.h)
		
		
		
		//Draw the light
		if(this.flashing){
			//stroke(0)
			noStroke()
			//Draw just the glowing light using three ellipses
			fill('rgba(240,240,50, .25)')
			ellipse(this.x, this.y + this.h/2 - this.h/4/2, this.w + this.w/3)
			ellipse(this.x, this.y + this.h/2 - this.h/4/2, this.w + 2*this.w/3)
			ellipse(this.x, this.y + this.h/2 - this.h/4/2, this.w + this.w)
			fill(240,240,50)
		}else{
			noStroke()
			noFill()			
		}
		//Draw the main light
		ellipse(this.x, this.y + this.h/2 - this.h/4/2, this.w) 
		//Need to rotate them randomly later to make it look nicer
	}
	
	this.print = function(){
		print(this.freq, this.flashTime, this.flashSpace, this.timer)
	}
}