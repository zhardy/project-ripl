//test
//test
var lightCompliment = function(a){
  var col = a.substr(1,6);
  var r=parseInt("0x"+col.substr(0,2));
  var g=parseInt("0x"+col.substr(2,2));
  var b=parseInt("0x"+col.substr(4,2));

  r=r+Math.round(r/5);
  if(r>255){
    r=255;
  }
  g=g+Math.round(g/5);
  if(g>255){
    g=255;
  }
  b=b+Math.round(b/5);
  if(b>255){
    b=255;
  }
  r=r.toString(16);
  g=g.toString(16);
  b=b.toString(16);
  col="#"+r+g+b;
  return col;
}

var darkCompliment = function(a){
  var col = a.substr(1,6);
  var r=parseInt("0x"+col.substr(0,2));
  var g=parseInt("0x"+col.substr(2,2));
  var b=parseInt("0x"+col.substr(4,2));

  r=r-Math.round(r/5);
  if(r<0){
    r=0;
  }
  g=g-Math.round(g/5);
  if(g<0){
    g=0;
  }
  b=b-Math.round(b/5);
  if(b<0){
    b=0;
  }
  r=r.toString(16);
  if(r.length===1){
    r="0"+r;
  }
  g=g.toString(16);
  if(g.length===1){
    g="0"+g;
  }
  b=b.toString(16);
  if(b.length===1){
    b="0"+b;
  }
  col="#"+r+g+b;
  return col;
}

var baseColor = "#404040";
darker1 = darkCompliment(baseColor);
darker2 = darkCompliment(darker1);
darker3 = darkCompliment(darker2);
darker4 = darkCompliment(darker3);
lighter1 = lightCompliment(baseColor);

var setColors = function () {
  $('#mainfeed').css("background-color", baseColor);
  $('.feeders_feed').css("background-color", darker3);
  $('#mainfeed').css("border-color", darker4);
  $('#nav').css("background-color", darker1);
  $('.pop-up').css("background-color", darker1);
  $('#search input').css("background", darker4);
  $('#text_changer').css("background", baseColor);
  $('#name_filter').css("background", baseColor);
  $('#wrapper').css("background-color", darker1);
  $('#navtray_color').css("background-color", darker1);
  $('#navtray_search').css("background-color", darker1);
  $('.story').css("background-color", darker2);
  $('#nextfeed').css("background-color", darker1);
  $('.icon_button').css("background-color", darker1);
  $('.story_container h2').css("background-color", darker1);
  $('.icon_button.active').css("background-color", darker4);
  $('.filters .filter-links a').css("background-color", baseColor);
  $('#logout').css("background-color", baseColor);
  $('.source_button').css("background-color", baseColor);
  $('#filter_checkbox').css("background-color", darker2);
  $('.filter-links').children('li.active').children().css("background-color", darker2);
  $('.feeder').css("background-color", darker3);
}

var filterCount = function(){
return $('.filter-links').children().length;
}

$('#search_icon').click(function(){
  if ($(this).attr('class') === 'icon_button active') {
    $(this).css("background-color", darker1);
    $(this).removeClass('active');
  } else if ($(this).siblings('#color_icon').attr('class') === 'icon_button active') {
    $(this).siblings('#color_icon').removeClass('active');
    $(this).siblings('#color_icon').css("background-color", darker1);
    $(this).css("background-color", darker4);
    $(this).addClass('active');
  } else {
    $(this).css("background-color", darker4);
    $(this).addClass('active');
  }
  if($(this).parent().siblings('#navtray_search').attr('class')==='disabled'){
    if($(this).parent().siblings('#navtray_color').attr('class')==='active'){
      $(this).parent().siblings('#navtray_color').removeClass('active').addClass('disabled');
    }
    $(this).parent().siblings('#navtray_search').removeClass('disabled').addClass('active');
  }
  else{
    $(this).parent().siblings('#navtray_search').removeClass('active').addClass('disabled');
  }
});

$('#search_icon').hover(function(){
  if ($(this).attr('class') !== 'icon_button active') {
    $(this).css("background-color", darker2);
  }
}, function() {
  if ($(this).attr('class') === 'icon_button active') {
    $(this).css("background-color", darker4);
  } else {
    $(this).css("background-color", darker1);
  }
});

$('#color_icon').click(function(){
  if ($(this).attr('class') === 'icon_button active') {
    $(this).css("background-color", darker1);
    $(this).removeClass('active');
  } else if ($(this).siblings('#search_icon').attr('class') === 'icon_button active') {
    $(this).siblings('#search_icon').removeClass('active');
    $(this).siblings('#search_icon').css("background-color", darker1);
    $(this).css("background-color", darker4);
    $(this).addClass('active');
  } else {
    $(this).css("background-color", darker4);
    $(this).addClass('active');
  }
  if($(this).parent().siblings('#navtray_color').attr('class')==='disabled'){
    if($(this).parent().siblings('#navtray_search').attr('class')==='active'){
      $(this).parent().siblings('#navtray_search').removeClass('active').addClass('disabled');
    }
    $(this).parent().siblings('#navtray_color').removeClass('disabled').addClass('active');
  }
  else{
    $(this).parent().siblings('#navtray_color').removeClass('active').addClass('disabled');
  }
});

$('#color_icon').hover(function(){
  if ($(this).attr('class') !== 'icon_button active') {
    $(this).css("background-color", darker2);
  }
}, function() {
  if ($(this).attr('class') === 'icon_button active') {
    $(this).css("background-color", darker4);
  } else {
    $(this).css("background-color", darker1);
  }
});

// HOME BUTTON CLICK / HOVER
$('#home_icon').click(function(){
    $(this).css("background-color", darker4);
    location.reload();
});

