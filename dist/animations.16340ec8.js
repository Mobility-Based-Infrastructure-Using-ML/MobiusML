// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({3:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.move = move;
exports.retract = retract;
exports.expand = expand;
exports.init = init;
exports.setCameraSelected = setCameraSelected;
exports.unSelectCamera = unSelectCamera;
console.log('animations running');

var camcircle = document.getElementsByClassName('cam-circle');

var topcamera = document.getElementById('top-camera');
var rightcamera = document.getElementById('right-camera');
var bottomcamera = document.getElementById('bottom-camera');
var leftcamera = document.getElementById('left-camera');

function move(element) {

    switch (element) {
        case 'FRONT':
            retract();
            topcamera.style.animation = 'slide-top 0.3s ease-in-out both';
            break;
        case 'RIGHT':
            retract();
            rightcamera.style.animation = 'slide-right 0.3s ease-in-out both';
            break;
        case 'BOTTOM':
            retract();
            bottomcamera.style.animation = 'slide-bottom 0.3s ease-in-out both';
            break;
        case 'LEFT':
            retract();
            leftcamera.style.animation = 'slide-left 0.3s ease-in-out both';
            break;
    }
}

function retract() {
    for (var i = 0; i < camcircle.length - 1; i++) {
        // -1 because the center circle is also a camera but we dont want that one to dissapear
        camcircle[i].style.animation = 'retract 0.3s ease-in-out both';
    }
}

function expand() {

    topcamera.style.animation = 'slide-top 0.3s ease-in-out both';
    rightcamera.style.animation = 'slide-right 0.3s ease-in-out both';
    bottomcamera.style.animation = 'slide-bottom 0.3s ease-in-out both';
    leftcamera.style.animation = 'slide-left 0.3s ease-in-out both';
}

function init() {
    document.getElementById('top-camera').onmousedown = function () {
        setCameraSelected('up');
    };
    document.getElementById('right-camera').onmousedown = function () {
        setCameraSelected('right');
    };
    document.getElementById('left-camera').onmousedown = function () {
        setCameraSelected('left');
    };
    document.getElementById('bottom-camera').onmousedown = function () {
        setCameraSelected('down');
    };

    // const camCircles = document.getElementsByClassName('cam-circle');
    for (var i = 0; i < camcircle.length; i++) {
        camcircle[i].onmouseup = function () {
            unSelectCamera();
        };
    }
}

function setCameraSelected(direction) {
    // allows to select a camera to have a glowing halo around it
    switch (direction) {
        case 'up':
            document.getElementById('top-camera').classList.add('selected');
            break;
        case 'down':
            document.getElementById('bottom-camera').classList.add('selected');
            break;
        case 'left':
            document.getElementById('left-camera').classList.add('selected');
            break;
        case 'right':
            document.getElementById('right-camera').classList.add('selected');
            break;

    }
}

function unSelectCamera() {
    // console.log('unselect is running');
    document.getElementById('top-camera').classList.remove('selected');
    document.getElementById('bottom-camera').classList.remove('selected');
    document.getElementById('left-camera').classList.remove('selected');
    document.getElementById('right-camera').classList.remove('selected');
}

init();
expand();
},{}]},{},[3], null)
//# sourceMappingURL=/animations.16340ec8.map