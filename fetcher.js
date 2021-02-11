// Import request library
const fs = require("fs");
const request = require("request");
// Accept CLI arguments
const argv = process.argv.slice(2, 4);

// Define urlToFetch
const urlToFetch = argv[0];

// Define destination
const destination = argv[1];

// Get the file from URL
request(urlToFetch, (error, response, body) => {
  fs.writeFile(destination, body, (err) => {
    if (err) throw err;
    fs.open(destination, (err, fd) => {
      if (err) throw err;
      fs.read(fd, (err, bytesREad) => {
        if (err) throw err;
        console.log(
          `Downloaded and saved ${bytesREad} bytes to ${destination}`
        );
      });
    });
  });
});

// Save it on local storage
