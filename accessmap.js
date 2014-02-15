var request = require('request');

function run(method, url, body, new_headers, expect){
  if(body instanceof Object){
    new_headers = body;
    body = '';
  }
  var headers = get_headers();


  for (var n in new_headers) { headers[n] = new_headers[n]; }
 
  var opts = {
    method:method,
    url:url,
    headers: headers,
    body: body
  }

  request(opts, function(error, response, body) {
    //response.statusCode
    console.log(method, url, ": ", response.statusCode, body)
  })
}




function get_headers(){return {
  "Cookie": "__insp_nv=true; __insp_ref=d; _gauges_unique_month=1; _gauges_unique_year=1; _gauges_unique=1; __insp_sid=2698276511; __insp_uid=3500516716; mp_02bf8cd669ed34d84ebee18c00bce3f0_mixpanel=%7B%22distinct_id%22%3A%20%22143ab904563320-0c026c7a8-6b1a2676-13c680-143ab90456427b%22%2C%22%24initial_referrer%22%3A%20%22%24direct%22%2C%22%24initial_referring_domain%22%3A%20%22%24direct%22%7D; __utma=42906421.491160775.1390149984.1391585338.1392374222.7; __utmc=42906421; __utmz=42906421.1390149984.1.1.utmcsr=blog.auth0.com|utmccn=(referral)|utmcmd=referral|utmcct=/2014/01/15/auth-with-socket-io/; __insp_wid=1146577500; __insp_pad=7; __zlcmid=MzdTROteObGO29; _gauges_unique_day=1; auth0l=s%3AZMxPbUqV4oHOCZ%2BpJ72T9H58.G0wpBSgpf7CYLF62F%2FAaWlZ%2BC6iJAY0G3pQRxL8U6fs; auth0idp=f44e4b55e96a51b11d7359bd276fa570e0dddcdc139237834882403cd5b243ef8a9760d23dfbe3611c64bb6241e2c191edbfd391cc1e917d36686b50f8dd0d4b5e58a9351f06167a6848446ff98f94fbf846fef35b543c050f0e612993fe088589c8e4f92723a3583a9027f92bc8cbc89b450a3db9fe6088ad11b7fdd074f0f29bdd8448f8ccc3467a66d011af25c866f05a9084e2ac5b7fbb69a3650260c3e29fc7e0846005896d537bfbb98bc3e543cab45ce0cc147668756c243e81851a88bc64db4674989d4e3fe0f26861bdd668bfd3e7e49639cb11273fc33001c31c6e85aaf153c15ae911bb67e52e4fa21a35670a4861323656f5d32c2c3f33444ab54ab78698e0f7aa562d104ab27c365a27f1b1db564346c5eb6ab5cbaa77955c661db1ee1a7a1509372a38e6b96355ca2a4c0733a478d6aa30a8c3a4e8880f071ac81e1a6f865ed8dfa4d36; _gauges_unique_hour=1; auth0=KSyoeqNhmdVa3oApIvdFjw.LxRjJz35yZrZm2uKu--2BPANXAwvUQj6twKq4pktPZA.1392380557633.86400000.j5IO8n9_DNblLubBA9H0Hz3WqEP23SKx2fHCQ6GYfWc; XSRF-TOKEN=n5z9tuR00E%2FuKsjqgBl%2BR5UV",
  "Origin": "https://app.auth0.com",
  "Accept-Encoding": "gzip,deflate,sdch",
  "Host": "app.auth0.com",
  "Accept-Language": "en-US,en;q=0.8",
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.107 Safari/537.36",
  "Content-Type": "application/json",
  "Accept": "application/json, text/javascript, */*; q=0.01",
  "Referer": "https://app.auth0.com/",
  "X-Requested-With": "XMLHttpRequest",
  "Connection": "keep-alive",
  "Content-Length": "74",
  "X-CSRFToken": "n5z9tuR00E/uKsjqgBl+R5UV"
}}

run('POST','https://app.auth0.com/api/authorizations/invitations/umS8iQKUBIZQqVZscAo5MO9XpOHyDmu1','{"email":"h.omakov@gmail.com","client":"umS8iQKUBIZQqVZscAo5MO9XpOHyDmu1"}');
run('GET','https://www.google.com');
run('POST','https://api.intercom.io/vjs/users/ping','version=20140213-dd9d282&referer=https%3A%2F%2Fapp.auth0.com%2F%23%2Faccount&inbox_installed=true&utf8=✓&app_id=5543b80da436916e2d7fb2a94b5cd014b92f6b86&user_data=%7B%22email%22%3A%22homakov%40gmail.com%22%2C%22user_id%22%3A%22auth0%7C52fdf21760dcf55237000080%22%2C%22user_hash%22%3A%22f5ee191d5ae9ccbf57223121bd02ea865da3640f2507b60cadbcee839a4bc7d9%22%7D&periodic=true');
