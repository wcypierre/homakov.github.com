(function(){

	document.cookie='x=123'
	localStorage.token='123'
	var xhr=XMLHttpRequest;	

	//some code here
})()

var d=function(){}  

for(var i in document){ 
  document.__defineGetter__(i,d);
  Object.defineProperty(document,i,{configurable: false});
}

for(var i in window){ 
  window.__defineGetter__(i,d);
  Object.defineProperty(window,i,{configurable: false});
} 