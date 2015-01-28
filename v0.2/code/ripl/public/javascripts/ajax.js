function signup(){
	var fnameVal = $("input[name='fname'").val();
 	var lnameVal = $("input[name='lname'").val();
	var emailVal = $("input[name='email'").val();

	$.ajax({
    type : 'POST',
    url  : '/signup',
    data : { fname: fnameVal, lname: lnameVal, email: emailVal },
    dataType : 'json'
  }).done( function (){
  	var html="";
  	var div = $("div");
  	div.empty();
  	html = "<h3> Thanks, " + fnameVal + "! We'll let you know when the site is online!</h3>";
  	div.append(html);
  });
}

