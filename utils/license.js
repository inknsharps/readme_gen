// Declare empty variables for usage in link and section generation later
let link;
let section;

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
    // Declare badge variables
    const { makeBadge, ValidationError } = require("badge-maker");
    const format = {
        label: "License",
        message: license,
        color: "green"
    }
    return makeBadge(format);
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(name, link) {
    return `[${name}](${link})`
}

// Function to generate the markdown for the license section
function renderLicenseSection(type){
    switch (type){
        case "MIT License":
            return renderLicenseLink("MIT License", "https://spdx.org/licenses/MIT.html");
        case "Apache License 2.0":
            return renderLicenseLink("Apache License 2.0", "https://spdx.org/licenses/Apache-2.0.html");
        case "GNU General Public License (GPL) 3.0":
            return renderLicenseLink("GNU General Public License (GPL) 3.0", "https://spdx.org/licenses/GPL-3.0-or-later.html");
        case "ISC License":
            return renderLicenseLink("ISC License", "https://spdx.org/licenses/ISC.html");
        case "Choose later...":
            break;
    }
}

module.exports = {
    link: link,
    section: section,
    renderLicenseBadge: renderLicenseBadge,
    renderLicenseLink: renderLicenseLink,
    renderLicenseSection: renderLicenseSection
}
