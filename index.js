// TODO: Include packages needed for this application
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const questions = require("./questions.js");

// Function to add markdown header tags
function addHeader(text, headerStyle){
    return `${headerStyle} ${text}`
}

// TODO: Create a function to write README file
function writeToFile(fileName, data){
    fs.appendFile(fileName, data, err => {
        if (err) throw err;
    });
}

// TODO: Create a function to initialize app
async function init(){
    let answers = await inquirer.prompt(questions.questions);
    console.log(answers);

    // Object to store all the markdown we need to make the readme
    const markdownObject = {
        fileName: `${answers.project_name}-readme.md`,
        title: `${addHeader(answers.project_name, "#")}\r\r`,
        description: `${addHeader("Description", "##")}\r${answers.project_description}\r\r`,
        installation: `${addHeader("Installation", "##")}\r${answers.project_installation}\r\r`,
        usage: `${addHeader("How to use", "##")}\r${answers.project_usage}\r\r`,
        contribution: `${addHeader("How to Contribute", "##")}\r${answers.project_contribution}\r\r`,
        tests: `${addHeader("Tests", "##")}\r${answers.project_test}\r\r`,
    }
    console.log(markdownObject);

    // Make array of the values
    let markdownObjectValues = Object.values(markdownObject);

    // Iterate through the array, using writeToFile() to make the readme, starting at index 1 since we don't need to use the file name to build the readme
    for (let i = 1; i < markdownObjectValues.length; i++){
        writeToFile(markdownObject.fileName, markdownObjectValues[i]);
    }
    console.log("File created!");
}

// Function call to initialize app
init();
