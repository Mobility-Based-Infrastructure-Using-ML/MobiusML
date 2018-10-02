const fs = require('fs');
 
 
 /**
   * Save a file to local system
   * @param weightArray
   * 
*/

function saveFile(weightArray) {
    fs.writeFileSync("weights.txt", weightArray, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}









 
