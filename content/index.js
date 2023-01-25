const appFileContent = '' + 
'const express = require("express");\n' +  
'const cors = require("cors");\n'+
'const app = express();\n'+
'const bodyParser = require("body-parser");\n\n' +
'app.use(cors());\n\n' +
'app.use(express.json({ limit: "5mb" }));\n' +
'app.use(express.urlencoded({ limit: "5mb", extended: true }));\n\n' +
'app.use(bodyParser.urlencoded({ extended : true }))\n' +
'app.use(bodyParser.json())\n\n' +
'// Home route\n' + 
'app.get("/", (_req, res) => {\n' +
'\tres.status(200).json({ message: "Hello There!! You are at Backend" });\n' + 
'});\n\n' + 
'// handle the error safely\n' + 
'process.on("uncaughtException", (err) => {\n' + 
'\tconsole.log(err);\n' + 
'});\n\n' +
'module.exports = app;';

const indexFileContent = '' + 
'require("dotenv").config();\n' + 
'const app = require("./app");\n' +
'const http = require("http");\n' +
'const chalk = require("chalk");\n\n' + 
'function normalizePort(val) {\n' +
'\tconst port = parseInt(val, 10);\n\n' +
'\tif (Number.isNaN(port)) {\n' +
'\t\treturn val;\n' +
'\t}\n\n' +
'\tif (port >= 0) {\n' +
'\t\treturn port;\n' +
'\t}\n\n' +
'\treturn false;\n' +
'}\n\n' +
'const port = normalizePort(process.env.PORT);\n' + 
'app.set("port", port);\n\n' +
'const server = http.createServer(app);\n\n' +
'function onError(error) {\n' +
'\tif (error.syscall !== "listen") {\n' +
'\t\tthrow error;\n' +
'\t}\n\n' +
'\tconst bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;\n\n' +
'\tswitch (error.code) {\n' +
'\t\tcase "EACCES":\n' +
'\t\t\tconsole.error(`${bind} requires elevated privileges`);\n' +
'\t\t\tbreak;\n' +
'\t\tcase "EADDRINUSE":\n' +
'\t\t\tconsole.error(`${bind} is already in use`);\n' +
'\t\t\tbreak;\n' +
'\t};\n\n' +
'\tthrow error;\n' +
'}\n\n' +
'function onListening() {\n' +
'\tconst addr = server.address();\n' +
'\tconst bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;\n\n' +
'\tconsole.log(chalk.green(\n' +
'\t\t`Server running in ${process.env.ENV || "development"} mode on ${bind}`\n' +
'\t));\n' +
'\tconsole.log(chalk.green(\n' +
'\t\t`Backend Available At http://localhost:` + addr.port\n' +
'\t));\n' +
'}\n\n' +
'server.listen(port);\n' +
'server.on("error", onError);\n' +
'server.on("listening", onListening);\n\n' +
'module.exports = app;' 

const mongoDbConnectionFileContent = 
    'const mongoose = require("mongoose");\n' + 
    'const chalk = require("chalk");\n' + 
    'require("dotenv").config();\n\n' + 
    
    'const connect = () => {\n\n' +

        '\tmongoose.connect(process.env.MONGO_URL, {\n'  
            + '\t\tdbName : process.env.DB_NAME\n' + 
        '\t})\n\n' + 

        '\tmongoose.Promise = Promise;\n\n' + 
        
        '\t// Database connection events\n' + 
        '\t// When successfully connected\n' + 
        '\tmongoose.connection.on("connected", () => {\n' + 
            '\t\tconsole.log(chalk.green(`Mongoose default connection open for worker ${process.pid}`));' +
        '\t});\n\n' + 
        
        '\t// If the connection throws an error\n' + 
        '\tmongoose.connection.on("error", (err) => {\n' + 
            '\t\tconsole.log(chalk.red(`Mongoose default connection error: ${err}`));\n' +
        '\t});\n\n' + 
        
        '\t// When the connection is disconnected\n' + 
        '\tmongoose.connection.on("disconnected", () => {\n' + 
            '\t\tconsole.log(chalk.yellow(`Mongoose default connection disconnected for worker ${process.pid}`));\n' + 
        '\t});\n\n' + 
        
        '\t// If the Node process ends, close the Mongoose and Redis connection\n' + 
        '\tprocess.on("SIGINT", () => {\n' + 
            '\t\tmongoose.connection.close(() => {\n' + 
               '\t\t\tconsole.log(chalk.yellow("Mongoose default connection disconnected through app termination"));\n' +
                '\t\t\t// eslint-disable-next-line no-process-exit\n' + 
                '\t\t\tprocess.exit();\n' + 
            '\t\t});\n' + 
        '\t});\n\n' + 
        
    '}\n\n' +  
    
    'module.exports = connect();'

module.exports = { appFileContent, indexFileContent,  mongoDbConnectionFileContent}