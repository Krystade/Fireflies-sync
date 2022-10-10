let fr = 60
let popSize = 2

function setup() {
	createCanvas(windowWidth, windowHeight)
	frameRate(fr)
	flies = []
	for(var i = 0; i < popSize; i++){
		flies.push(new Firefly(random(20, windowWidth - 20), random(20, windowHeight - 20), 15, 40))
	}
	//flies.push(new Light(100, 100, 20, 2))
}

function draw() {
	background(100)
  	fill(51)
	//Update every firefly
	for (var i = 0; i < flies.length; i++){
		flies[i].update()
		if(flies[i].flash){
			for(var j = 0; j < flies.length; j++){
				flies[j].flashList[i] += 1
			}
		}
		//print("Firefly " + i)
		//flies[i].print()
	}
}

function mouseClicked(){
	for(var i = 0; i < flies.length; i++){
		flies[i].flashList.push(0)
	}
	flies.push(new Light(mouseX, mouseY, 20, 2))
}