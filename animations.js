function move(element) {
    switch (element) {
        case 97:
            retract();
            $("#top-camera").css({
                '-webkit-animation' : 'slide-top 0.3s ease-in-out both'
            });
            break;
        case 115:
            retract();
            $("#right-camera").css({
                '-webkit-animation' : 'slide-right 0.3s ease-in-out both'
            });
            break;
        case 100:
            retract();
            $("#bottom-camera").css({
                '-webkit-animation' : 'slide-bottom 0.3s ease-in-out both'
            });
            break;
        case 102:
            retract();
            $("#left-camera").css({
                '-webkit-animation' : 'slide-left 0.3s ease-in-out both'
            });
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