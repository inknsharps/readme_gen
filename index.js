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
        validate: requireAnswer,
    },
    {
        type: "editor",
        name: "project_description",
        message: "Please input the description of the project. (After inputting the text in the external editor, please save the file and exit the editor to make the input.)",
        validate: requireAnswer
    },
    {
        type: "editor",
        name: "project_usage",
        message: "Please input how to use this project. (After inputting the text in the external editor, please save the file and exit the editor to make the input.)",
        validate: requireAnswer
    },
    {
        type: "list",
        name: "project_license",
        message: "Please select a project license. (MIT is selected by default.)",
        choices: [
            "MIT License",
            "GNU General Public License (GPL) 2.0",
            "Apache License 2.0",
            "GNU General Public License (GPL) 3.0",
            "BSD License 2.0 (3-clause, New or Revised)",
            "Choose Later"
        ]
    }
];

// Function to check if an input actually exists
function requireAnswer(answer){
    if (!answer){
        console.log("Please make an input!");
        return false;
        // console.log("Required input not received. Aborting...");
        // process.exit(1);
    }
    return true;
}

// Function to add markdown header tags
function addHeader(text, headerStyle){
    return `${headerStyle} ${text}`
}

// TODO: Create a function to write README file
function writeToFile(fileName, data){
    fs.writeFile(fileName, data, err => {
        if (err) throw err;
    });
}

// TODO: Create a function to initialize app
async function init(){
    let answers = await inquirer.prompt(questions);
    console.log(answers);

    // Object to store all the markdown we need to make the readme
    const markdownObject = {
        fileName: `${answers.project_name}-readme.md`,
        title: `${addHeader(answers.project_name, "#")}\r\r`,
        description: `${addHeader("Description", "##")}\r${answers.project_description}\r\r`,
        usage: `${addHeader("How to use", "##")}\r${answers.project_usage}\r\r`
    }
    console.log(markdownObject);

    // Finally, call writeToFile() function, which takes the markdown object's key-values and writes them to a new file.
    writeToFile(markdownObject.fileName, `${markdownObject.title}${markdownObject.description}${markdownObject.usage}`);
    console.log("File created!")
}

// Function call to initialize app
init();
