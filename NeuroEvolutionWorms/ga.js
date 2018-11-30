// Genetic algo

function new_generation(saved_worms){
    if (!saved_worms){
        var next_gen = [];
        for (let i=0;i<popcount;i++){
            next_gen.push( new Worm_1() );   // WORM TYPE
        }

        return next_gen;
    }
    else{
        // Make new generation
        // Calculate fitness
        var s = 0; 
        saved_worms.sort(function(a,b){return a.score - b.score}); // Sort in ascending order by scores
        for (let individual of saved_worms){
            s += individual.score;
            //console.log("Worm score: ", individual.score  );
        }

        bst = saved_worms[saved_worms.length -1].score;
        var next_gen = [];
        for (let i =0; i<popcount;i++){
            next_gen.push( pickone(saved_worms) );
        }

        // Kill previous generation
        for (let i =0;i<saved_worms.length;i++){
            saved_worms[i].purge();
        }

        // Return new generation
        return next_gen;

    }
}

function pickone(sw){
    var method = 2;
    if (method == 1){ // Select any of top 5
        var temp = sw.slice(-5);
        child = new Worm_1( random(temp).brain.copy() );  // WORM TYPE
        child.brain.mutate();
        return child;
    }

    if (method == 2){ // My algo
        var fitlist =[];
        for (let item of sw){ fitlist.push( Math.exp(item.score/10) ) };
        var m = fitlist[0]; var M = fitlist[fitlist.length - 1];
        var fitlist_norm = [];
        for (let item of fitlist){ fitlist_norm.push( map(item,m,M,0,1) ) };
        var stg = [];

        // STG make loop
        for (var index=0;index<fitlist.length;index++){
            var temp = [];
            for (let j=0;j< Math.floor(fitlist_norm[index]*100);j++){
                temp.push(index.toString());
            }  
            stg = stg.concat( temp );
        }
        var select = random(stg);
        var child = new Worm_1(  sw[Number(select)].brain.copy() );  // WORM TYPE
        child.brain.mutate();
        return child;


    }
}