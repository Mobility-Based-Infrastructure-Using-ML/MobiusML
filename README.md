# MobiusML

MobiusML is a program built using machine learning to help people with paralisis move around more easily.
It uses a 3 layer feedforward neural network built off a pretrained mobilenet.

The user registers different reactions for each direction and the network is trained on the data.
The training process can be done in less than 10 seconds.

We then connect the neural net to a flashed raspberry pi running the raspbian distro and connect it to different parts of the wheelchair allowing it to mave in the right direction. 

## Running the project
Inside the project's directory, run
```
yarn
```
```
yarn watch
```

## Video
[![Video](https://i.imgur.com/FxWnvRP.jpg "MobiusML")](https://www.youtube.com/watch?v=zeTphRB3KK8)
