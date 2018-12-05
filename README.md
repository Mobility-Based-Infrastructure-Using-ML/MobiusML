# MobiusML

MobiusML is a  neural network originally created by google which has been modified and repurposed to help people with paralisis move their motorized wheelchairs more easily.
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
We can improve the performance of the model by using a pre-trained [Mobilenet](https://medium.com/@sumit.arora/training-a-neural-network-using-mobilenets-in-tensorflow-for-image-classification-on-android-14f2792f64c1). 
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

### Training Time!
Now that we have built our network, it's time to train it. This is the part where the network will learn to get good at its job.
We can use tensorflow.js' built it `fit` method to do so. 
```Javascript
model.fit(controllerDataset.xs, controllerDataset.ys, {#
    batchSize,
    epochs: ui.getEpochs(),
    callbacks: {
      onBatchEnd: async (batch, logs) => {
        loss = logs.loss.toFixed(5);
        ui.trainStatus('Loss: ' + loss);
      }
    }
  });
```
the first two parameters are **tensors**, the last parameter is our **configuration**, these are also called **hyperparameter**, and there's a couple options that we can define.

Remember that all we're doing here is working with a bunch of images *frames from our camera, some frames look right, others look left, forwards, backwards, you get the idea...* To train the model more efficiently, **we can gives those frames to the network in a specific way**. That's what we're doing here.

Let's take all these images, randomize their order, and split them into smaller groups, those groups are what `batches` are. Epochs represent the collection of all those batches. 

Next, we'll add a `callback` function which will let us know how are loss is doing. The loss here is analogous to the idea of an error rate. If the model's doing a good job, that number goes down.

### Let's Test it!

```Javascript
async function predict() {

  timeend = new Date();

  ui.isPredicting();
  while (isPredicting) {
    const predictedClass = tf.tidy(() => { // memory management
      // get the latest frame from the webcam.
      const img = webcam.capture();

      // Make a prediction through mobilenet, getting the internal activation of
      // the mobilenet model.
      // this is our input
      const activation = mobilenet.predict(img);

      // Make a prediction through our newly-trained model using the activation
      // from mobilenet as input.
      const predictions = model.predict(activation);
      // Returns the index with the maximum probability. This number corresponds
      // to the class the model thinks is the most probable given the input.
      return predictions.as1D().argMax();
    });

    const classId = (await predictedClass.data())[0];
    predictedClass.dispose();

    // currentDir = ui.predictClass(classId);
    anim.move(ui.predictClass(classId));
    await tf.nextFrame();
  }
  ui.donePredicting();
}
```

This is our predict function. From this, every frame, we will make a prediction as to if the user is looking up right, left or down. 
Inside of the `while` loop, we use `tf.tidy` again to get rid of unecessary tensors and clean up memory as we go. This improves efficiency drastically.
First, we call the camera and ask for the latest frame, this is where we'll be getting our information from. Then, we take this frame and let the MobileNet make a prediction on it, which we'll call `activation`. We'll then use this activation and plug it into our neural network, so it can *propagate* though. 
Our output is what we return: `predictions.as1D().argMax()`, a 1-dimentional vector, containing the maximum value of our tensor.
