const { run } = require('./doTheBasics');

const chalk = require('chalk');
const readline = require('readline');
const { writingToEnv } = require('../components/writingToEnv');
const { makeDirectory, writingToFile } = require('../components/writingToFile');
const { authMiddleWareFileContent } = require('../content');

const jwtSetUp = () => {
    console.log(chalk.green("Installing jsonwebtoken..."));
    run("npm.cmd", ["install", "jsonwebtoken"]).then((res) => {
        console.log(chalk.blue("jsonwebtoken Installed..."));

        console.log(chalk.green("Installing await-to-js..."));
        run("npm.cmd", ["install", "await-to-js"]).then((res) => {
            console.log(chalk.blue("await-to-js Installed..."));

            takeJwtSecert();
        });
    });
};

const takeJwtSecert = () => {
    let secert;

    const rl = readline.createInterface({
        input : process.stdin,
        output : process.stdout,
    });

    rl.setPrompt("Enter the JWT Secret : ");
    rl.prompt();
    rl.on('line', (n) => {
        if(n.length >=10 && n.includes(" ") == false && n.length <= 25) {
            secert = n;
            rl.close();
            rl.removeAllListeners();
        }else{
            console.log(chalk.red("Enter the valid JWT Secert, length should be between 10 & 25, Spaces Not Allowed"))
            rl.prompt();
        }
    });
    rl.on('close' , () => {
        if(secert !== undefined) {
            let data = "JWT_SECERT="+secert;
            writingToEnv(data, writeToAuth);
        }
    })
}

const writeToAuth = () => {
    makeDirectory("middleware");
    writingToFile(
        "middleware/auth.js", authMiddleWareFileContent,  
        "Error Writing File at middleware/auth.js : ", 
        "auth.js file created...", null
    );
};

module.exports = { jwtSetUp };