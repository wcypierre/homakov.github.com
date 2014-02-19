(function(){

	document.cookie='x=123'
	localStorage.token='123'
	var xhr=XMLHttpRequest;	

	//some code here
})()

var d=function(){}
document.__defineGetter__('cookie',d)
document.__defineSetter__('cookie',d)

window.__defineGetter__('localStorage',d)
window.__defineSetter__('localStorage',d)

window.__defineGetter__('XMLHttpRequest',d)

// you cannot open a new window to grab them
window.__defineGetter__('open',d)

// no opener trick either!
window.__defineGetter__('opener',d)
