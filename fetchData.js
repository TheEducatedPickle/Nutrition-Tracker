var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var databasekey="10SKlZqWe3IkC3ymxUWxzMrjgUfNFuixcuqY10gC";
var a = 5;
var b = 10;
console.log(`Fifteen is ${a + b}.`);
var test=`https://api.nal.usda.gov/ndb/search/?format=json&q=butter&sort=n&max=25&offset=0&api_key=${databasekey}`;
var request=new XMLHttpRequest();
request.open('GET',test);
request.responseType = 'json';
console.log("in here 1");
request.onload=getResponse();

function getResponse(){
    var lol=request.response;
    console.log(lol);
}