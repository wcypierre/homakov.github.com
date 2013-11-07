var http = require('http');
var https = require('https');

var fs = require('fs');

var hustlers = [];
var bounties = [];

/*
Actually I am not a programmer so don't tell me how shitty this code is. peace
Online: http://www.sakurity.com/hustlers
*/

done = function(){
  if(--requested == 0){
    hustlers.sort(function(a,b){
      return b.bounties.length-a.bounties.length
    });

    for(var i=0,l=hustlers.length;i<l;i++){
    	details = [];
    	for(var key in hustlers[i].details){
        details.push(key+(hustlers[i].details[key]>1 ? " ("+hustlers[i].details[key]+")" : ''));
    	}
      
      result += ("<tr><td>"+(i+1)+"</td><td width=50%>" + hustlers[i].handles[0] + "</td><td width=10%>$" + hustlers[i].reward + "</td><td>" + details.join(', ') + "</td></tr>")
    }

    result = 'Bounty Hustlers:<br><table border=1><tr><td>#</td><td width=50%>Handle</td><td width=10%>Cash Reward</td><td>Bounties</td></tr>' + result + '</table>';
    fs.writeFile("../high-lightning-427/hustlers.html", result, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    });
  }
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
  //normalize twitter handle
  tw = /(?:[^a-zA-Z])(@[A-Za-z0-9_]{1,15})/.exec(name)
  if(tw){
    name = tw[1];
  }else{
    name = name.replace(/<.*?>/g,'');
    name = name.split(/\s?\(?(of|from)/)[0]    
  }
  name = name.trim();

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
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);

    }
  }
})


bounties.push({
  name: "Adobe",
  url: 'http://www.adobe.com/support/security/bulletins/securityacknowledgments.html',
  cb: function(r, id){

    var res;
    var reg  = /<li>(.*?)<\/li>/g;
    // extract the list
    r=r.split('Security Bulletin')[1].split('</ul>')[0];
    while ((res = reg.exec(r)) !== null){
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);
    }
  }
})


bounties.push({
  name: "AT&T",
  url: 'http://developer.att.com/developer/apiDetailPage.jsp?passedItemId=13400790',
  cb: function(r, id){


    var res;
    var reg  = />(.*?)<\/td>\s*<td class="last/g
    var html = /</;
    while ((res = reg.exec(r)) !== null){
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);

    }
  }
})



bounties.push({
  name: "Barracuda",
  url: 'http://barracudalabs.com/research-resources/bug-bounty-program/bug-bounty-hall-of-fame/',
  cb: function(r, id){


    var res;
    var reg  = /<td>(.*?)<\/td>\s*<\/tr/g
    while ((res = reg.exec(r)) !== null){
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);

    }
  }
})



bounties.push({
  name: "Coinbase",
  url: 'http://coinbase.com/whitehat',
  cb: function(r, id){
    var res;
    r=r.split('h5>Awards')[1];
    var reg  = /<li>(.*?)<\/li>/g;
    while ((res = reg.exec(r)) !== null){
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);
    }
  }
})


bounties.push({
  name: "Dropbox",
  url: 'https://www.dropbox.com/special_thanks',
  cb: function(r, id){
    var res;
    r=r.split('thanks-go-to')[1];
    var reg  = /<li>(.*?)<\/li>/g;
    while ((res = reg.exec(r)) !== null){
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);
    }
  }
})


bounties.push({
  name: "Gitlab",
  url: 'http://www.gitlab.com/vulnerability-acknowledgements/',
  cb: function(r, id){
    var res;
    r=r.split('<ul')[2];
    var reg  = /<li>(.*?)<\/li>/g;
    while ((res = reg.exec(r)) !== null){
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);
    }
  }
})


bounties.push({
  name: "Github",
  url: 'https://help.github.com/articles/responsible-disclosure-of-security-vulnerabilities',
  cb: function(r, id){
    var res;
    r=r.split('<ul')[3];
    var reg  = /<li>(.*?)<\/li>/g;
    while ((res = reg.exec(r)) !== null){
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);
    }
  }
})


bounties.push({
  name: "Yahoo",
  url: 'http://bugbounty.yahoo.com/security_wall.html',
  cb: function(r, id){
    var res;
    r=r.split('wall-list')[1];
    var reg  = /<li>(.*?)<\/li>/g;
    while ((res = reg.exec(r)) !== null){
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);
    }
  }
})

bounties.push({
  name: "Zynga",
  url: 'http://company.zynga.com/security/whitehats',
  cb: function(r, id){
    var res;
    r=r.split('>Thanks!')[1];
    var reg  = /<li>(.*?)<\/li>/g;
    while ((res = reg.exec(r)) !== null){
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);
    }
  }
})

bounties.push({
  name: "Yandex",
  url: 'http://company.yandex.com/security/hall-of-fame.xml',
  cb: function(r, id){
    var res;
    var reg  = /<tr><td class="b-research__t-td">\s*<p>\s*(.*?)<\/p>/g;
    while ((res = reg.exec(r)) !== null){
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);
    }
  }
})

bounties.push({
  name: "Zendesk",
  url: 'http://www.zendesk.com/company/responsible-disclosure-policy',
  cb: function(r, id){
    var res;
    var reg  = /<br\/>\s*(.{1,400})\s*<br\/>/g;
    while ((res = reg.exec(r)) !== null){
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);
    }
  }
})





bounties.push({
  name: "Nokia",
  url: 'http://www.nokia.com/global/security/acknowledgements/',
  cb: function(r, id){
    var res;
    var reg  = />(.*?)<\/td><td/g;
    while ((res = reg.exec(r)) !== null){
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);
    }
  }
})


bounties.push({
  name: "Microsoft",
  url: 'http://technet.microsoft.com/en-us/security/cc308575',
  cb: function(r, id){
    var res;
    var reg  = /<strong>(.*?)<\/strong>/g;
    while ((res = reg.exec(r)) !== null){
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);
    }
  }
})

bounties.push({
  name: "Soundcloud",
  url: 'http://help.soundcloud.com/customer/portal/articles/439715-responsible-disclosure',
  cb: function(r, id){
    var res;
    var reg  = /-(.*?)<br/g;
    while ((res = reg.exec(r)) !== null){
      h = lookup_hustler(res[1]);
      upgrade_hustler(h,id);
    }
  }
})




var https = require('https');

var options = {
  hostname: 'encrypted.google.com',
  port: 443,
  path: '/',
  method: 'GET'
};

var req = https.request(options, function(res) {
  console.log("statusCode: ", res.statusCode);
  console.log("headers: ", res.headers);

  res.on('data', function(d) {
    process.stdout.write(d);
  });
});
req.end();

req.on('error', function(e) {
  console.error(e);
});


//https://www.shopify.com/security-response
//https://www.facebook.com/whitehat/thanks/
//https://www.heroku.com/policy/security-hall-of-fame
//https://www.paypal.com/webapps/mpp/security-tools/wall-of-fame-honorable-mention
//https://access.redhat.com/site/articles/66234

//https://about.twitter.com/company/security
/*
>@0xde1</a></span>
                      </div>

  </div> */

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
      res.on('error', function(e) {
        console.log("Got error: " + e.message);
      })
    }
    })(bounties[id].cb,id)

  transport = bounties[id].url[4] == 's' ? https : http;
  transport.get(bounties[id].url, callback)
}



