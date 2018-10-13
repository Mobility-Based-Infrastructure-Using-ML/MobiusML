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
})({10:[function(require,module,exports) {
console.log('animations running');

function move(element) {

    // does it already exist - do you have competition
    // is it on github?
    // 

    var topcamera = document.getElementById('top-camera');
    var rightcamera = document.getElementById('right-camera');
    var bottomcamera = document.getElementById('bottom-camera');
    var leftcamera = document.getElementById('left-camera');

    switch (element) {
        case 97:
            retract();
            topcamera.style.animation = 'slide-top 0.3s ease-in-out both';
            // $("#top-camera").css({
            //     '-webkit-animation' : 'slide-top 0.3s ease-in-out both'
            // });
            break;
        case 115:
            retract();
            rightcamera.style.animation = 'slide-right 0.3s ease-in-out both';
            $("#right-camera").css({
                '-webkit-animation': 'slide-right 0.3s ease-in-out both'
            });
            break;
        case 100:
            retract();
            bottomcamera.style.animation = 'slide-bottom 0.3s ease-in-out both';
            // $("#bottom-camera").css({
            //     '-webkit-animation' : 'slide-bottom 0.3s ease-in-out both'
            // });
            break;
        case 102:
            retract();
            leftcamera.style.animation = 'slide-left 0.3s ease-in-out both';
            // $("#left-camera").css({
            //     '-webkit-animation' : 'slide-left 0.3s ease-in-out both'
            // });
            break;
    }
}

function retract() {
    $(".cam-circle").css({
        '-webkit-animation': 'retract 0.3s ease-in-out both'
    });
}

function expand() {
    $("#top-camera").css({
        '-webkit-animation': 'slide-top 0.3s ease-in-out both'
    });
    $("#right-camera").css({
        '-webkit-animation': 'slide-right 0.3s ease-in-out both'
    });
    $("#bottom-camera").css({
        '-webkit-animation': 'slide-bottom 0.3s ease-in-out both'
    });
    $("#left-camera").css({
        '-webkit-animation': 'slide-left 0.3s ease-in-out both'
    });
}

$(document).ready(function () {
    expand();
    $(document).keypress(function (e) {
        move(e.keyCode);
    });
});
},{}]},{},[10], null)
//# sourceMappingURL=/animations.16340ec8.map