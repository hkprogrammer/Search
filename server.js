//files:
const apiKey = ""; //API key declearation
const consoleLogFile = 'CL.json';
const testingSample = 'testingSample.json';


var walmart = require('walmart')(apiKey);
var express = require("express");
var fs = require('fs')





var consoleLog = JSON.parse(fs.readFileSync(consoleLogFile)); //parsing json object into useable JSON/arrays
var testingData = JSON.parse(fs.readFileSync(testingSample)); //parsing json object into useable JSON/arrays


consoleLog[getTime()] = "Renew Connection";

function consoleLogFunc(a){
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
		

		let format = getTime();
		consoleLog[format] = name + " has connected to Search!'s back-end database";

		let SF = consoleLogFunc(true);
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

				var tempDBkeys = Object.keys(tempDB);
				var f = "";
				for(let i = 0; i < tempDBkeys.length; i++){
					let n = tempDBkeys[i];
					let v = tempDB[n];
					let vkeys = Object.keys(v);
					
					f += n + " - ";
					for(let ii = 0; ii < vkeys.length; ii++){
						let nn = vkeys[ii];
						let vv = v[nn];
						
						if(ii == vkeys.length - 1){
							f += nn + ": " + vv;
						}
						else{
							f += nn + ": " + vv + ", ";
						}
					}
					f += "<br>";

				}
				output = f;
				console.log(f);
				console.log(output);
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
		consoleLogFunc();
		output = "error";

	}
	response.send(output);






	//response.send("Search Feature Not Open Yet!");x


});

app.get('/sampleDB', (req,res)=>{


	res.send(JSON.stringify(testingData, null, 2));

});

//files