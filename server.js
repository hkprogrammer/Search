//files:
const apiKey = ""; //API key declearation
const consoleLogFile = 'CL.json';
const testingSample = 'Database.json';
const tempSearchFile = 'tempSearch.json';

var walmart = require('walmart')(apiKey);
var express = require("express");
var fs = require('fs')





var consoleLog = JSON.parse(fs.readFileSync(consoleLogFile)); //parsing json object into useable JSON/arrays
var testingData = JSON.parse(fs.readFileSync(testingSample)); //parsing json object into useable JSON/arrays
var tempSearch = JSON.parse(fs.readFileSync(tempSearchFile));;

consoleLog[getTime()] = "Started Server";

function consoleLogFunc(b, c = "",a = false){
	consoleLog[getTime()] = "Requested " + b + "; Returned " + c;
	let stringedFormat = JSON.stringify(consoleLog, null, 2);
	console.log(stringedFormat);
	fs.writeFileSync(consoleLogFile, stringedFormat, (err)=>{
		console.log(err);
	});
	if(a == true){
		return stringedFormat;
	}
	else{
		return
	}
}


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
		

		// let format = getTime();
		// consoleLog[format] = name + " has connected to Search!'s back-end database";

		let SF = consoleLogFunc( "Connection", name, true);
		res.send(SF);
	}
	catch(err){
		console.log(err);
		res.send("ERROR");
	}

});
app.get('/CL_check',(req,res) =>{

	res.send(JSON.stringify(consoleLog));


});

function getTime(){
	var date = new Date();
	var year = String(date.getFullYear());
	var month = String(date.getMonth() + 1);
	var day = String(date.getDate());
	var hour = String(date.getHours());
	var minute = String(date.getMinutes());
	var second = String(date.getSeconds());

	let format = year + "-" + month + "-" + day + '_' + hour + ":" + minute + ":" + second;
	return format;
}


app.get('/Search/:Num/:Item', (request,response) =>{
	
	var data = request.params;
	var number = data.Num;
	var item = data.Item;
	// walmart.search("cheerios").then(function(data) {
	//   console.log("Found " + data.count + " items");
	// });
	var parsedNumber;
	var msg = {
		"msg" : "Number not avaliable or invalid",
		"SelectedNumber" : 0
	};
	var output = "";

	


	try{
		parsedNumber = parseInt(number);
		console.log(parsedNumber);
		if(isNaN(parsedNumber)) {
			consoleLog[getTime()] = "Invalid search number";
			

		}
		var selection = "";
		msg.msg = "Number Valid, Selected: " + selection;
		msg.SelectedNumber = parsedNumber;
		//consoleLog[getTime()] = JSON.parse(msg);

		switch(parsedNumber){

			case 0:
				selection = "Testing";
 				var Items = "Items";
				var tempDB = testingData[Items];

				// var tempDBkeys = Object.keys(tempDB);
				// var f = "";
				// for(let i = 0; i < tempDBkeys.length; i++){
				// 	let n = tempDBkeys[i];
				// 	let v = tempDB[n];
				// 	let vkeys = Object.keys(v);
					
				// 	f += n + " - ";
				// 	for(let ii = 0; ii < vkeys.length; ii++){
				// 		let nn = vkeys[ii];
				// 		let vv = v[nn];
						
				// 		if(ii == vkeys.length - 1){
				// 			f += nn + ": " + vv;
				// 		}
				// 		else{
				// 			f += nn + ": " + vv + ", ";
				// 		}
				// 	}
				// 	f += "<br>";

				// }
				// output = f;
					
				var okeysTempDB = Object.keys(tempDB);
				var stringedItem = String(item);
				var resultNames = [];
				var flag = false;
				//selecting the whole thing
				for(var i = 0; i<okeysTempDB.length; i++){

					//selecting each names
					for(var q = 0; q<okeysTempDB[i].length; q++){
						var sliced = okeysTempDB[i].split(" ");

						//selecting each words
						for(var z = 0; z < sliced.length; z++){
							if(sliced[z] == item){
								resultNames.push(okeysTempDB[i]);
								flag = true;
								break
							}
						}
						if(flag == true){
							flag = false;
							break
						}
					}
				}

				//output = resultNames;
				
				var finalJSON = {

				};

				for(let i = 0; i < resultNames.length; i++){
					let name = resultNames[i];
					let price = tempDB[name]["Price"];
					let thumb = tempDB[name]["Thumbnail"];
					finalJSON[name] = {
						"Price" : price,
						"Thumbnail" : thumb
					};
				
				}

				

				let stringedFormat = JSON.stringify(finalJSON, null, 2);
				console.log(stringedFormat);
				fs.writeFileSync(tempSearchFile, stringedFormat, (err)=>{
					console.log(err);
				});
				output = "Success";
				r = resultNames;
				consoleLogFunc("Search " + item, r);

				// console.log(f);
				// console.log(output);
				break
			case 1:
				selection = "Walmart";
				break
			default:
				selection = "Testing";
				break

		}
	}
	catch(e){
		console.log(e);
		consoleLog[getTime()] = "INVALID NUMBER ERROR:" + e; 
		consoleLogFunc( "INVALID NUMBER", e, false);
		output = "error";

	}
	tempSearch = JSON.parse(fs.readFileSync(tempSearchFile))
	response.send(output);






	//response.send("Search Feature Not Open Yet!");x


});

//titles
app.get('/titleNum',(req,res)=>{

	tempSearch = JSON.parse(fs.readFileSync(tempSearchFile))
	let namelit = Object.keys(tempSearch);
	//consoleLog[getTime()] = "Requested TitleNumber" + "; Returned " + namelit.length;
	consoleLogFunc(false, "Title Number", namelit.length);
	res.send(String(namelit.length));
});

app.get('/titleNum/:Num', (req,res)=>{
	tempSearch = JSON.parse(fs.readFileSync(tempSearchFile))
	let data = req.params;
	let num = parseInt(data.Num) - 1; //make sure the data is in Int format

	let namelit = Object.keys(tempSearch);
	let tValue = namelit[num];
	consoleLogFunc(false, "Title",tValue);
	res.send(tValue);


});

//prices
app.get('/priceNum/:Num?', (req,res)=>{
	let data = req.params;
	let num = parseInt(data.Num) - 1; //make sure the data is in Int format
	let tPrice = getPrice(num)
	res.send(tPrice);


});
function getPrice(a){
	tempSearch = JSON.parse(fs.readFileSync(tempSearchFile))
	

	let pricelit = Object.keys(tempSearch);
	let tValue = pricelit[a];
	let tPrice = tempSearch[tValue].Price;
	consoleLogFunc(false, "Price", tPrice);
	return tPrice
}

//thumbnails
app.get('/thumbnails/:Num?', (req,res)=>{
	let data = req.params;
	let num = parseInt(data.Num) - 1; //make sure the data is in Int format
	let tThumb = getThumb(num)
	res.send(tThumb);


});
function getThumb(a){
	tempSearch = JSON.parse(fs.readFileSync(tempSearchFile))
	let thumblit = Object.keys(tempSearch);
	let tValue = thumblit[a];
	let tThumb = tempSearch[tValue].Thumbnail;
	consoleLogFunc(false, "Thumbnails", tThumb);
	return tThumb
}


app.get('/sampleDB', (req,res)=>{


	res.send(JSON.stringify(testingData, null, 2));

});

//files