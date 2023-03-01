const chalk = require("chalk");
const fs = require('fs');

const makeDirectory = (name) => {
    if (!fs.existsSync(name)) {
        fs.mkdirSync(name);
    }
}

const writingToFile = (path, content, errorMessage, successMessage, callback) => {
    fs.writeFile(path, content, (err) => {
        if(err) {
            console.log(chalk.red(errorMessage + err.message));
        }

        console.log(chalk.blue(successMessage));
        if (callback === null) {
            process.exit(0);
        } else {
            callback();
        }
    })
}

module.exports = { makeDirectory, writingToFile };