module("Aspect");

test("basic test", function(){
	equals( typeof createAspect, "function", "createAspect is a function");
	
	var btest = false;
	var obj = {
		x: 10,
		btest: function(){ btest = true; },
		pow10: function(y){ return Math.pow(this.x,y); }
	};
	window.fglobal = function(){};
	var tester = 0;
	
	equals( obj.pow10(2), 100, "Test method returns 100" );
	raises( function(){createAspect(obj,"nonexist", function(){ tester++})}, TypeError, "Must throw type errror when executed for non-function")
	
	createAspect( null, "fglobal", function(){ tester++} );
	window.fglobal();
	
	createAspect( obj, "btest", function(){ tester++ } );
	createAspect( obj, "pow10", function(){ tester++ } );
	obj.btest();
	
	equals( btest, true, "Btest function executed together with an aspect" );
	equals( obj.pow10(2), 100, "pow10 function returns 100" );
	equals( tester, 3, "Three aspect functions have been executed" );
});

test("after", function(){
	var obj = {
			x: 10,
			pow10: function(y){ return Math.pow(this.x,y); }
		};
	createAspect( obj, "pow10", function(){ obj.x=11; }, "after" );
	equals( obj.pow10(2), 100, "Modified function returns 100" );
	equals( obj.x, 11, "Aspect executed once; and after the main function" );
	
});

test("once", function(){
	var obj = {
			x: 10,
			pow10: function(y){ return Math.pow(this.x,y); }
		};	
	var count = 0;
	createAspect( obj, "pow10", function(){ count++; }, "before", true );
	obj.pow10(2);
	obj.pow10(2);
	equals( count, 1, "Aspect should be executed only once" );
});
