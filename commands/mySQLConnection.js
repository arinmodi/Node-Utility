const { run } = require('./doTheBasics');
const readline = require('readline');
const chalk = require('chalk');
const { writingToEnv } = require('../components/writingToEnv');
const { makeDirectory, writingToFile } = require('../components/writingToFile');
const { mySQLConnectionFileContent } = require('../content');

const mySQLCon = () => {
    console.log(chalk.green("Installing mysql..."));
    run("npm.cmd", ["install", "mysql"]).then((res) => {
        console.log(chalk.blue("mysql Installed..."));

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
                getHost();
            }
        })
    })
}

const getHost = () => {
    let host;

    const rl = readline.createInterface({
        input : process.stdin,
        output : process.stdout,
    });

    rl.setPrompt("Enter the Host For MySQL Database : ");
    rl.prompt();
    rl.on('line', (n) => {
        if(n.length >= 5) {
            host = n;
            rl.close();
            rl.removeAllListeners();
        }else{
            console.log(chalk.red("Enter the valid host"))
            rl.prompt();
        }
    });
    rl.on('close' , () => {
        if(host !== undefined) {
            getPort(host);
        }
    })
}

const getPort = (host) => {
    let num;

    const rl = readline.createInterface({
        input : process.stdin,
        output : process.stdout
    });

    rl.setPrompt("Enter the Port For MySQL Database : ");
    rl.prompt();
    rl.on('line', (n) => {
        if(n > 0 && n < 65536) {
            num = n;
            rl.close();
            rl.removeAllListeners()
        }else{
            console.log(chalk.red("Enter the valid port between 0 & 65535"))
            rl.prompt();
        }
    });
    rl.on('close' , () => {
        if(num !== undefined)
            getDBName(host, num);
    })
}

const getDBName = (host, num) => {
    let name;

    const rl = readline.createInterface({
        input : process.stdin,
        output : process.stdout,
    });

    rl.setPrompt("Enter the DB Name You Want Use : ");
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
            getUserName(host, num, name);
        }
    })
}

const getUserName = (host, num, dbname) => {
    let name;

    const rl = readline.createInterface({
        input : process.stdin,
        output : process.stdout,
    });

    rl.setPrompt("Enter the UserName For accessing Database Host : ");
    rl.prompt();
    rl.on('line', (n) => {
        if(n.length >=1) {
            name = n;
            rl.close();
            rl.removeAllListeners();
        }else{
            console.log(chalk.red("Enter the valid UserName, Spaces Not Allowed"))
            rl.prompt();
        }
    });
    rl.on('close' , () => {
        if(name !== undefined) {
            getPassword(host, num, dbname, name);
        }
    })
}

const getPassword = (host, port, dbname, uname) => {
    let pass = "";

    const rl = readline.createInterface({
        input : process.stdin,
        output : process.stdout,
    });

    rl.setPrompt("Enter the Password For accessing Database Host : ");
    rl.prompt();
    rl.on('line', (n) => {
        pass = n;
        rl.close();
        rl.removeAllListeners();
    });
    rl.on('close' , () => {
        if(pass !== undefined) {
            let data = `DBHost=${host}\nDBPort=${port}\nDBName=${dbname}\nDBUserName=${uname}\nDBPassword=${pass}`;
            writingToEnv(data, creatingConnectionFile)
        }
    })
}

const creatingConnectionFile = () => {
    makeDirectory("database");
    const errorMessage = "Error Writing MySQL Connection File : ";
    const successMessage = "connection file created at database/mysqlConnection.js";
    writingToFile("database/mysqlConnection.js", mySQLConnectionFileContent, errorMessage, successMessage, null);
}

module.exports = { mySQLCon };