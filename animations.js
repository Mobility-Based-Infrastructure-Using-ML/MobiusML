console.log('animations running');

function move(element) {

    

    // does it already exist - do you have competition
    // is it on github?
    // 
    
    const topcamera = document.getElementById('top-camera');
    const rightcamera = document.getElementById('right-camera');
    const bottomcamera = document.getElementById('bottom-camera');
    const leftcamera = document.getElementById('left-camera');

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
    $(".cam-circle").css({
        '-webkit-animation' : 'retract 0.3s ease-in-out both'
    });
}

function expand() {
    $("#top-camera").css({
        '-webkit-animation' : 'slide-top 0.3s ease-in-out both'
    });
    $("#right-camera").css({
        '-webkit-animation' : 'slide-right 0.3s ease-in-out both'
    });
    $("#bottom-camera").css({
        '-webkit-animation' : 'slide-bottom 0.3s ease-in-out both'
    });
    $("#left-camera").css({
        '-webkit-animation' : 'slide-left 0.3s ease-in-out both'
    });
}

$(document).ready(function () {
    expand();
    $(document).keypress(function(e){
        move(e.keyCode);
    });
});