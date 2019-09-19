const low = require('lowdb')
const os = require('os');
const fs = require('file-system');
const dir = "allPackages.json";
const toml = require('toml');

let FileSync = require("lowdb/adapters/FileSync");

let adapter = new FileSync(dir);

let mainDB =  low(adapter);

class pleasePackage{
	AuthorName : String;
	packageName : String;
	deps : String[];
	packageDesc : String;

	constructor(author : String, packagenam : String, dependencies : String[], desc : String){
		this.AuthorName = author;
		this.packageName = packagenam;
		this.deps = dependencies;
		this.packageDesc = desc;
	}

}

async function generatePackage(pathToPackage : String){

	//let tempData : String;





	
	let tempData = toml.parse(fs.readFileSync(pathToPackage + 'please.toml', 'utf-8'));
	
	let tempPackage = new pleasePackage(tempData.author, tempData.packagename, tempData.deps, tempData.packagedesc);

	mainDB.get("packages")
   		 	.push({author : tempPackage.AuthorName, packagename : tempPackage.packageName, deps : tempPackage.deps, packagedesc : tempPackage.packageDesc})
   		 	.write();

	//let finalData = toml.parse(tempData);

	//let tempPackage = new pleasePackage(finalData.author, finalData.packagename, finalData.deps, finalData.packagedesc);

	//console.log(tempPackage.AuthorName)

}

generatePackage("/home/hackerman/Documents/packageAPI/source/");