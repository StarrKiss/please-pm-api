var low = require('lowdb');
var os = require('os');
var fs = require('file-system');
var dir = "allPackages.json";
fs.writeFile(dir, "", function (e) {
    if (e) {
        throw e;
    }
    else {
        console.log("Success");
    }
});
var FileSync = require("lowdb/adapters/FileSync");
var adapter = new FileSync(dir);
var mainDB = low(adapter);
mainDB.defaults({ packages: [], count: 0 })
    .write();
