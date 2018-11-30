// Module for worm class

class Worm_1{
    constructor(brain){
        var x = 100;var y = 370;
        this.score = 0;

        this.n = 3; // Number of links in worm
        if (!brain){
            this.brain = new DNA(this.n-1);
        }
        else{
            this.brain = brain.copy();
        }
        
        this.links = []; this.joints =[]; this.muscles = [];
        this.w = 20, this.h = 5;
        this.joint_offset = 3;
        this.muscle_l_M = this.w + this.joint_offset;
        this.muscle_l_m = this.w/2;
        this.muscle_l = this.w + this.joint_offset;
        
        var d = 0; // Adding links
        for (let i=0;i<this.n;i++){ 
            this.links.push( new Box(d+x, y, this.w, this.h) );
            d += this.w+2;
        }
        
        for (let i=0; i<this.n-1; i++){ // Adding joints
            var options = {bodyA: this.links[i].body, pointA: {x:this.w/2, y:0}, 
                bodyB:this.links[i+1].body, pointB:{x:-this.w/2, y:0},
                length: this.joint_offset, stiffness: 1.0};
            var con = Matter.Constraint.create(options);
            Matter.World.add(world, con);
            this.joints.push(con);
        }

        for (let i=0; i<this.n-1; i++){ // Adding muscles
            var options = {bodyA: this.links[i].body, pointA: {x:0, y:0}, 
                bodyB:this.links[i+1].body, pointB:{x:0, y:0},
                length: this.muscle_l, stiffness: 1.0};
            var con = Matter.Constraint.create(options);
            Matter.World.add(world, con);
            this.muscles.push(con);
        }

    }

    random_twitch(){
        var muscle = random(this.muscles);
        muscle.length = random(this.muscle_l_m, this.muscle_l_M);

    }

    update(){
        // update score
        var xcm = 0;
        for (let i = 0; i<this.n; i++){
            xcm += this.links[i].body.position.x;
        }
        this.score = xcm/this.n;

        for (let i=0;i<this.links.length;i++){ // Drawing links
            this.links[i].show();
        }
        for (let i=0; i<this.n-1; i++){ // Drawing muscles
            var p1 = this.links[i].body.position
            var p2 = this.links[i+1].body.position 
            stroke(255,0,0); 
            line(p1.x,p1.y,p2.x,p2.y);
        }
    }

    observe_and_act(){
        // Get prediction from DNA
        var prediction = this.brain.predict(frameC);
        // Act on muscles
        for (let i=0;i<prediction.length;i++){
            // if (i!=1 || i!=2){
            //     this.muscles[i].length = map(prediction[i], 0 ,1 ,this.muscle_l_m, this.muscle_l_M);
            // }
            this.muscles[i].length = map(prediction[i], 0 ,1 ,this.muscle_l_m*1.1, this.muscle_l_M*0.8);

        }
    }

    purge(){ // Killing the worm
        for (let j in this.joints){
            Matter.World.remove(world, j);
        }

        for (let l of this.links){
            l.purge();
        }

    }
}


class Worm{
    constructor(brain){
        var x = 100;var y = 370;
        this.score = 0;

        this.n = 4; // Number of links in worm
        if (!brain){
            this.brain = new NeuralNetwork(4,10,this.n-1);
        }
        else{
            this.brain = brain.copy();
        }
        
        this.links = []; this.joints =[]; this.muscles = [];
        this.w = 20, this.h = 5;
        this.joint_offset = 3;
        this.muscle_l_M = this.w + this.joint_offset;
        this.muscle_l_m = this.w/2;
        this.muscle_l = this.w + this.joint_offset;
        
        var d = 0; // Adding links
        for (let i=0;i<this.n;i++){ 
            this.links.push( new Box(d+x, y, this.w, this.h) );
            d += this.w+2;
        }
        
        for (let i=0; i<this.n-1; i++){ // Adding joints
            var options = {bodyA: this.links[i].body, pointA: {x:this.w/2, y:0}, 
                bodyB:this.links[i+1].body, pointB:{x:-this.w/2, y:0},
                length: this.joint_offset, stiffness: 1.0};
            var con = Matter.Constraint.create(options);
            Matter.World.add(world, con);
            this.joints.push(con);
        }

        for (let i=0; i<this.n-1; i++){ // Adding muscles
            var options = {bodyA: this.links[i].body, pointA: {x:0, y:0}, 
                bodyB:this.links[i+1].body, pointB:{x:0, y:0},
                length: this.muscle_l, stiffness: 1.0};
            var con = Matter.Constraint.create(options);
            Matter.World.add(world, con);
            this.muscles.push(con);
        }

    }

    random_twitch(){
        var muscle = random(this.muscles);
        muscle.length = random(this.muscle_l_m, this.muscle_l_M);

    }

    update(){
        // update score
        var xcm = 0;
        for (let i = 0; i<this.n; i++){
            xcm += this.links[i].body.position.x;
        }
        this.score = xcm/this.n;

        for (let i=0;i<this.links.length;i++){ // Drawing links
            this.links[i].show();
        }
        for (let i=0; i<this.n-1; i++){ // Drawing muscles
            var p1 = this.links[i].body.position
            var p2 = this.links[i+1].body.position 
            stroke(255,0,0); 
            line(p1.x,p1.y,p2.x,p2.y);
        }
    }

    observe_and_act(){
        // Observe surroundings
        var obs = [];
        // Get centre of mass
        var ysum = 0;
        var omegas = 0;
        var vx = 0; var vy = 0;
        for (let i=0; i<this.n;i++){
            var t =  ground.body.position.y - this.links[i].body.position.y; 
            ysum += t; 
            omegas += this.links[i].body.angularVelocity;
            vx += this.links[i].body.velocity.x;
            vy += this.links[i].body.velocity.y;
        }
        obs.push( ysum/(this.n*100) );
        obs.push( omegas/this.n );
        obs.push( vx/this.n ); obs.push( vy/this.n );
        // Send to neural network to think
        var prediction = this.brain.predict(obs);
        // Act on muscles
        for (let i=0;i<prediction.length;i++){
            // if (i!=1 || i!=2){
            //     this.muscles[i].length = map(prediction[i], 0 ,1 ,this.muscle_l_m, this.muscle_l_M);
            // }
            this.muscles[i].length = map(prediction[i], 0 ,1 ,this.muscle_l_m, this.muscle_l_M);

        }
    }

    purge(){ // Killing the worm
        for (let j in this.joints){
            Matter.World.remove(world, j);
        }

        for (let l of this.links){
            l.purge();
        }

    }
}