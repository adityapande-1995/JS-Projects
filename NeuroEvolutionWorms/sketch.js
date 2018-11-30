// Main script

// Physics engine initialize
var engine = Matter.Engine.create();
var world = engine.world;
// Objects initialize
var ground; var chain; var gen;
// Drawing parameters
var W = 900; var H = 500; var canvas;
// Simulation parameters
var frameC = 0; var popcount = 20; var gencount = 1; var bst =0; var frameLimit = 500;
// DOM elements initialize
var DOM_G; var DOM_best; var DOM_frameskip;


function setup(){
    canvas = createCanvas(W, H);
    frameRate(60);
    fill(255);  
    // My objects
    ground = new Ground();
    chain = new CircleChain(400,50,10,7,0);
    gen = new_generation();
    // Mouse drag constraint
    m = new MouseConst();
    // Plotting

    // DOM initialize
    DOM_frameskip = createSlider(2,100, 2);
    DOM_G = createP("Generation count: ");
    DOM_best = createP("Best score of previous generation: ");

}

function draw(){
    for (let z =0; z< DOM_frameskip.value() ; z++){
        background(100);
        frameC++;
        if (frameC % frameLimit == 0){
            gencount++;
            gen = new_generation(gen); // Replace previous generation
            frameC = 0;
        }

        // Objects act
        for (let w of gen){
            w.observe_and_act();
            w.update();
        }
        
        // Engine update
        Matter.Engine.update(engine);
        // console.log(world.bodies.length);
    }
    // Display update
    text("Frame :"+frameC,10,20);
    ground.show();
    chain.show();
     
    // Mouse constraint draw
    m.show();

    // DOM update
    DOM_G.html("Generation count: "+gencount);
    DOM_best.html("Best score of previous generation: "+bst);
    
}