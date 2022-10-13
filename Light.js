function Light(x, y, r, f){
	this.type = "Light"
	//X and Y positions
	this.x = x
	this.y = y
	//Radius
	this.r = r
	//Frequency of blinks
	this.freq = f
	
	//How long the flash lasts
	this.flashTime = 0.15
	//Min time between flashes
	this.flashSpace = 0.05
	//How many flashes to wait until adjusting flash speed
	this.flashThresh = 3
	//How many flashes since last reset
	this.flashCount = 0
	//If the light is in the firt frame of flashing
	this.flash = false
	//frequency of flashes, number of flashes per second
	//this.freq = random(.25,1/(this.flashTime + this.flashSpace))
	//Start with a random time until next flash
	this.timer = 0
	//List of how many times every other firefly has flashed since the last reset
	this.flashList = [0]
	//From old code
	this.trackFlashed = [0]
	this.flashReset = [0]
	
	 this.update = function(){
		 //print(this.freq, this.timer, this.flashTime*fr, this.flashing)
		 this.tick()
		 if(this.timer < this.flashTime*fr){
			//First frame of flashing
			 if(this.flashing == false){
				 //print("Flash!")
				 //If the light is in the firt frame of flashing
				 this.flash = true
				 this.flashCount += 1
				 this.print()
			 }else{
				this.flash = false
			 }
			this.flashing = true
		}else{
			this.flashing = false
			this.flash = false
		}
		 this.display()
	 }
	 
	 this.tick = function(){
		 this.timer++
		 this.timer %= 1/this.freq*fr
	 }
	
	this.display = function(){
		//Outline 1.5 thickness color black
		stroke(0)
		strokeWeight(1.5)
		//Default color as a dark grey
		fill(50)
		ellipse(this.x, this.y, this.r)
		
		//Draw the light
		if(this.flashing){
			//Yellow-Green while flashing
			fill(210,255,60)
		}else{
			fill(50)			
		}
		ellipse(this.x, this.y, this.r) 
		//Need to rotate them randomly later to make it look nicer
	}
	
	this.print = function(){
		print("Light", this.freq, this.flashTime, this.flashSpace, this.timer)
	}
}