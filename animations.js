console.log('animations running');

const camcircle = document.getElementsByClassName('cam-circle');
    
const topcamera = document.getElementById('top-camera');
const rightcamera = document.getElementById('right-camera');
const bottomcamera = document.getElementById('bottom-camera');
const leftcamera = document.getElementById('left-camera');

export function move(element) {

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

export function retract() {
    for(let i = 0; i < camcircle.length - 1; i++) { // -1 because the center circle is also a camera but we dont want that one to dissapear
        camcircle[i].style.animation = 'retract 0.3s ease-in-out both';
    }
}

export function expand() {

    topcamera.style.animation = 'slide-top 0.3s ease-in-out both';
    rightcamera.style.animation = 'slide-right 0.3s ease-in-out both';
    bottomcamera.style.animation = 'slide-bottom 0.3s ease-in-out both';
    leftcamera.style.animation = 'slide-left 0.3s ease-in-out both';
}

export function init() {
    document.getElementById('top-camera').onmousedown = function(){setCameraSelected('up')};
    document.getElementById('right-camera').onmousedown = function(){setCameraSelected('right')};
    document.getElementById('left-camera').onmousedown = function(){setCameraSelected('left')};
    document.getElementById('bottom-camera').onmousedown = function(){setCameraSelected('down')};    

    // const camCircles = document.getElementsByClassName('cam-circle');
    for(var i = 0; i < camcircle.length; i++) camcircle[i].onmouseup = function(){unSelectCamera()};

}

export function setCameraSelected(direction) { // allows to select a camera to have a glowing halo around it
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
  
export function unSelectCamera() {
// console.log('unselect is running');
document.getElementById('top-camera').classList.remove('selected');
document.getElementById('bottom-camera').classList.remove('selected');
document.getElementById('left-camera').classList.remove('selected');
document.getElementById('right-camera').classList.remove('selected');
}

init();
expand();