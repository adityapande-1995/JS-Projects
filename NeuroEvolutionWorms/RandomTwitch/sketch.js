// Main script

// Physics engine initialize
var engine = Matter.Engine.create();
var world = engine.world;
// Objects initialize
var g; var chain; var w;
// Drawing parameters
var W = 500; var H = 500; var canvas;

function setup(){
    canvas = createCanvas(W, H);
    frameRate(60);
    fill(255);  
    // My objects
    g = new Ground();
    chain = new CircleChain(50,50,10,7,0);
    w = new Worm(100,100);
    // Mouse drag constraint
    m = new MouseConst();

}

function draw(){
    background(100);
    // Objects act
    w.random_twitch();

    // Display update
    g.show();
    chain.show();
    w.show();

    // Mouse constraint draw
    m.show();
    
    // Engine update
    Matter.Engine.update(engine);
    //console.log(boxes.length, world.bodies.length);
    
}