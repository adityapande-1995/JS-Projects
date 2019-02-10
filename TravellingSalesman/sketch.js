
let cities = [];
let totalCities = 8;
let recordDistance;
let bestEver;

function setup(){
    frameRate(20);
    createCanvas(500,500);
    for (let i=0; i<totalCities; i++){
        let v = createVector(random(width), random(height));
        cities[i] = v;
    }

    recordDistance = calcDistance(cities);
    bestEver = cities.slice();
}

function draw(){
    background(50);
    // Draw cities 
    fill(255);
    for (let i=0; i<totalCities; i++){
        ellipse(cities[i].x, cities[i].y, 8, 8);
    }

    // Draw current path
    stroke(255);
    strokeWeight(0.5);
    noFill();
    beginShape();
    for (let i=0; i<totalCities; i++){
        vertex(cities[i].x, cities[i].y);
    }
    endShape();

    // Draw best ever path
    stroke(255,0,255);
    strokeWeight(4);
    noFill();
    beginShape();
    for (let i=0; i<totalCities; i++){
        vertex(bestEver[i].x, bestEver[i].y);
    }
    endShape();

    // Swap randomly
    let i = floor(random(cities.length));
    let j = floor(random(cities.length));
    swap(cities, i,j);

    let d = calcDistance(cities);
    if (d < recordDistance){
        recordDistance = d;
        bestEver = cities.slice();
        console.log(recordDistance);
    }
}

function swap(a,i,j){
    let temp = a[i];
    a[i] = a[j];
    a[j] = temp;

}

function calcDistance(points){
    let sum = 0;
    for (let i=0; i<points.length-1; i++){
        sum += dist(points[i].x, points[i].y, points[i+1].x, points[i+1].y )
    }
    return sum;
}
