const chalk = require("chalk");
const { spawn } = require("child_process");
const readline = require('readline');
const { writingToEnv } = require("../components/writingToEnv");
const { writingToFile, makeDirectory } = require("../components/writingToFile");
const { appFileContent, indexFileContent, utilFileContent, errorHandlerFileContent } = require('../content/index');

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
    const data = "PORT=" + port;
    writingToEnv(data, creatingAPPJS);
}

const creatingAPPJS = () => {
    writingToFile("app.js", appFileContent, "Error Writing App File : ", "app.js file created...", creatingIndexJS);
}

const creatingIndexJS = () => {
    writingToFile("index.js", indexFileContent, "Error Writing Index File : ", "index.js file created...", creatingHelperFunctions);
}

const creatingHelperFunctions  = () => {
    makeDirectory("helpers");
    writingToFile("helpers/utils.js", utilFileContent, "Error Writing Util File at helpers/utils.js : ", "util.js file created...", creatingErrorHandlerFunctions);
}

const creatingErrorHandlerFunctions = () => {
    writingToFile("helpers/error.js", errorHandlerFileContent, "Error Writing File at helpers/error.js : ", "error.js file created...", null);
}


module.exports = { doTheBasics, run };