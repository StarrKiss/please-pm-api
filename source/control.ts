const low = require('lowdb')
const os = require('os');
const fs = require('file-system');
const dir = "allPackages.json";
const toml = require('toml');

let FileSync = require("lowdb/adapters/FileSync");

let adapter = new FileSync(dir);

let mainDB =  low(adapter);

class pleasePackage{
	AuthorName : string;
	packageName : string;
	deps : string[];
	packageDesc : string;

	constructor(author : string, packagenam : string, dependencies : string[], desc : string){
		this.AuthorName = author;
		this.packageName = packagenam;
		this.deps = dependencies;
		this.packageDesc = desc;
	}

}

async function generatePackage(pathToPackage : string){

	//let tempData : String;





	
	let tempData = toml.parse(fs.readFileSync(pathToPackage + 'please.toml', 'utf-8'));
	
	let tempPackage = new pleasePackage(tempData.author, tempData.packagename, tempData.deps, tempData.packagedesc);

	mainDB.get("packages")
   		 	.push({author : tempPackage.AuthorName, packagename : tempPackage.packageName, deps : tempPackage.deps, packagedesc : tempPackage.packageDesc})
   		 	.write();
   	let binaryPath = pathToPackage + tempPackage.packageName;

   fs.copyFile(binaryPath , 'packageBinaries/' + tempPackage.packageName, (err) => {
 	 if (err) throw err;
  		console.log('source.txt was copied to destination.txt');
	});

}

generatePackage('/home/hackerman/Documents/packageAPI/examplepackage/');