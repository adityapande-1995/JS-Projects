// DNA class

class DNA{
    constructor(n){
        this.gene = [];
        this.n = n;
        for (let i=0;i<frameLimit;i++){ // per frame
            var temp = [];
            for (let j=0;j<n;j++){
                temp.push( Math.random() );
            }
            this.gene.push( temp);    
        }
    }

    predict(f){
        return this.gene[f];
    }

    copy(){
        var a = new DNA(this.n);
        a.genes = mycopy(this.genes);
        return a;
    }

    mutate(){
        for (let i = 0; i<this.gene.length; i++){
            for (let j=0; j<this.n;j++){
                if (Math.random() < 0.1){
                this.gene[i][j] = Math.random();
                }
            }
        }
        
    }
    
}

function mycopy(o) {
    var output, v, key;
    output = Array.isArray(o) ? [] : {};
    for (key in o) {
        v = o[key];
        output[key] = (typeof v === "object") ? copy(v) : v;
    }
    return output;
 }