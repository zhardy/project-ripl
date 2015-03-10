	

function feeder(id){

  

 $.ajax({
    type : 'POST',
    url  : '/feeder',
    data : { feederID: id },
    dataType : 'json'
  }).done( function (data){
    var html = "";
    var div = $('div#feeder-pop');
    
    
    div.empty();


    data.articles.forEach(function (article){
      var temp = "<div class = 'story'> <div class='story_container'>";
      temp = temp + "<a href= '" +  article.link + "' ><h2>" + article.title + '|' + article.meta.title +" </h2></a>";
      temp = temp + "<p>" + article.summary + "</p> <p class = 'timestamp'> " + article.pubdate + " </p> </div> </div>";
      html = html + temp;
    
    });


    $('div#feeder-pop').append(html);

    $('div#feeders_feed').addClass('active');   
      });
}

function newFeeder(){
  var value = $("input[name='newFeeder'");
  var newFeeder = value.val();
  console.log(newFeeder);
	$.ajax({
    type : 'POST',
    url  : '/newFeeder',
    data : { newFeederName: newFeeder },
    dataType : 'json'
  }).done( function (data){
    var html = "";
    $("input[name='newFeeder'").val('');
      html = '<button id="feeder" class="feeder" onclick= "feeder(' + data.newFeederID + ')">' + newFeeder + '</button>';
      html = html + "<div class = 'feeders_feed' id='feeders_feed'>";
      html = html + "<div class='feeder-pop' id='feeder-pop'>";
      html = html + "</div>";
      html = html + "</div> <br>";
    if($('div#nextfeed p.message').length === 0){   

      $('div#nextfeed').append(html);
      // if($(this).next('#feeders_feed').hasClass('active')){
      //   $('#feeders_feed').removeClass('active');
      // }
      //     else{
      //   $(this).next('#feeders_feed').addClass('active');
      // }
      

      // $('.feeders_feed:not(button)').click(function(e){
      //   e.stopPropagation();
      // });


      // $('#feeder_back').click(function(){
      //   console.log("prop");
      //   $('.feeders_feed').removeClass('active');
      // }
    }
    else{
      $('div#nextfeed').empty();
      html = "<form action='/logout'><button id='logout' class='logout_button'>Logout</button></form>" + html;
      $('div#nextfeed').append(html);
      // $('.feeder').click(function(e){
      //   if($(this).next('.feeders_feed').hasClass('active')){
      //   $('.feeders_feed').removeClass('active');
      // }
      //     else{
      //     $('.feeders_feed').removeClass('active');
      //   $(this).next('.feeders_feed').addClass('active');
      //   // $(this).next('.feeders_feed').load('ejs/feeder.ejs'); 
      // }
      // e.stopPropagation();
      // });

      // $('.feeders_feed:not(button)').click(function(e){
      //   e.stopPropagation();
      // });


      // $('#feeder_back').click(function(){
      //   console.log("prop");
      //   $('.feeders_feed').removeClass('active');
      // });


    }


  });
}