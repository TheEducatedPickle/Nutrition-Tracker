var XMLHttpRequest = require('xhr2');
var databasekey="10SKlZqWe3IkC3ymxUWxzMrjgUfNFuixcuqY10gC";
var a = 5;
var b = 10;
console.log(`Fifteen is ${a + b}.`);
var test=` https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=${databasekey}&nutrients=205&nutrients=204&nutrients=208&nutrients=269&ndbno=01009`;
var request=new XMLHttpRequest();

request.open('GET',test,true);

request.onload=function(){
    var response = this.response;
    var json = JSON.parse(response);

    if (request.status >= 200 && request.status < 400) {
        console.log(json.report.foods[0].nutrients[0].value)
      } else {
        console.log('error');
      }

}

request.send()