$('#home_icon').hover(function(){
    $(this).css("background-color", darker2);
}, function() {
    $(this).css("background-color", darker1);
});
// -------------------------

$('#colorpicker').click(function(){
  var col1 =$("#color").val();
  var txtColor1;
  var txtColor2;

  var col = col1.substr(1,6);
  var r=parseInt("0x"+col.substr(0,2));
  var g=parseInt("0x"+col.substr(2,2));
  var b=parseInt("0x"+col.substr(4,2));
  console.log(r+g+b);
  console.log("^ r+g+b")

  if(r+g+b < 576){
    txtColor1="0xffffff";
  }
  else{
    txtColor1="0x000000";
  }
  txtColor1=txtColor1.substr(2,6);
  txtColor1="#"+txtColor1.toString(16);

  baseColor=col1;
  lighter1=lightCompliment(col1);
  darker1=darkCompliment(col1)
  darker2=darkCompliment(darker1);
  darker3=darkCompliment(darker2);
  darker4=darkCompliment(darkCompliment(darker2));
  var cur =$('#mainfeed').css("color");
  setColors();
  console.log(txtColor1);
  $('*').css("color", txtColor1);
});

$('#text_changer').click(function(){
  console.log("text"+$(this).attr('class'))
  if ($(this).attr('class')==='white') {
    console.log("if");
    $(this).removeClass('white').addClass('black');
  } else {
    console.log("else");
    $(this).removeClass('black').addClass('white');
  }
  if($(this).hasClass('white'))
    $('*').css("color", "#ffffff");
  else
    $('*').css("color", "#000000");
});

var changeFilter = function(item){
  var currentAttrValue = item.attr('href');

  // Show/Hide Tabs
  $('.filters ' + currentAttrValue).show().siblings().hide();

  // Change/remove current tab to active
  item.closest('div').siblings().removeClass('active');
  item.parent('li').addClass('active').siblings().removeClass('active');
  item.closest('div').siblings(currentAttrValue).addClass('active');
  event.preventDefault();
}

var displayDialog = function(){
	$("#wrapper").fadeTo("fast", 0.25);
    $('.pop-up').addClass('active');
    $('#name_filter').attr("value",$('.filter-links').find('li.active').children('a').html());
   // console.log($('.filter-links').find('li.active').children('a').html());
    //console.log(""+$("a[href='#filter2']").html());
}
var removeDialogs = function(){
	$('.pop-up').removeClass('active');
	$("#wrapper").fadeTo("slow", 1);
}

// var displayDialog = function(item){
//   var currentAttrValue = item.attr('href');
//   if(item.siblings('div').attr('class')==='active'){
//   item.siblings('div').removeClass('active').addClass('disabled');
//   $("#wrapper").fadeTo("slow", 1);
//   }
//   else{
//   item.siblings('div').removeClass('disabled').addClass('active');
//   item.parent().siblings('li').children('div').removeClass('active');
//   $("#wrapper").fadeTo("slow", 0.1);
// }
//   console.log("double click");
//   event.preventDefault();
// }

$('.filters .filter-links a').click(function(event) {
  $('.filters .filter-links a').removeClass('active');
  $('.filters .filter-links a').css('background-color', baseColor);
  $(this).addClass('active');
  $(this).css('background-color', darker2);
  console.log($(this).attr('class'));
  changeFilter($(this));
});

$('#addfilter').click(function(){
  var filterNum = $(this).parent().siblings().length+1;
  $(this).parent().siblings().removeClass('active');
  $(this).closest('div').siblings().removeClass('active');
  $('#addfilter').parent().removeClass('active'); 
  $(this).parent().before("<li class='active'><a href= '#filter"+filterNum+"'>filter #"+filterNum+"</a>");
  $('#mainfeed').append("<div id='filter"+filterNum+"' class='filter active'>filter "+filterNum+"</div");
  console.log("h"+$("a[href='#filter"+filterNum+"']")+"o");
  $("a[href='#filter"+filterNum+"']").bind('click',function (){
    $('.filters .filter-links a').removeClass('active');
    $('.filters .filter-links a').css('background-color', baseColor);
    $(this).addClass('active');
    $(this).css('background-color', darker2);
    changeFilter($("a[href='#filter"+filterNum+"']"));
  });
  $("a[href='#filter"+filterNum+"']").bind('dblclick',function (){
    // $("#wrapper").fadeTo("fast", 0.25);
    // $('.pop-up').addClass('active');
    displayDialog($("a[href='#filter"+filterNum+"']"));
  });

  setColors();


});

$('html').click(function(){
	$('.feeders_feed').removeClass('active');
	removeDialogs();
});

$('.pop-up').click(function(e){
	e.stopPropagation();
});
  
  for(var i=0;i<(filterCount()-1);i++){
 $("a[href='#filter"+(i+2)+"']").bind('dblclick',function (){
    // console.log(filterCount());
    // console.log("a[href='#filter"+(i+1)+"']");
    // $("#wrapper").fadeTo("slow", 0.1);
    // $('.pop-up').addClass('active');
    displayDialog();
    setColors();
  });
}

$('.feeder').click(function(e){
  console.log($(this));
	if($(this).next('.feeders_feed').hasClass('active')){
	$('.feeders_feed').removeClass('active');
}
    else{
    $('.feeders_feed').removeClass('active');
	$(this).next('.feeders_feed').addClass('active');
	// $(this).next('.feeders_feed').load('ejs/feeder.ejs'); 
}
e.stopPropagation();
});

$('.feeders_feed:not(button)').click(function(e){
	e.stopPropagation();
});


$('#feeder_back').click(function(){
	console.log("prop");
	$('.feeders_feed').removeClass('active');
});


// $('document').ready(function() {
// setColors();
// });

