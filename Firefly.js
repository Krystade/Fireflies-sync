function Firefly(x, y, w, h){
	this.type = "Firefly"
	//Position in the flies List
	this.pos = -1
	this.x = x
	this.y = y
	this.w = w
	this.h = h
	
	//How long the flash lasts
	this.flashTime = 0.15
	//Min time between flashes
	this.flashSpace = 0.05
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
	this.freq = floor(random(.25,1/(this.flashTime + this.flashSpace))*roundingVal)/roundingVal
	//How much a frequency is adjusted
	this.freqChange = .01
	//The max value the timer can hit
	this.timerMax = floor(1/this.freq*fr)
	//Start with a random time until next flash
	this.timer = floor(random(0,this.timerMax))
	//How many pixels away a firefly can see another flash
	this.viewDistance = 200
	//How many in range flies are faster
	this.up = 0
	//How many in range flies are slower
	this.down = 0
	//What color the view distance debug lines are
	this.lineColor = [200, 50, 50]
	
	 this.update = function(){
		 //If the firefly flashed this frame
		 this.flash = false
		 this.tick()
		 if(this.timer < this.flashTime*fr){
			 if(this.flashing == false){
				 //print("Flash!")
				 //If this is the first frame of the flash
		 		 this.flash = true
				 this.flashCount += 1
				 //this.print()
				 this.adjust()
				 
			 }
			this.flashing = true
		}else{
			this.flashing = false
		}
		 this.display()
	 }
	 
	 this.tick = function(){
		 this.timer++
		 this.timer %= this.timerMax
	 }
	 
	this.adjust = function(){
		/*
		//Attempt #2
		//How many in range flies are faster
		this.up = 0
		//How many in range flies are slower
		this.down = 0
		//From flies in range count how many are faster vs slower
		//Use this number to increase/decrease freq
		//Loop through every other firefly
		for(var i = 0; i < flies.length; i++){
			//If the other firefly is within 100 pixels, adjust to their speed
			if(this != flies[i] && dist(this.x, this.y, flies[i].x, flies[i].y) < this.viewDistance){
				//If the current firefly either flashes faster others
				if(this.trackFlashed[i] == 0){
					this.down += 1
				}else if(this.trackFlashed[i] > 1){
					this.up += 1
				}
			}
		 	this.trackFlashed[i] = 0
		}
		*/
				
		 //Loop through every other firefly
		 for(var i = 0; i < flies.length; i++){
			 //If the other firefly is within 100 pixels, adjust to their speed
			 if(this != flies[i] && dist(this.x, this.y, flies[i].x, flies[i].y) < this.viewDistance){
				//If the current firefly either flashes faster others
				if(this.trackFlashed[i] == 0){
					//Do nothing if the fireflies are in sync already
					if(flies[i].timer == this.timer && flies[i].freq == this.freq){
						//Do nothing since the flies are in sync
					}else{
						this.freq = floor(constrain(this.freq - this.freqChange, .15,1/(this.flashTime + this.flashSpace))*roundingVal)/roundingVal
					}
				}
				else if(this.trackFlashed[i] > 1){
					 this.freq = floor(constrain(this.freq + this.freqChange, .15,1/(this.flashTime + this.flashSpace))*roundingVal)/roundingVal
				 }else{
					//If the other flashed once then their freq is close so adjust based on timer
					if(flies[i].timer <= flies[i].timerMax/2){
						this.timerMax += 10
						
					}else{
						this.timerMax -= 10
					}
				}
				this.timerMax = floor(1/this.freq*fr)
			}
		}
		for(var i = 0; i < this.trackFlashed.length; i++){
			this.trackFlashed[i] = 0
		}
	}
	
	this.display = function(){
		stroke(0)
		strokeWeight(1.5)
		//Draw the body
		if(debug){
			fill(this.lineColor)
			ellipse(this.x, this.y, this.w, this.h)
		}
		
		
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
		if(debug){
			fill(255)
			stroke(3)
			textAlign("center")
			text(this.pos, this.x, this.y)
		}
	}
	
	this.print = function(){
		print(this.freq, this.flashTime, this.flashSpace, this.timer, this.up, this.down)
	}
}