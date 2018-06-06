const fs = require("fs");

//write out data
function done(output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
}

//where we will store our commands
function evaluateCmd(userInput) {
 //parses the user input to understand which command was typed
  const userInputArray = userInput.split(" ");
  const command = userInputArray[0];
  // handles the user's input
  switch (command) {
    case "echo":
     //we will add the functionality of echo next within the object commandLibrary
      commandLibrary.echo(userInputArray.slice(1).join(" "));
      break;
    case "cat":
      commandLibrary.cat(userInputArray.slice(1));
      break;
    case "head":
      commandLibrary.head(userInputArray.slice(1));
      break;
  }
}

//where we will store the logic of our commands
const commandLibrary = {
  //the echo command
   "echo": function(userInput) {
       done(userInput);
   },
   "cat": function(fullPath) {
        let fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            done(data);
        });
    },
    "head": function(fullPath) {

      let fileName = fullPath[0];
      const lineReader = require('readline').createInterface({
        input: fs.createReadStream(fileName),
      });

      let lineCounter = 0;

      lineReader.on('line', function (line) {
        lineCounter++;
        if (lineCounter < 6) {
          process.stdout.write(`${lineCounter} ${line}\n`);
        } else if (lineCounter === 6) {
          process.stdout.write(`\nprompt > `);
          lineReader.close();
        }
      });

    }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
