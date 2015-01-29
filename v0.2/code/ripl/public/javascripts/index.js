$('html').click(function(){
	console.log("html");
	$('#nav').removeClass('active');

});

$('#nav').click(function(e){
e.stopPropagation();
});

$('#home_button').click(function(e){
	if($("#nav").hasClass('active')){
		console.log("if");
	$('#nav').removeClass('active');
}
    else{
    	console.log("else");
    $('#nav').addClass('active');
}
e.stopPropagation();
});
