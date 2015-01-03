	

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
  });
}
	