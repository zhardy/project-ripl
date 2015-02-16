if($('.name').width()<71){
	$('.name').width(71);
}
if($('#email').width()<158){
	$('#email').width(147);
}
if($('button').width()<45){
	$('button').width(45);
}

$(document).ready(function(){
pos=0;
});

$('body').bind('mousewheel', function(e){
	
	$('body').stop();
});

(function() {        
    var timer;
    $(window).bind('scroll',function () {
        clearTimeout(timer);
        timer = setTimeout( refresh , 500 );
    });
    var refresh = function () { 
        // do stuff

        console.log('Stopped Scrolling'); 
        var scroll = $(window).scrollTop();
        console.log("offset = "+ scroll); 
        var height = $('body').height();
        if(scroll<320)
        	$("html, body").animate({scrollTop: "0"}, 1000);
        else
        $("html, body").animate({scrollTop: height}, 1000);	
    };
})();

