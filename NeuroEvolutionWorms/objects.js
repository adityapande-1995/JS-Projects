// Module for holding objects (physics + rendering)

class MouseConst{ // Mouse constraint class
    constructor(){
        var canvas_mouse = Matter.Mouse.create(canvas.elt);
        canvas_mouse.pixelRatio = pixelDensity();
        var options = {mouse:canvas_mouse};
        this.mConstraint = Matter.MouseConstraint.create(engine, options);
        Matter.World.add(world, this.mConstraint);
    }

    show(){ // Draw green line when some object is picked up my mouse
        if (this.mConstraint.body){
            var pos = this.mConstraint.body.position;
            var mp = this.mConstraint.mouse.position;
            stroke(0,255,0);
            line(pos.x, pos.y, mp.x, mp.y);
        }
    }
}

class CircleChain{ // Chain with circles as links
    constructor(x,y,n,r,d){ // x,y location of first link, number of links, radius of circle, dist between links
        if (d < 2*r){
            console.log("Chain warning:Given value of d is too small, using automatically selected value")
            d = 2*r+2;
        }
        this.circleList = [];
        this.x = x ; this.y = y;
        this.circleList.push( new Circle(this.x, this.y, r, true) ); // First link of chain
        var tempx = 0;  
        for (let i=0; i < n-1; i++){ // Adding rest of the links
            tempx += d;
            this.circleList[i+1] =  new Circle(x+tempx, this.y, r, false);
        }
        
        this.constraints = []; // Adding constraints
        for (let i=0; i<this.circleList.length-1; i++){
            var options = {bodyA: this.circleList[i].body, bodyB:this.circleList[i+1].body, length: d, stiffness: 0.9}
            var con = Matter.Constraint.create(options);
            Matter.World.add(world, con);

        }
    }

    show(){
        for (let i=0; i<this.circleList.length; i++){ 
            this.circleList[i].show(); 
        }
        for (let i=0; i<this.circleList.length-1; i++){
            var p1 = this.circleList[i].body.position
            var p2 = this.circleList[i+1].body.position 
            stroke(0); 
            line(p1.x,p1.y,p2.x,p2.y); 
        }

    }

    purge(){
        for (let i=0; i<this.circleList.length; i++){ 
            this.circleList[i].purge(); 
        }

    }
}


class Circle{ // Basic Circle object
    constructor(x,y,r, s) {
        var options = { friction:0.1, restitution:0.9, isStatic:s }
        this.body = Matter.Bodies.circle(x,y,r,options);
        this.r = r;
        Matter.World.add(world, this.body)
    }

    show() {
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        stroke(0);
        ellipse(0,0,this.r*2,this.r*2);
        pop();
    }

    isOffscreen(){
        return this.body.position.y > H + 100;
    }

    purge(){
        Matter.World.remove(world, this.body);
    }

}

class Box{ // Basic rectangle object
    constructor(x,y,w,h) {
        var options = { friction:0.5, restitution:0.5, collisionFilter: { category: 0x0002, mask: 0x0001} };
        this.body = Matter.Bodies.rectangle(x,y,w,h,options);
        this.w = w ; this.h = h;
        Matter.World.add(world, this.body)
    }

    show() {
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        stroke(0);
        rect(0,0,this.w,this.h);
        pop();
    }

    isOffscreen(){
        return this.body.position.y > H + 100;
    }

    purge(){
        Matter.World.remove(world, this.body);
    }

}

class Ground{ // Basic Ground object (static)
    constructor(){
        var options = { friction:0.5, restitution:0.8, isStatic:true, angle:0, collisionFilter: { category: 0x0001}};
        this.w = W-10  ; this.h = 15;
        this.body = Matter.Bodies.rectangle(W/2, H-70 ,this.w ,this.h ,options);
        Matter.World.add(world, this.body);
    }
    show(){
        var pos = this.body.position;
        push();
        translate(pos.x, pos.y);
        rotate(this.body.angle);
        rectMode(CENTER);
        fill(50);
        stroke(0);
        rect(0,0,this.w,this.h);
        pop();

    }
}



