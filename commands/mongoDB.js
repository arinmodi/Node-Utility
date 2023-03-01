const { run } = require('./doTheBasics');
const readline = require('readline');
const chalk = require('chalk');
const { mongoDbConnectionFileContent } = require('../content/index');
const { writingToEnv } = require('../components/writingToEnv');
const { makeDirectory, writingToFile } = require('../components/writingToFile');

const doTheMongoSetUp = () => {
    console.log(chalk.green("Installing Mongoose..."));
    run("npm.cmd", ["install", "mongoose"]).then((res) => {
        console.log(chalk.blue("Mongoose Installed..."));

        console.log(chalk.green("Checking Chalk..."));
        run("npm.cmd", ["ls", "chalk"]).then((res) => {
            if(res == 1) {
                console.log(chalk.green("Installing chalk..."));
                run("npm.cmd", ["install", "chalk@4.0.0"]).then((res) => {
                    console.log(chalk.blue("chalk Installed..."));
                    takeMongoURL();
                })
            }else{
                console.log(chalk.blue("chalk Installed..."));
                takeMongoURL();
            }
        })
    })
}

const takeMongoURL = () => {
    let url;

    const rl = readline.createInterface({
        input : process.stdin,
        output : process.stdout,
    });

    rl.setPrompt("Enter the Mongo Connection Url : ");
    rl.prompt();
    rl.on('line', (n) => {
        if(n.length >=10 && n.includes("<password>") == false && n.includes("mongodb")) {
            url = n;
            rl.close();
            rl.removeAllListeners();
        }else{
            console.log(chalk.red("Enter the valid Mongo Url"))
            rl.prompt();
        }
    });
    rl.on('close' , () => {
        if(url !== undefined) {
            takeDBName(url)
        }
    })
}

const takeDBName = (url) => {
    let name;

    const rl = readline.createInterface({
        input : process.stdin,
        output : process.stdout,
    });

    rl.setPrompt("Enter the DB Name : ");
    rl.prompt();
    rl.on('line', (n) => {
        if(n.length >=1 && n.includes(" ") == false) {
            name = n;
            rl.close();
            rl.removeAllListeners();
        }else{
            console.log(chalk.red("Enter the valid DB Name, Spaces Not Allowed"))
            rl.prompt();
        }
    });
    rl.on('close' , () => {
        if(name !== undefined) {
            const data = `MONGO_Url=${url}\nDB_NAME=${name}`;
            writingToEnv(data, creatingDBConnectionFile);
        }
    })
}

const creatingDBConnectionFile = () => {
    makeDirectory("database");
    const errorMessage = "Error Writing MongoDB Connection File : ";
    const successMessage = "connection file created at database/mongodbConnection.js";
    writingToFile("database/mongodbConnection.js", mongoDbConnectionFileContent, errorMessage, successMessage, null);
}

module.exports = { doTheMongoSetUp }