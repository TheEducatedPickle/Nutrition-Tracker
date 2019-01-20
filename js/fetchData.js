//Map values to html elements
var docMap = {}
docMap["Energy"] = "#energy";
docMap["Sugars, total"] = "#sugars";
docMap["Total lipid (fat)"] = "#lipids";
docMap["Carbohydrate, by difference"] = "#carbs"

//Config
var databasekey = "10SKlZqWe3IkC3ymxUWxzMrjgUfNFuixcuqY10gC";
var dbnum = `01009`;
var ntCategories = '&nutrients=205&nutrients=204&nutrients=208&nutrients=269';

function searchItem(searchTerm) {
  //var query = `https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=${databasekey}${ntCategories}&ndbno=${dbnum}`;
  var searchQuery = `https://api.nal.usda.gov/ndb/search/?format=json&q=${searchTerm}&sort=r&max=5&offset=0&api_key=${databasekey}`;
  $.get(searchQuery, function(data){
    //autocomplete(document.getElementById("searchField"), data.list.item);
    let selectIndex = 0;
    let selectedItem = data.list.item[selectIndex];
    console.log("Database entry: " + selectedItem.name);
    var nutritionQuery = `https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=${databasekey}${ntCategories}&ndbno=${selectedItem.ndbno}`;
    $.get(nutritionQuery, function(data) {
      data.report.foods[0].nutrients.forEach((e) => {
        console.log(docMap[e.nutrient] + ": " + e.value);
        $(docMap[e.nutrient]).html(e.value);
      })
    })
  })
}
