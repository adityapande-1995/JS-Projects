class Blob{
    constructor(x,y){
        this.x = x; this.y = y;
        this.category = NaN;
    }
    show(){
        if (this.category == 0){
            fill(255, 0, 0);
        }
        if (this.category == 1){
            fill(0, 255, 0);
        }
        if (this.category == 2){
            fill(0, 0, 255);
        }

        stroke(0);
        ellipse(this.x, this.y, 10,10);
    }
    
}

function closest(bob){
    var x = bob.x; var y = bob.y;
    var m = 100000; var ind = -1;
    for (let i=0; i<3; i++){
        var d = Math.sqrt( Math.pow((x - C[i][0]), 2) + Math.pow((y - C[i][1]), 2) ); 
        if (d < m){
            ind = i;
            m = d;
        }
    }
    if (ind == -1){
        console.log("Some error in closest function");
        console.log(d);
    }
    return ind;
}
