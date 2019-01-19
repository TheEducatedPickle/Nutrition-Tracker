//var XMLHttpRequest = require('xhr2');
var request = new XMLHttpRequest();
var autocomplete = []

//Config
var databasekey = "10SKlZqWe3IkC3ymxUWxzMrjgUfNFuixcuqY10gC";
var dbnum = `01009`;
var ntCategories = '&nutrients=205&nutrients=204&nutrients=208&nutrients=269';

function searchItem(searchTerm = "soylent") {
  //var query = `https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=${databasekey}${ntCategories}&ndbno=${dbnum}`;
  var query = `https://api.nal.usda.gov/ndb/search/?format=json&q=${searchTerm}&sort=r&max=25&offset=0&api_key=${databasekey}`;
  request.open('GET', query, true);
  request.onload = function () {
    console.log(searchTerm)
    var json = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      console.log(formatTitle(json.list.item[0].name));
      console.log(json.list.item.map(e => formatTitle(e.name)));
    } else {
      console.log('Request timeout');
    }
  }

  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      return request.responseText;
    }
  }
  request.send();
  return request.onreadystatechange();
}

function getSuggestions(searchTerm = "chicken") {
  let suggestions = searchItem(searchTerm);
  console.log(suggestions);
}

function listItems() {
  var query = `https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=${databasekey}${ntCategories}&ndbno=${dbnum}`;
  //var query = `https://api.nal.usda.gov/ndb/search/?format=json&q=butter&sort=n&max=25&offset=0&api_key=${databasekey}`;
  request.open('GET', query, true);
  request.onload = function () {
    var json = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      console.log(json.report.foods[0].nutrients[0].value);
    } else {
      console.log('Request timeout');
    }
  }
  request.send();
}

function formatTitle(text) {  //Removes UPC and formats capitalization
  text = text.split(',')[0] //Remove UPC
  return text.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
}