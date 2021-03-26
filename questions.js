// Function to check if an input actually exists
const requireAnswer = (answer) => {
    if (!answer){
        console.log("Please make an input!");
        return false;
        // console.log("Required input not received. Aborting...");
        // process.exit(1);
    }
    return true;
}

const questions = [
    {
        type: "input",
        name: "project_name",
        message: "Please input the name of the project.",
        validate: requireAnswer,
    },
    {
        type: "input",
        name: "project_description",
        message: "Please input the description of the project. (After inputting the text in the external editor, please save the file and exit the editor to make the input.)",
        validate: requireAnswer
    },
    {
        type: "input",
        name: "project_installation",
        message: "Please input the installation instructions for your project.",
        validate: requireAnswer
    },
    {
        type: "input",
        name: "project_usage",
        message: "Please input how to use this project. (After inputting the text in the external editor, please save the file and exit the editor to make the input.)",
        validate: requireAnswer
    },
    {
        type: "input",
        name: "project_contribution",
        message: "Please input instructions on how to contribute to this project.",
        validate: requireAnswer
    },
    {
        type: "input",
        name: "project_test",
        message: "Please input any tests that can be run on the application.",
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
    },
    {
        type: "confirm",
        name: "project_index",
        message: "Include a table of contents?",
        default: "true"
    },
];

module.exports.questions = questions;
module.exports.requireAnswer = requireAnswer;