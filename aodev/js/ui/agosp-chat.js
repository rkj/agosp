
agosp = this.agosp || {};
agosp.ui = agosp.ui || {};

agosp.ui.chat = (function(){

  now.name = 'unknown';
  $(document).ready(function() {
    $("#user").change(function() {
      var old = now.name;
      now.name = $("#user").val();
      now.changeName(old, now.name);
    });
  });
  var chat = {
    add: function(msg) {
           jQuery("#chat").append( "<li><span class='user'>"+msg.user+"</span>"+msg.message+"</li>" );
           jQuery("#chat").attr({ scrollTop: jQuery("#chat").attr("scrollHeight") });
         },
  send: function() {
          now.distributeMessage({name: now.name, message: $("#message").val()});
        }
  };

  agosp.events.add( document, agosp.events.CHAT_MSG_RECEIVED, chat.add.bind(chat) );

  agosp.events.add( document, agosp.events.APPLICATION_STARTED, function(){ 
    agosp.out( "Chat module is ready" ); 
    jQuery("#sendmsg").click( chat.send.bind(chat) );
  });

  now.receiveMessage = function(name, message){
    $("#chat").append("<li>" + name + ": " + message + "</li>");
  }

  return chat;

})();
