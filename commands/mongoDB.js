const { run } = require('./doTheBasics');
const readline = require('readline');
const chalk = require('chalk');
const fs = require('fs');
const { mongoDbConnectionFileContent } = require('../content/index');

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
            writingToEnv(url, name);
        }
    })
}

const writingToEnv = (url, name) => {
    if(fs.existsSync(".env")) {
        fs.appendFile(".env", `\nMONGO_Url=${url}\nDB_NAME=${name}`, (err) => {
            if(err) {
                console.log(chalk.red("Error Writing Env File : " + err.message));
            }
            creatingDBConnectionFile()
            console.log(chalk.blue(".env file appened..."))
        })
    }else{
        fs.writeFile(".env", `MONGO_Url=${url}\nDB_NAME=${name}`, (err) => {
            if(err) {
                console.log(chalk.red("Error Writing Env File : " + err.message));
            }
            creatingDBConnectionFile()
            console.log(chalk.blue(".env file created..."))
    
        })
    }
}

const creatingDBConnectionFile = () => {
    fs.mkdirSync("database");
    fs.writeFile("database/dbConnection.js", mongoDbConnectionFileContent, (err) => {
        if(err) {
            console.log(chalk.red("Error Writing Connection File : " + err.message));
        }

        console.log(chalk.blue("connection file created at database/dbConnection"))
        process.exit(0);
    })
}

module.exports = { doTheMongoSetUp }