var file = {
	"Items" : {

	}
}

var name = "";
var price = "";
var thumb = "";


function add(){
	name = document.getElementById("itemname").value;
	price = document.getElementById("itemprice").value;
	thumb = document.getElementById("itemthumb").value;


	//error handler
	try{
		//blank handler
		if(name == "" || price == "" || thumb == ""){
		

		}
		else{

			file["Items"][name] = {
				"Price" : price,
				"Thumbnail" : thumb
			};

			console.log(file);

			document.getElementById("itemname").value = "";
			document.getElementById("itemprice").value = "";
			document.getElementById("itemthumb").value = "";;
		}





	}
	catch(e){
		console.log(e);
	}


}
function submit(){

	document.getElementById("output").innerHTML = JSON.stringify(file);

}
function reset(){
	file = {
	"Items" : {

	}
}
}