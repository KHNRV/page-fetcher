// Import request library
const fs = require("fs");
const request = require("request");
const readline = require("readline");

// Allow interaction from user with fetcher
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Accept CLI arguments
const argv = process.argv.slice(2, 4);

// Define urlToFetch
const urlToFetch = argv[0];

// Define destination
const destination = argv[1];

// Function to write a file and confirm
const saveToLocal = (destination, data) => {
  // Write the file
  fs.writeFile(destination, data, (err) => {
    if (err) throw err;
    fs.stat(destination, (err, stats) => {
      if (err) throw err;
      const size = stats.size;
      console.log(`Downloaded and saved ${size} bytes to ${destination}`);
    });
  });
};

// Get the file from URL
request(urlToFetch, (error, response, body) => {
  if (parseInt(response.statusCode) !== 200) {
    console.log("The URL is not valid or the page does not exist.");
    process.exit(1);
  }
  fs.open(destination, (err) => {
    if (!err) {
      rl.question(
        "File already exist. Do you want to overwrite it? (y/n)",
        (answer) => {
          if (answer === "y") {
            saveToLocal(destination, body);
          } else if (answer === "n") {
            process.exit(1);
          }

          rl.close();
        }
      );
    } else {
      saveToLocal(destination, body);
    }
  });
});
