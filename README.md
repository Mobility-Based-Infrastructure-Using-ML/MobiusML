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
yarn watch
```

## Video
[![Video](https://i.imgur.com/FxWnvRP.jpg "MobiusML")](https://www.youtube.com/watch?v=zeTphRB3KK8)

## How it Works
> MobiusML is an image classifier that uses a 3 layer feedforward neural network to turn data from image tensors into a direction vector.

What does this mean? Well keep in mind that all we're doing here, is using a webcam as our input, and a direction (a number).

### So what is our input/output?
Our output is just a direction, something we can represent with a number from 0 to 4 (front, right, back, left, neutral).

An image is just a grid of pixels, but each pixel is made up of 3 colors (red, green, and blue). 

If our image is 127x127, we can make an input tensor of size 127x127x3, the 3 here is to hold the red, green, and blue values.
So we're done right? Not quite...
#### The fantastic World of Mobilenets
We can improve the performance of the model by using a pre-trained[Mobilenet](https://medium.com/@sumit.arora/training-a-neural-network-using-mobilenets-in-tensorflow-for-image-classification-on-android-14f2792f64c1). 
> MobileNets do not provide as good of an accurate model as produced by a full-fledged deep neural network. However, the accuracy is surprisingly very high and good enough for many applications. 

Mobilenets were invented by Google and basically allow us to outsource most of our model's computations to an existing, trained classifier.
If we pass our image through the mobilenet first, we can get much better results. This is called [transfer learning](https://machinelearningmastery.com/transfer-learning-for-deep-learning/).
Now that we've prepared our input, it's time to take it through our Neural Network.

### What in the world is a Neural Network?
A Network Network is just a universal function approximator. It will allow us to take our input, and get the proper output for it. Some like to compare it to the way that our brains work, through trial and error.
There are many types of Neural Networks but the one we're interested in is a 3 layer Feedforward Neural Network. 
We'll use tensorflow.js to build a simple neural network for it.
```Javascript
model = tf.sequential({
    layers: [
      // Flattens the input to a vector so we can use it in a dense layer. While
      // technically a layer, this only performs a reshape (and has no training
      // parameters).
      // remember that this is not the image, this is the output of our mobilenet
      tf.layers.flatten({inputShape: [7, 7, 256]}),
      // Layer 1
      tf.layers.dense({
        units: ui.getDenseUnits(),
        activation: 'relu',
        kernelInitializer: 'varianceScaling',
        useBias: true
      }),
      // Layer 2. The number of units of the last layer should correspond
      // to the number of classes we want to predict.
      tf.layers.dense({
        units: NUM_CLASSES,
        kernelInitializer: 'varianceScaling',
        useBias: false,
        activation: 'softmax'
      })
    ]
  });
```
each `tf.layers.dense()` is just an individual layer from our neural network.

