// Global variables
var w = 500;
var h = 500;
var B = [];
var n = 100;
var C = [];

function preload(){
}

function setup(){
    frameRate(1);
    createCanvas(w,h);
    // Initialize blobs
    for (let i=0; i<n; i++){
        var temp = new Blob(random(0,w-20), random(0,h-20));
        temp.category = i%3;
        B.push(temp);
    }
    // Initialize centroids
    for (let i=0; i<3; i++){
        C.push([random(0,w-20), random(0,h-20)]);
    }
   
}

function draw(){
    background(100);
    // Draw blobs
    for (let i=0; i<n; i++){
        B[i].show();
    }
    // Draw centroids
    for (let i=0; i<3; i++){
        fill(255);
        ellipse(C[i][0], C[i][1], 10,10);
    }

    // Actual calculations start
    // Assign cluster based on current centroids
    console.log("Updating centroids");
    for (let i=0; i<n; i++){
        B[i].category = closest(B[i]);
    }
    // Update centroids
    var pos_sum = [[0,0],[0,0],[0,0]];
    var n_array = [0,0,0];
    for (let i=0; i<n; i++){ // Iterate over blobs
        for (let j=0; j<3; j++){ // Iterate over category
            if (B[i].category == j){
                n_array[j]++ ;
                pos_sum[j][0] += B[i].x ; pos_sum[j][1] += B[i].y ;
            }
        }
    }

    for (let i=0; i<3; i++){
        C[i][0] = pos_sum[i][0]/n_array[i];
        C[i][1] = pos_sum[i][1]/n_array[i];
    }

    // noLoop();

}
