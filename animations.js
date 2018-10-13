console.log('animations running');

const camcircle = document.getElementsByClassName('cam-circle');
    
const topcamera = document.getElementById('top-camera');
const rightcamera = document.getElementById('right-camera');
const bottomcamera = document.getElementById('bottom-camera');
const leftcamera = document.getElementById('left-camera');

function move(element) {

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
                '-webkit-animation' : 'slide-right 0.3s ease-in-out both'
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
    camcircle.style.animation = 'retract 0.3s ease-in-out both';
    // $(".cam-circle").css({
    //     '-webkit-animation' : 'retract 0.3s ease-in-out both'
    // });
}

function expand() {
    // $("#top-camera").css({
    //     '-webkit-animation' : 'slide-top 0.3s ease-in-out both'
    // });
    // $("#right-camera").css({
    //     '-webkit-animation' : 'slide-right 0.3s ease-in-out both'
    // });
    // $("#bottom-camera").css({
    //     '-webkit-animation' : 'slide-bottom 0.3s ease-in-out both'
    // });
    // $("#left-camera").css({
    //     '-webkit-animation' : 'slide-left 0.3s ease-in-out both'
    // });

    topcamera.style.animation = 'slide-top 0.3s ease-in-out both';
    rightcamera.style.animation = 'slide-right 0.3s ease-in-out both';
    bottomcamera.style.animation = 'slide-bottom 0.3s ease-in-out both';
    leftcamera.style.animation = 'slide-left 0.3s ease-in-out both';
}

function init() {
    document.getElementById('top-camera').onmousedown = function(){setCameraSelected('up')};
    document.getElementById('right-camera').onmousedown = function(){setCameraSelected('right')};
    document.getElementById('left-camera').onmousedown = function(){setCameraSelected('left')};
    document.getElementById('bottom-camera').onmousedown = function(){setCameraSelected('down')};    

    const camCircles = document.getElementsByClassName('cam-circle');
    for(var i = 0; i < camCircles.length; i++) camCircles[i].onmouseup = function(){unSelectCamera()};


}

function setCameraSelected(direction) {
    // console.log('set selected is running');
    switch(direction) {
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