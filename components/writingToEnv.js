const chalk = require("chalk");
const fs = require('fs');

const writingToEnv = (content, callback) => {
    if(fs.existsSync(".env")) {
        fs.appendFile(".env", `\n${content}`, (err) => {
            if(err) {
                console.log(chalk.red("Error Writing Env File : " + err.message));
            }
            callback();
            console.log(chalk.blue(".env file appened..."))
        })
    }else{
        fs.writeFile(".env", `${content}`, (err) => {
            if(err) {
                console.log(chalk.red("Error Writing Env File : " + err.message));
            }
            callback();
            console.log(chalk.blue(".env file created..."))
    
        })
    }
}

module.exports = { writingToEnv };