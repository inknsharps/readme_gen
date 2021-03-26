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
        message: "Please input the description of the project.",
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
        message: "Please input how to use this project.",
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
            "Apache License 2.0",
            "GNU General Public License (GPL) 3.0",
            "ISC License",
            "Choose later..."
        ]
    },
    {
        type: "input",
        name: "project_author",
        message: "What is your GitHub username?",
        validate: requireAnswer
    },
    {
        type: "input",
        name: "project_email",
        message: "What is your email address?",
        validate: requireAnswer
    },
    {
        type: "confirm",
        name: "project_index",
        message: "Include a table of contents?",
        default: "true"
    },
];

module.exports = {
    questions: questions,
    requireAnswer: requireAnswer
}