'use strict';

var usernamePage = document.querySelector('#username-page');
var chatPage = document.querySelector('#chat-page');
var usernameForm = document.querySelector('#usernameForm');
var messageForm = document.querySelector('#messageForm');
var messageInput = document.querySelector('#message');
var messageArea = document.querySelector('#messageArea');
var connectingElement = document.querySelector('.connecting');

var stompClient = null;
var username = null;

var colors = [
    '#2196F3', '#1b665b','#32c787', '#00BCD4', '#ff5652', '#24913c', '#191352',
    '#ffc107', '#ff85af', '#5b1961', '#5e1839','#FF9800', '#8c202f','#39bbb0'
];

function connect(event) 
{
    username = document.querySelector('#name').value.trim();

    if(username)
    {
        usernamePage.classList.add('hidden');
        chatPage.classList.remove('hidden');

        var socket = new SockJS('/gowthamraj');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnected, onError);
    }
    event.preventDefault();
}


function onConnected() 
{
    stompClient.subscribe('/topic/public', onMessageReceived);

    stompClient.send("/app/chat.register",
        {},
        JSON.stringify({sender: username, type: 'JOIN'})
    )

    connectingElement.classList.add('hidden');
}


function onError(error) 
{
    connectingElement.textContent = 'Could not connect to the server. Please refresh this page to connect again!!!';
    connectingElement.style.color = 'red';
}


function sendMessage(event) 
{
    var messageContent = messageInput.value.trim();
    if(messageContent && stompClient) 
    {
        var chatMessage = 
        {
            sender: username,
            content: messageInput.value,
            type: 'CHAT'
        };
        stompClient.send("/app/chat.send", {}, JSON.stringify(chatMessage));
        messageInput.value = '';
    }
    event.preventDefault();
}

var emojies = [
	"happy","sad","smile","laughingcry","evil","love","professional","neutral","kiss",
	"kidding","angry","tired","shock","mask","joker","search","badword","cry"
];

var emojiCodes = [
	"&#128512;","&#128542;","&#128515;","&#128514;","&#128520;","&#128525;","&#128526;",
	"&#128528;","&#128536;","&#128541;","&#128545;","&#128555;","&#128561;","&#128567;",
	"&#129313;","&#129488;","&#129324;","&#128557;"
];
function isString(value) {
	return typeof value === 'string' || value instanceof String;
}
function onMessageReceived(payload) 
{
    var message = JSON.parse(payload.body);

    var messageElement = document.createElement('li');

    if(message.type === 'JOIN') 
    {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' joined the chat!';
    } 
    else if (message.type === 'LEAVE') 
    {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' left the Conversation!';
        showAlertBox();
    }
     else 
     {
        messageElement.classList.add('chat-message');

        var avatarElement = document.createElement('i');
        var avatarText = document.createTextNode(message.sender[0]);
        avatarElement.appendChild(avatarText);
        avatarElement.style['background-color'] = getAvatarColor(message.sender);

        messageElement.appendChild(avatarElement);

        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode(message.sender);
        var emojiText = message.content;
        if(emojies.includes(emojiText.toLowerCase()))
        {
	        usernameElement.appendChild(document.createElement("br"));
	    }	    
	    else
	    { 
            usernameElement.appendChild(usernameText);
        }
        messageElement.appendChild(usernameElement);
    }
    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message.content);
    var emojiText = message.content;
    if(emojiText.includes("joined"))
    {
	    textElement.style.color = "green";
	    textElement.style.fontWeight = "bold";
    }
    if(emojiText.includes("left"))
    {
	    textElement.style.color = "red";
	    textElement.style.fontWeight = "bold";
    }
    if(emojies.includes(emojiText.toLowerCase()))
    {
	    textElement.innerHTML = emojiCodes[emojies.indexOf(emojiText.toLowerCase())];
	    textElement.style.fontSize = "xx-large";
    }
    else
    {
        textElement.appendChild(messageText);
    }
    messageElement.appendChild(textElement);
    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
}

function showAlertBox()
{
    modelcontainer.classList.add('show');
    setTimeout(function(){
	   modelcontainer.classList.remove('show');
         }, 4000);
}

function getAvatarColor(messageSender) 
{
    var hash = 0;
    for (var i = 0; i < messageSender.length; i++)
    {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }
    var index = Math.abs(hash % colors.length);
    return colors[index];
}

usernameForm.addEventListener('submit', connect, true)
messageForm.addEventListener('submit', sendMessage, true)

$("#mailbtn").click(function() {
    window.location.href = 'mail.html';
});

$(".fa-grin-alt").on("click", function(){
  $(".mask").addClass("active");
});

function closeModal(){
  $(".mask").removeClass("active");
}

$(".close, .mask").on("click", function(){
  closeModal();
});

