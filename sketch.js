let fr = 60
let popSize = 15

function setup() {
	createCanvas(500, 500)
	frameRate(fr)
	flies = []
	for(var i = 0; i < popSize; i++){
		flies.push(new Firefly(random(20, 480), random(20, 480), 15, 40))
	}
}

function draw() {
	background(100)
  	fill(51)
	//Update every firefly
	for (var i = 0; i < flies.length; i++){
		flies[i].update()
		//print("Firefly " + i)
		//flies[i].print()
	}
}