// TODO: Include packages needed for this application
const fs = require("fs");
const path = require("path");

// TODO: Create an array of questions for user input
const questions = [];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) throw err;
        console.log('The file has been saved!')
    });
}

// TODO: Create a function to initialize app
function init() {
    writeToFile("newreadme.md", "test");
}

// Function call to initialize app
init();