$(document).keyup(function(e) {
  if (e.keyCode == 27) {
    closeModal();
  }
});

$("#exitbtn").click(function() {
	console.log("close");
	//close();
    setTimeout(function(){var ww = window.open(window.location, '_self'); ww.close(); }, 1000);
});

$("#button1").click(function() {
    document.querySelector('#message').value=$(this).val();
    $(".mask").removeClass("active");
});
$("#button2").click(function() {
    document.querySelector('#message').value=$(this).val();
    $(".mask").removeClass("active");
});
$("#button3").click(function() {
    document.querySelector('#message').value=$(this).val();
    $(".mask").removeClass("active");
});
$("#button4").click(function() {
    document.querySelector('#message').value=$(this).val();
    $(".mask").removeClass("active");
});
$("#button5").click(function() {
    document.querySelector('#message').value=$(this).val();
    $(".mask").removeClass("active");
});
$("#button6").click(function() {
    document.querySelector('#message').value=$(this).val();
    $(".mask").removeClass("active");
});
$("#button7").click(function() {
    document.querySelector('#message').value=$(this).val();
    $(".mask").removeClass("active");
});
$("#button8").click(function() {
    document.querySelector('#message').value=$(this).val();
    $(".mask").removeClass("active");
});
$("#button9").click(function() {
    document.querySelector('#message').value=$(this).val();
    $(".mask").removeClass("active");
});
$("#button10").click(function() {
    document.querySelector('#message').value=$(this).val();
    $(".mask").removeClass("active");
});
$("#button11").click(function() {
    document.querySelector('#message').value=$(this).val();
    $(".mask").removeClass("active");
});
$("#button12").click(function() {
    document.querySelector('#message').value=$(this).val();
    $(".mask").removeClass("active");
});
$("#button13").click(function() {
    document.querySelector('#message').value=$(this).val();
    $(".mask").removeClass("active");
});
$("#button14").click(function() {
    document.querySelector('#message').value=$(this).val();
    $(".mask").removeClass("active");
});
$("#button15").click(function() {
    document.querySelector('#message').value=$(this).val();
    $(".mask").removeClass("active");
});
$("#button16").click(function() {
    document.querySelector('#message').value=$(this).val();
    $(".mask").removeClass("active");
});
$("#button17").click(function() {
    document.querySelector('#message').value=$(this).val();
    $(".mask").removeClass("active");
});
$("#button18").click(function() {
    document.querySelector('#message').value=$(this).val();
    $(".mask").removeClass("active");
});
$("#button19").click(function() {
    document.querySelector('#message').value=$(this).val();
    $(".mask").removeClass("active");
});
$("#button20").click(function() {
    document.querySelector('#message').value=$(this).val();
    $(".mask").removeClass("active");
});
$("#button21").click(function() {
    document.querySelector('#message').value=$(this).val();
    $(".mask").removeClass("active");
});
$("#button22").click(function() {
    document.querySelector('#message').value=$(this).val();
    $(".mask").removeClass("active");
});
$("#button23").click(function() {
    document.querySelector('#message').value=$(this).val();
    $(".mask").removeClass("active");
});
$("#button24").click(function() {
    document.querySelector('#message').value=$(this).val();
    $(".mask").removeClass("active");
});
$("#button25").click(function() {
    document.querySelector('#message').value=$(this).val();
    $(".mask").removeClass("active");
});
$("#button26").click(function() {
    document.querySelector('#message').value=$(this).val();
    $(".mask").removeClass("active");
});
$("#button27").click(function() {
    document.querySelector('#message').value=$(this).val();
    $(".mask").removeClass("active");
});
$("#button28").click(function() {
    document.querySelector('#message').value=$(this).val();
    $(".mask").removeClass("active");
});
$("#button29").click(function() {
    document.querySelector('#message').value=$(this).val();
    $(".mask").removeClass("active");
});
$("#button30").click(function() {
    document.querySelector('#message').value=$(this).val();
    $(".mask").removeClass("active");
});
$("#button31").click(function() {
    document.querySelector('#message').value=$(this).val();
    $(".mask").removeClass("active");
});
$("#button32").click(function() {
    document.querySelector('#message').value=$(this).val();
    $(".mask").removeClass("active");
});
$("#button33").click(function() {
    document.querySelector('#message').value=$(this).val();
    $(".mask").removeClass("active");
});
$("#button34").click(function() {
    document.querySelector('#message').value=$(this).val();
    $(".mask").removeClass("active");
});
$("#button35").click(function() {
    document.querySelector('#message').value=$(this).val();
    $(".mask").removeClass("active");
});
$("#button36").click(function() {
    document.querySelector('#message').value=$(this).val();
    $(".mask").removeClass("active");
});
