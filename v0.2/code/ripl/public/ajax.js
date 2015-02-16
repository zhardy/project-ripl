function signup(){
	var fnameVal = $("input[name='fname'").value();
 	var lnameVal = $("input[name='lname'").value();
	var emailVal = $("input[name='email'").value();

	$.ajax({
    type : 'POST',
    url  : '/signup',
    data : { fname: fnameVal, lname: lnameVal, email: emailVal },
    dataType : 'json'
  }).done();
}

