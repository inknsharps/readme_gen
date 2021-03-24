// TODO: Include packages needed for this application
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");

// TODO: Create an array of questions for user input
const questions = [
    {
        type: "input",
        name: "project_name",
        message: "Please input the name of the project.",
        validate: requireAnswer
    },
    {
        type: "editor",
        name: "project_description",
        message: "Please input the description of the project.",
        validate: requireAnswer
    }
];

// Function to check if an input has been made
function requireAnswer(answer){
    if (!answer){
        console.log("Required input not received. Aborting...");
        process.exit(1);
    }
    return true;
}

// TODO: Create a function to write README file
function writeToFile(fileName, data){
}

// TODO: Create a function to initialize app
async function init(){
    let answers = await inquirer.prompt(questions);
    console.log(answers)
}

// Function call to initialize app
init();
