# NeuroEvolution-Worms

## Introduction
This is an independent implementation of [Siraj Raval's Neuroevolution video](https://www.youtube.com/watch?v=HT1_BHA3ecY).
This project uses:
* Matter.js : As a physics engine.
* p5.js : As a drawing and rendering environment
* p5.js DOM : For displaying data and slider DOM object
* "Toy neural network" Library by [Daniel Shiffman](https://github.com/shiffman)

![alt text](https://github.com/adityapande-1995/JS-Projects/blob/master/NeuroEvolutionWorms/output.gif "Simulation in progress")

## How to use
Clone the repository and open index.html in a browser. THe slider object can be used to increase the speeed of simulation by skipping drawing of intermediate frames.

## Working
There are 2 types of "worms" implemented.
* The "Worm" class uses a neural network as its "brain". It observes its own state, i.e. linear and angualr velocities, position of centre of mass and these are used as an input to the neural network.
* The "Worm_1" class uses a simple array of values according to which the "muscles" of the worm act based on the the current frame count. This does not include any feedback from its surroundings.

The number of links in the worm can be changed by "this.n" property of Worm/Worm_1 class.

### Evolutionary algorithm
Current implementation of selection algorithm is extremely simple, and requires improvement to increase the speed of evolution. Most importantly, the "crossover" operation needs to be implemented.




