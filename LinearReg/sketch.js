
let x_vals = [];
let y_vals = [];
let m,b;

let LR_slider;
let LR_slider_val;
// const learningRate = 0.2;
// const optimizer = tf.train.sgd(learningRate);

function setup(){
    createCanvas(300,300);
    let lol = createP("");
    LR_slider = createSlider(5,60, 50);
    LR_slider_val = createP("Learning Rate: "+LR_slider.value());
    m = tf.variable(tf.scalar(random(1)));
    b = tf.variable(tf.scalar(random(1)));

}

function loss(pred, labels){
    return pred.sub(labels).square().mean() ;
}

function predict(x){
    const xs = tf.tensor1d(x);
    // y = mx+b;
    const ys = xs.mul(m).add(b);
    return ys;
}

function mousePressed(){
    let x = map(mouseX,0,width, 0,1);
    let y = map(mouseY,0,height, 1,0);
    if (x >0 && x<1 && y >0 && y<1 ){
        x_vals.push(x);
        y_vals.push(y);
    }

}

function draw(){

    LR_slider_val.html("Learning Rate: "+LR_slider.value()/100);

    tf.tidy(()=>{
        if (x_vals.length > 0){
            const ys = tf.tensor1d(y_vals);
            tf.train.sgd(LR_slider.value()/100).minimize( ()=>loss(predict(x_vals), ys) );
            // optimizer.minimize( ()=>loss(predict(x_vals), ys) );
        }
    });


    background(51);
    stroke(255);
    strokeWeight(8);
    for (let i=0; i < x_vals.length; i++){
        let px = map(x_vals[i], 0, 1, 0, width);
        let py = map(y_vals[i], 0, 1, height, 0);
        point(px,py);
    }

    tf.tidy(()=>{

        let lineX = [0,1];
        let ys = predict(lineX);
        let x1 = map(lineX[0], 0, 1, 0, width);
        let x2 = map(lineX[1], 0, 1, 0, width);

        let lineY = ys.dataSync();
        let y1 = map(lineY[0], 0, 1, height, 0);
        let y2 = map(lineY[1], 0, 1, height, 0);

        strokeWeight(2);
        line(x1, y1, x2, y2);
    });

 
}
