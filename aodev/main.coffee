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
everyone.now.sendCode= (code)->
  everyone.now.updateCode(code)
