//files:
const apiKey = ""; //API key declearation



var walmart = require('walmart')(apiKey);
var express = require("express");
var fs = require('fs')
//var sha256 = require('js-sha256');
const consoleLogFile = 'CL.json';
var consoleLog = JSON.parse(fs.readFileSync(consoleLogFile)); //parsing json object into useable JSON/arrays


var app = express();
var server = app.listen(process.env.PORT || 3000, listening);

//demo
// walmart.getItem(10449075).then(function(item) {
//   console.log(item.product.productAttributes.productName);
// });




function listening(request,response){

	console.log("Public");

}

app.use(express.static("public/"));
app.get('/CL/:name', (req,res)=>{



	var data = req.params;
	var name = data.name;
	try{
		var date = new Date();

		consoleLog[name] = date;

		var stringedFormat = JSON.stringify(consoleLog, null, 2);
		console.log(stringedFormat);
		fs.writeFileSync(consoleLogFile, stringedFormat, (err)=>{
			console.log(err);
		});
		res.send(stringedFormat);
	}
	catch(err){
		console.log(err);
		res.send("ERROR");
	}

});
app.get('/CL_check',(req,res) =>{

	res.send(JSON.stringify(consoleLog));


});



app.get('/Search/:Num/:Item', (request,response) =>{
	
	var data = request.params;
	var number = data.Num;
	var item = data.Item;

	// walmart.search("cheerios").then(function(data) {
	//   console.log("Found " + data.count + " items");
	// });





	response.send("Search Feature Not Open Yet!");


});

//files