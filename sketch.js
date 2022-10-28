let fr = 60
//Number of fireflies
let popSize = 100
//Used to round to decimal places (100 = 2 decimals, 1000 = 3 decimals)
let roundingVal = 100
//Whether or not to run in debugging mode
let debug = true
//Debug boundaries
let debugSize = 500
//Number of firelies when debugging
let debugPopSize = 50
//Timer values
let hour = 0
let minute = 0
let second = 0

function setup() {
	//Load what image is going to be used as the background
  	bg = loadImage('assets/Forest large.png', bg => {image(bg)},
		//If the image fails to load, just use dark gray
		(event) => {
			bg = 20
			console.log(event);
		}
	)
	//Setup the canvas to be the size 
	createCanvas(windowWidth, windowHeight)
	//Set the desired frame rate
	frameRate(fr)
	//Create the initial list that will hold all the fireflies
	flies = []
	//Populate the flies list
	if(debug){
		for(var i = 0; i < debugPopSize; i++){
			flies.push(new Firefly(random(20, debugSize), random(20, debugSize), 15, 40))
			flies[i].pos = i
			flies[i].trackFlashed.push(0)
			flies[i].flashReset.push(0)
		}
	}else{
		for(var i = 0; i < popSize; i++){
			flies.push(new Firefly(random(20, windowWidth - 20), random(20, windowHeight - 20), 15, 40))
			flies[i].pos = i
			flies[i].trackFlashed.push(0)
			flies[i].flashReset.push(0)
		}
	}
	//////////////////
	//This could definitely be done better but its only done once at the start so the performance doesnt need to be the most exceptional
	i = 0
    count = 0
	while(count < flies.length){
		r = 0
		g = 0
		b = 0
    	count = 0
		i++
    	increment = 255/i
		while(true){
			count++
			r += increment
			if(r > 255){
				r = 0
				g += increment
			}
			if(g > 255){
				g = 0
				b += increment
			}
			if(b > 255){
				break	
			}
		}
	}
	r = 0
	g = 0
	b = 0
	for(var i = 0; i < flies.length; i++){
		r += increment
		if(r > 255){
			r = 0
			g += increment
		}
		if(g > 255){
			g = 0
			b += increment
		}
		if(b > 255){
			break	
		}
		flies[i].lineColor = [r,g,b]
	}
}

function draw() {
	background(bg)
	fill(255)
	textAlign("left")
	hour = floor(frameCount/fr/60/60)
	minute = floor(frameCount/fr/60%60)
	second = floor(frameCount/fr)%60
	if(hour < 10){
		if(minute < 10){
			if(second < 10){
				text("Time: 0" + str(hour) + ":0" + str(minute) +":0" + str(second), 10, 22)	
			}else{
				text("Time: 0" + str(hour) + ":0" + str(minute) +":" + str(second), 10, 22)
			}
		}else{
			text("Time: 0" + str(hour) + ":" + str(minute) +":" + str(second), 10, 22)
		}
	}else{
		text("Time: " + str(hour) + ":0" + str(minute) +":0" + str(second), 10, 22)
	}
	//Draw lines between fireflies that can see each other
	if(debug){
		for(var i = 0; i < flies.length; i++){
			stroke(flies[i].lineColor)
			for(var j = 0; j < flies.length; j++){
				if(flies[i]!=flies[j] && dist(flies[i].x, flies[i].y, flies[j].x, flies[j].y) < flies[i].viewDistance){
					middle = [(flies[i].x + flies[j].x)/2, (flies[i].y + flies[j].y)/2]
					line(flies[i].x, flies[i].y, middle[0], middle[1])
				}
			}
		}
	}
	//Update every firefly
	for (var i = 0; i < flies.length; i++){
		flies[i].update()
		
		for (var j = 0; j < flies.length; j++){
			if(j != i){
				if(flies[j].flash){
					flies[i].trackFlashed[j] += 1
				}
			}
		}
	}
	if(frameCount%fr == 0){
		printList(flies)
	}
	
}

function printList(list){
	print("=======================")
	for(var i = 0; i < list.length; i++){
		print(i, flies[i].type, flies[i].freq, flies[i].timer, flies[i].timerMax, flies[i].up, flies[i].down)
		//print(flies[i].lineColor)
		//print(flies[i].trackFlashed)
	}
	print("=======================")
}

function mouseClicked(){
	newLight = new Light(mouseX, mouseY, 20, 2)
	newLight.viewDistance = flies[0].viewDistance
	for(var i = 0; i < flies.length; i++){
		flies[i].trackFlashed.push(0)
		flies[i].flashReset.push(0)
		newLight.trackFlashed.push(0)
		newLight.flashReset.push(0)
	}
	flies.push(newLight)
}

function adjustAll(){
	//Loop through every firefly and adjust based on others 
	for(var i = 0; i < flies.length; i++){
		for(var j = 0; j < flies.length; j++){
			fly1 = flies[i]
			if(fly1.type == "Light"){
				//Don't adjust any timing if the first fly is a Light
			}else{
				fly2 = flies[j]
				//If the other firefly is within 100 pixels, adjust to their speed
				if(i != j && dist(fly1.x, fly1.y, fly2.x, fly2.y) < fly1.viewDistance){
					//If fly1 is faster than fly2 slow down
				}

			   }
		}
		
		
		
		
		/*
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
		}*/
	}
}

function syncLights(){
	//The timer of the first light created
	firstLight = -1
	for(var i = 0; i < flies.length; i++){
		if(flies[i].type == "Light"){
			if(firstLight == -1){
				firstLight = flies[i]
			}else{
				flies[i].timer = firstLight.timer
			}
		}
	}
}

//Used to try and shake the flies out of a stuck cylce
function shake(){
	for(var i = 0; i < flies.length; i++){
		if(flies[i].type == "Firefly"){
			shakeVal = random(flies[i].freq*-0.1,flies[i].freq*0.1)
			flies[i].freq += shakeVal
			flies[i].freq = floor(constrain(flies[i].freq + shakeVal, .15,1/(flies[i].flashTime + flies[i].flashSpace))*roundingVal)/roundingVal
		}
	}
}