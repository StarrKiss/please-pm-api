const low = require('lowdb')
const os = require('os');
const fs = require('file-system');

const dir = "allPackages.json";

fs.writeFile(dir, "", e => {
	if(e){
		throw e;
	} 
	else{
		console.log("Success")
	}

});

let FileSync = require("lowdb/adapters/FileSync");

let adapter = new FileSync(dir);

let mainDB =  low(adapter);

mainDB.defaults({packages : [], count: 0})
	.write();
