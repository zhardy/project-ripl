	

function feeder(id){
  console.log('eggs');

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
    // if( $('div#nextfeed p.message') === undefined){
      html = '<button id="feeder" class="feeder" name= "' + newFeeder + '" onclick= "feeder(' + data.newFeederID + ')">' + newFeeder + '</button>';
      html = html + "<div class = 'feeders_feed' id='feeders_feed'>";
      html = html + "<div class='feeder-pop' id='feeder-pop'>";
      html = html + "</div>";
      html = html + "</div> <br>";
    if($('div#nextfeed p.message').length === 0){   
      console.log('something'); 
      $('div#nextfeed').append(html);
      // $("div[name='"+newFeeder + "'").bind('click', feeder(data.newFeederID));
      
    }
    else{
      $('div#nextfeed').empty();
      html = "<form action='/logout'><button id='logout' class='logout_button'>Logout</button></form>" + html;
      $('div#nextfeed').append(html);


    }


    // }
    // else{

    // }
          //     <button id="feeder" class="feeder" onclick= <%- "'feeder(" + entry.User.uid + ")'"%> ><%-entry.User.username%></button>
          //   <div class = "feeders_feed" id="feeders_feed">
          //     <div class="feeder-pop" id="feeder-pop">
          //     </div>
          //   </div>
          // <br>
  });
}