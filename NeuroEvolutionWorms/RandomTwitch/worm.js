// Module for worm class

class Worm{
    constructor(x,y){
        this.brain = NaN;
        this.score = 0;

        this.n = 10; // Number of links in worm
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

    show(){
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

    act_on_input(m_no,value){
        this.muscles[m_no].length = map(value, 0 ,1 ,this.muscle_l_m, this.muscle_l_M);
    }

    purge(){

    }
}