var http = require('http');
var fs = require('fs');

var hustlers = [];
var bounties = [];



done = function(){
  if(--requested == 0){
    hustlers.sort(function(a,b){
      return b.bounties.length-a.bounties.length
    });

    for(var i=0,l=hustlers.length;i<l;i++){
    	details = [];
    	for(var key in hustlers[i].details){
    		details += key+" ("+hustlers[i].details[key]+")"
    	}
      
      result += ("<tr><td>"+i+"</td><td>" + hustlers[i].handles[0] + "</td><td>" + details.join(', ') + "</td></tr>")
    }

    result = '<table>' + result + '</table>';
    fs.writeFile("hustlers.html", result, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    });
  }
}
get = function(url, cb){
  http.get(url, function(res) {
      var body = '';

      res.on('data', function(chunk) {
          body += chunk;
      });

      res.on('end', function() {
        cb(body);
      });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  })
}
upgrade_hustler = function(h,id){	
  h.bounties.push(id);
  if(h.details[bounties[id].name]){
    h.details[bounties[id].name] += 1
  }else{
    h.details[bounties[id].name] = 1
  }
}
lookup_hustler = function(name){
  for(var i=0,l=hustlers.length;i<l;i++){
    if(hustlers[i].handles.indexOf(name) != -1){
      return hustlers[i];
    }
  }
  num = hustlers.push({
    handles: [name],
    reward: 0,
    bounties: [],
    details: {}
  });
  return hustlers[num-1];
}



bounties.push({
  name: "Ebay",
  url: 'http://pages.ebay.com/securitycenter/ResearchersAcknowledgement.html',
  cb: function(r, id){

    var res;
    var reg  = /<li>(.*?)<\/li>/g;
    var html = /</;
    while ((res = reg.exec(r)) !== null){
      if(!html.test(res[1])){
        h = lookup_hustler(res[1]);
        upgrade_hustler(h,id);
      }
    }
  }
})

bounties.push({
  name: "Chromium",
  url: 'http://www.chromium.org/Home/chromium-security/hall-of-fame',
  cb: function(r, id){
    var res;
    var reg  = /<li>(.*?)<\/li>/g;
    while ((res = reg.exec(r)) !== null){

      item = res[1].split(/\sfor/)[0];
      item = item.split(/\sto\s/).reverse();
 
      h = lookup_hustler(item[0]);
      upgrade_hustler(h,id);
      if(item.length == 2)
        h.reward += parseInt(item[1].substr(1))
    }
  }
})


bounties.push({
  name: "Google",
  url: 'http://www.google.com/about/appsecurity/hall-of-fame/reward/',
  cb: function(r, id){

    var res;
    var reg  = /td>\s*<td class="name">\s*(.*?)\s*</g
    var html = /</;
    while ((res = reg.exec(r)) !== null){
      console.log(res[1])
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);

    }
  }
})

var requested = bounties.length;
var result = '';
for(id=0,l=bounties.length;id<l;id++){
  var callback = (function(cb,id) {
    return function(res) {
      var body = '';
      res.on('data', function(chunk) {
          body += chunk;
      });
      res.on('end', function() {
        cb(body,id);
        console.log(requested)
        done();
      });
    }
    })(bounties[id].cb,id)


  http.get(bounties[id].url, callback).on('error', function(e) {
    console.log("Got error: " + e.message);
  })


}



