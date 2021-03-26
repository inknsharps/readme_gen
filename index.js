// TODO: Include packages needed for this application
const fs = require("fs");
const inquirer = require("inquirer");
const questions = require("./utils/questions.js");
const license = require("./utils/license.js");

// Function to add markdown header tags
function addHeader(text, headerStyle){
    return `${headerStyle} ${text}`
}

// Function to write to the file using appendFileSync() (since the appendFile() method works asynchronously causes issue writing sections out of order)
function writeToFile(fileName, data){
    fs.appendFileSync(fileName, data, err => {
        if (err) throw err;
    });
}

// TODO: Create a function to initialize app
async function init(){
    // Use inquirer to prompt user for inputs
    let answers = await inquirer.prompt(questions.questions);

    // Create license section elements
    let selectedLicense = await answers.project_license;
    let licenseSection = license.renderLicenseSection(selectedLicense);
    let licenseBadge = license.renderLicenseBadge(selectedLicense);

    // Object to store all the markdown we need to make the readme
    const markdownObject = {
        fileName: `${answers.project_name}-readme.md`,
        title: `${addHeader(answers.project_name, "#")}\r\r`,
        description: `${addHeader("Description", "##")}\r${licenseBadge}\r\r${answers.project_description}\r\r`,
        installation: `${addHeader("Installation", "##")}\r${answers.project_installation}\r\r`,
        usage: `${addHeader("How to use", "##")}\r${answers.project_usage}\r\r`,
        contribution: `${addHeader("How to Contribute", "##")}\r${answers.project_contribution}\r\r`,
        tests: `${addHeader("Tests", "##")}\r${answers.project_test}\r\r`,
        license: `${addHeader("License", "##")}\r${licenseSection}\r\r`,
        // TODO - Fix the questions/contact section
        author: `${addHeader("Questions", "##")}\r${answers.project_author}, ${answers.project_email}\r\r`
    }

    // TODO - Make the index appear near the top of the readme, rather than the bottom
    if (answers.project_index === true){
        markdownObject.index = `Include a index.`
    }

    // Make array of the values of the markdown we just made
    let markdownObjectValues = Object.values(markdownObject);

    // Iterate through the markdown array, using writeToFile() to make the readme, starting at index 1 since we don't need to use the file name to build the readme
    for (let i = 1; i < markdownObjectValues.length; i++){
        writeToFile(markdownObject.fileName, markdownObjectValues[i]);
    }
    console.log("File created!");
}

// Function call to initialize app
init();