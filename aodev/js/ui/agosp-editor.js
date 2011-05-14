agosp = this.agosp || {};
agosp.ui = agosp.ui || {};

agosp.ui.editor = (function(){
  var _initCodeMirror = function(id) {
    return CodeMirror.fromTextArea(id, {
      height: "280px",
           parserfile: ["tokenizejavascript.js", "parsejavascript.js"],
           stylesheet: "css/codemirror/jscolors.css",
           path: "./lib/codemirror/",
           textWrapping: false,
           onChange: function() {
             now.sendCode({name: $('#user').val(), id: id, code: agosp.ui.editor.code.code() });
           }

    });
  };

  var _createEditor = function(textAreaId) {
    var codemirror = _initCodeMirror(textAreaId);
    return {
      code: function(c) {
              if (c == codemirror.getCode()) return c;
              if(!c) return codemirror.getCode();
              return codemirror.setCode(c);
            }
    };
  };

  var editor = {
    //code: _createEditor( 'code' )
  };

  agosp.events.add( document, agosp.events.APPLICATION_STARTED, function(){ 
    agosp.out( "Editor module is ready" );
    agosp.ui.editor.code = _createEditor( 'code' );
    agosp.ui.editor.test = _createEditor( 'test' );
  });	

  now.updateCode = function(msg) {
    if (msg.name != $('#user').val()) {
      agosp.ui.editor.code.code(msg.code);
    }
  }

  return editor;
})();
