var angle = 0;
var w = 500
var h = 500
var r = 150;

var globe;
var earth;
var R;

var count0 = 1;
var counter1 = 0;

function preload(){
  earth = loadImage("earth-min.jpg");
  table = loadTable("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv", "header");
}

function setup() {
  createCanvas(w,h,WEBGL);
  R = table.getRows();
}

function draw() {
  background(51);
  rotateY(angle);
  angle += 0.025;

  fill(200);
  stroke(0);
  texture(earth)
  globe = sphere(r);

  for (let row of R) {
    var lat = row.getNum("latitude");
    var lon = row.getNum("longitude");
    var mag = row.getNum("mag");

    var theta = radians(lat);

    var phi = radians(lon) + PI;

    var x = r * cos(theta) * cos(phi);
    var y = -r * sin(theta);
    var z = -r * cos(theta) * sin(phi);

    var pos = createVector(x, y, z);

    var h = pow(10, mag);
    var maxh = pow(10, 7);
    h = map(h, 0, maxh, 10, 100);

    var xaxis = createVector(1, 0, 0);
    var angleb = xaxis.angleBetween(pos);
    var raxis = xaxis.cross(pos);

    push();
    translate(x, y, z);
    rotate(angleb, raxis);
    fill(255);
    box(h, 5, 5);
    pop();
    console.log("Innerloop run ", counter1++); // Do not remove this statement
    if (counter1 > 150){
      break;
    }
  }
  counter1 = 0;
  console.log("Loop run ",  count0++);

}


