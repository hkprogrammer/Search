//files:
const apiKey = ""; //API key declearation



var walmart = require('walmart')(apiKey);
var express = require("express");
//var fs = require('fs')
//var sha256 = require('js-sha256');
var app = express();
var server = app.listen(process.env.PORT || 3000, listening);

//demo
walmart.getItem(10449075).then(function(item) {
  console.log(item.product.productAttributes.productName);
});




function listening(request,response){

	console.log("Public");

}

app.use(express.static("public/"));

app.get('/Search/:Num/:Item', (request,response) =>{
	
	var data = request.params;
	var number = data.Num;
	var item = data.Item;

	walmart.search("cheerios").then(function(data) {
	  console.log("Found " + data.count + " items");
	});



});

//files