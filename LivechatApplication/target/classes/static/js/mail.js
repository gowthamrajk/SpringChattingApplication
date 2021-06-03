const feedbackForm = document.getElementById("usernameForm");

feedbackForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = feedbackForm['email'].value;
    console.log(email);
    var url = "sendemail/"+email+"/";
    redirect(url);
})
function redirect(url)
{
	 location.href=url;
	 setTimeout(function(){
	   location.href="success.html";
         }, 5000);
}