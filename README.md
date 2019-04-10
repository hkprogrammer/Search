##Server.js Documentation


***Microservices***
`/CL/:name`
**Name** is the computer's name in order to save into the CL.json log file.
Time table will also being added with standard UTC time
ex:
	"Mac": "2019-04-03T08:26:02.572Z"  


`/CL_check`
This checks the entire log file and sends back the entire log file.


`/Search/:Num/:Item`
**Num** is where the user can define which api they will search in, currently avaliable are:
0: Testing purposes
*1: Walmart
2: Walgreens
3: longs
4: Costco
5: 7-11
6: Ross
7: Target
8: Amazon
9: Safeway*

**Item** is the term where the user will be searching for, it will be processed in the nodejs program and returns in a structure as following:
`{
	"Items" : {
		"Pen" : {
			"Price" : 3.99,
			"Rating": 1-5
		},
		"Pencil" : {
			"Price" : 0.99,
			"Rating": 1-5
		}
	},
	//Example version
	"Items" : {
		"Item Name" : {
			"Property 1" : Int/String/Boolean,
			"Property 2" : Int/String Boolean
		}
		...
	}
}`
