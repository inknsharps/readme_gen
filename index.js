// Declare variable for modules/packages needed
const fs = require("fs");
const inquirer = require("inquirer");
const ask = require("./utils/questions.js");
const license = require("./utils/license.js");

// Function to add markdown header tags
function addHeader(text, headerStyle){
    return `${headerStyle} ${text}`;
}

// Function to make table of content links
function renderLink(link){
    let description = link.charAt(0).toUpperCase() + link.slice(1);
    return `[${description}](#${link})`;
}

// Function to write to the file using appendFileSync() (since the appendFile() method works asynchronously causes issue writing sections out of order)
function writeToFile(fileName, data){
    fs.appendFileSync(fileName, data, err => {
        if (err) throw err;
    });
}

// TODO: Create a function to initialize app
async function init(){
    // Use inquirer to prompt user for inputs, and store them to answers
    let answers = await inquirer.prompt(ask.questions);

    // Create license section elements
    let selectedLicense = await answers.project_license;
    let licenseSection = license.renderLicenseSection(selectedLicense);
    let licenseBadge = license.renderLicenseBadge(selectedLicense);

    // Object to store all the markdown we need to make the readme
    const markdownObject = {
        fileName: `${answers.project_name.replace(/\s+/g,"")}-readme.md`,
        title: `${addHeader(answers.project_name, "#")}\r\r`,
        description: `${addHeader("Description", "##")}\r${licenseBadge}\r\r${answers.project_description}\r\r`,
        installation: `${addHeader("Installation", "##")}\r${answers.project_installation}\r\r`,
        usage: `${addHeader("Usage", "##")}\r${answers.project_usage}\r\r`,
        contribution: `${addHeader("Contribution", "##")}\r${answers.project_contribution}\r\r`,
        tests: `${addHeader("Tests", "##")}\r${answers.project_test}\r\r`,
        license: `${addHeader("License", "##")}\r${licenseSection}\r\r`,
        // TODO - Fix the questions/contact section
        contact: `${addHeader("Contact", "##")}\rYou can contact me either through\r[my GitHub profile](https://github.com/${answers.project_author}), or send an email to: ${answers.project_email}.\r\r`
    }

    // Make array of the keys of the markdown object we made
    let markdownObjectKeys = Object.keys(markdownObject);

    // Make array of the values of the markdown we just made
    let markdownObjectValues = Object.values(markdownObject);

    // If the user has selected true for making a table of contents
    if (answers.project_index === true){
        console.log("Making table of contents...");

        // Splice the table of contents markdown element into the values array
        markdownObjectValues.splice(2, 0, `${addHeader("Table of Contents", "##")}\r\r`)

        // For loop that splices the table of content link into the markdownObjectValues array (NOTE: splice() places the new element BEFORE the index that is designated, so to make sure the elements are added in order, i + 1 needs to be used.)
        for (let i = 2; i < markdownObjectKeys.length; i++){
            let contentLink = renderLink(markdownObjectKeys[i])
            markdownObjectValues.splice(i + 1, 0, `${contentLink}\r\r`);
        }
    }

    // Iterate through the markdown array, using writeToFile() to make the readme, starting at index 1 since we don't need to use the file name to build the readme
    for (let i = 1; i < markdownObjectValues.length; i++){
        writeToFile(markdownObject.fileName, markdownObjectValues[i]);
    }
    console.log("File created!");
}

// Function call to initialize app
init();