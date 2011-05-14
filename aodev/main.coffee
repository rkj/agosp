http = require 'http'
now = require('now')
static = require('node-static')
file = new(static.Server)
server = http.createServer (req, res)-> 
  req.addListener 'end', ->
    file.serve(req, res);
server.listen 8124;
  
everyone = now.initialize(server)
everyone.now.distributeMessage=  (msg)->
  everyone.now.receiveMessage(msg.name, msg.message);
everyone.now.changeName = (old, name) ->
  everyone.now.receiveMessage "system", "user #{old} is now known as #{name}"
everyone.connected ->
  everyone.now.receiveMessage('system', "user #{this.now.name} has connected");
everyone.disconnected ->
  everyone.now.receiveMessage('system', "user #{this.now.name} has disconnected")
everyone.now.sendCode= (msg)->
  everyone.now.updateCode(msg)
