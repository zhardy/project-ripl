//if(('.name').width()<63)
console.log($('.name').width());
console.log($('#email').width());
console.log($('button').width());
if($('.name').width()<71){
	$('.name').css("width", 71);
}
if($('#email').width()<158){
	$('#email').width(147);
}
if($('button').width()<45){
	$('button').width(45);
}