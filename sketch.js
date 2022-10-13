let fr = 60
let popSize = 300

function setup() {
  	bg = loadImage('assets/Forest large.png');
	createCanvas(windowWidth, windowHeight)	
	frameRate(fr)
	flies = []
	for(var i = 0; i < popSize; i++){
		flies.push(new Firefly(random(20, windowWidth - 20), random(20, windowHeight - 20), 15, 40))
	}
	for (var i = 0; i < flies.length; i++){
		flies[i].trackFlashed.push(0)
		flies[i].flashReset.push(0)
	}
}

function draw() {
	background(bg)
  	fill(51)
	//Update every firefly
	for (var i = 0; i < flies.length; i++){
		flies[i].update()
		for (var j = 0; j < flies.length; j++){
			if(j != i){
				//if(dist(flies[i].x, flies[i].y, flies[j].x, flies[j].y) <= flies[i].sightDistance){
				//	line(flies[i].x, flies[i].y, flies[j].x, flies[j].y)
				//}
				if(flies[j].flash){
					flies[i].trackFlashed[j] += 1
				}
			}
		}
		//print("Firefly " + i)
		//flies[i].print()
	}
	
}

function mouseClicked(){
	newLight = new Light(mouseX, mouseY, 20, 1)
	for(var i = 0; i < flies.length; i++){
		flies[i].trackFlashed.push(0)
		flies[i].flashReset.push(0)
		newLight.trackFlashed.push(0)
		newLight.flashReset.push(0)
	}
	flies.push(newLight)
}