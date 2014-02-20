(function(){

	document.cookie='x=123'
	localStorage.token='123'
	var xhr=XMLHttpRequest;	

	//some code here
})()

var d=function(){}
var ar = ['XMLHttpRequest', 'localStorage', 'open', 'opener'];
for(var i =0;i<ar.length;i++){
  window.__defineGetter__(ar[i],d);
  Object.defineProperty(window,ar[i],{configurable: false});
} 

var ar = ['cookie','createElement'];
for(var i =0;i<ar.length;i++){
  document.__defineGetter__(ar[i],d);
  Object.defineProperty(document,ar[i],{configurable: false});
} 