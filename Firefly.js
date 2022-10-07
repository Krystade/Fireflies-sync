function Firefly(x, y, w, h){
	this.type = "Firefly"
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
	//List of how many times every other firefly has flashed since the last reset
	this.flashList = []
	for(var i = 0; i < flies.length; i++){
		this.flashList.push(0)
	}
	//How many flashes to wait until adjusting flash speed
	this.flashThresh = 3
	//How many flashes since last reset
	this.flashCount = 0
	
	 this.update = function(){
		 //print(this.freq, this.timer, this.flashTime*fr, this.flashing)
		 this.tick()
		 if(this.timer < this.flashTime*fr){
			 if(this.flashing == false){
				 //print("Flash!")
				 this.flashCount += 1
				 for(var i = 0; i < flies.length; i++){
					 flies[i].flashList[i] += 1
				 }
				 if(this.flashCount >= this.flashThresh){
					 //Adjust timing based on flashList values vs flashCount values
					 //Reset flashList and flashCount
					 this.adjust()
				 }
				 this.print()
			 }
			this.flashing = true
		}else{
			this.flashing = false
		}
		 this.display()
	 }

	this.adjust = function(){
		for(var i = 0; i < flies.length; i++){
			if(this != flies[i]){
				if(this.flashCount > this.flashList[i]){
					//Flashed more than this fly so slow down
					print("start Increase freq", this.freq)
					this.freq = constrain(this.freq + .01, .25,1/(this.flashTime + this.flashSpace))
					print("stop", this.freq)
					print("between ", .25, "and", 1/(this.flashTime + this.flashSpace))
				}else{
					print("start Decrease freq", this.freq)
					//Flashed less than this fly so speed up
					this.freq = constrain(this.freq - .01, .25,1/(this.flashTime + this.flashSpace))
					print("stop", this.freq)
					print("between ", .25, "and", 1/(this.flashTime + this.flashSpace))
				}
				this.flashList[i] = 0
			}
			else{
				// print("this is fly ", i)
			}
		}
		//Reset flashList
		this.flashCount = 0
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
		print("Firefly", this.freq, this.flashTime, this.flashSpace, this.timer, this.flashCount)
	}
}