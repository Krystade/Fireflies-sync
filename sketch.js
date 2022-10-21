let fr = 60
//Number of fireflies
let popSize = 100
//Used to round to decimal places (100 = 2 decimals, 1000 = 3 decimals)
let roundingVal = 100
//Whether or not to run in debugging mode
let debug = false
//Number of firelies when debugging
let debugPopSize = 5
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
			flies.push(new Firefly(random(20, 500), random(20, 500), 15, 40))
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
		print(i, flies[i].type, flies[i].freq, flies[i].timer, flies[i].timerMax)
		//print(flies[i].lineColor)
		//print(flies[i].trackFlashed)
	}
	print("=======================")
}

function mouseClicked(){
	newLight = new Light(mouseX, mouseY, 20, 2)
	for(var i = 0; i < flies.length; i++){
		flies[i].trackFlashed.push(0)
		flies[i].flashReset.push(0)
		newLight.trackFlashed.push(0)
		newLight.flashReset.push(0)
	}
	flies.push(newLight)
}