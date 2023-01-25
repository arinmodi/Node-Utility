const chalk = require("chalk");
const { spawn } = require("child_process");
const readline = require('readline');
const { appFileContent, indexFileContent } = require('../content/index');
const fs = require("fs")

const run = (cmd, args) => {
    return new Promise((resolve, reject) => {
        const command = spawn(cmd, args, {
            stdio : "inherit"
        });

        command.on('data', data => {
            console.log(data.toString())
        });

        command.on('close', (code) => {
            resolve(code);
        })

        command.on('error', (err) => {
            reject(err);
        })
    })
}

const doTheBasics = () => {
    console.log(chalk.green("Installing Express..."));
    run("npm.cmd", ["install", "express"]).then((res) => {
        console.log(chalk.blue("Express Installed..."));

        
        console.log(chalk.green("Installing Body-Parser..."));
        run("npm.cmd", ["install", "body-parser"]).then((res) => {
            console.log(chalk.blue("Body-Parser Installed..."))


            console.log(chalk.green("Installing Cors..."));
            run("npm.cmd", ["install", "cors"]).then((res) => {
                console.log(chalk.blue("Cors Installed..."));


                console.log(chalk.green("Installing Dotenv..."));
                run("npm.cmd", ["install", "dotenv"]).then((res) => {
                    console.log(chalk.blue("Dotenv Installed..."));

                    console.log(chalk.green("Installing HTTP..."));
                    run("npm.cmd", ["install", "http"]).then((res) => {
                        console.log(chalk.blue("HTTP Installed..."));

                        console.log(chalk.green("Installing chalk..."));
                        run("npm.cmd", ["install", "chalk@4.0.0"]).then((res) => {
                            console.log(chalk.blue("chalk Installed..."));
                            portEntering();
                        })
                    })
                }).catch((e) => {
                    console.log(e);
                })
            }).catch((e) => {
                console.log(e);
            })
        }).catch((e) => {
            console.log(e);
        })
    }).catch((e) => {
        console.log(e);
    });
}

const portEntering = async () => {
    let num;

    const rl = readline.createInterface({
        input : process.stdin,
        output : process.stdout
    });

    rl.setPrompt("Enter the Port : ");
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
            creatingEnv(num);
    })
}

const creatingEnv = (port) => {
    if(fs.existsSync(".env")) {
        fs.appendFile(".env", "\nPORT=" + port, (err) => {
            if(err) {
                console.log(chalk.red("Error Writing Env File : " + err.message));
            }
    
            console.log(chalk.blue(".env file appened..."))
    
            creatingAPPJS();
        })
    }else{
        fs.writeFile(".env", "PORT=" + port, (err) => {
            if(err) {
                console.log(chalk.red("Error Writing Env File : " + err.message));
            }
    
            console.log(chalk.blue(".env file created..."))
    
            creatingAPPJS();
        })
    }
}

const creatingAPPJS = () => {
    fs.writeFile("app.js", appFileContent, (err) => {
        if(err) {
            console.log(chalk.red("Error Writing App File : " + err.message));
        }

        console.log(chalk.blue("app.js file created..."))
        creatingIndexJS()
    })
}

const creatingIndexJS = () => {
    fs.writeFile("index.js", indexFileContent, (err) => {
        if(err) {
            console.log(chalk.red("Error Writing Index File : " + err.message));
        }

        console.log(chalk.blue("index.js file created..."))
        process.exit(0);
    })
}


module.exports = { doTheBasics, run };