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
'module.exports = app;';

const mongoDbConnectionFileContent = 
    'const mongoose = require("mongoose");\n' + 
    'const chalk = require("chalk");\n' + 
    'require("dotenv").config();\n\n' + 
    
    'const connect = () => {\n\n' +

        '/t	mongoose.set("strictQuery", true);\n\n' +

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
    
    'module.exports = connect();';

const utilFileContent = `/**
 * @param {string} obj
 * @param {string} key
 * @param {string} defaultString
 * @returns {string}
 */
 
 const replaceWithStrInObj = (obj, key, defaultString) => (obj[key] ? obj[key] : defaultString);

 /**
  * @param {string} obj
  * @param {string} key
  * @returns {string}
  */
 const replaceWithBlankStrInObj = (obj, key) => replaceWithStrInObj(obj, key, '');
 
module.exports =  { replaceWithBlankStrInObj, replaceWithStrInObj };
`;

const errorHandlerFileContent = `const utils = require('./utils');

class ErrorHandler extends Error {
    constructor(errorType, error) {
        super();
        this.errorType = errorType;
        this.statusCode = utils.replaceWithStrInObj(error, 'statusCode', 500);
        this.message = utils.replaceWithBlankStrInObj(error, 'message');
        this.user = utils.replaceWithBlankStrInObj(error, 'user');
        this.errStack = utils.replaceWithBlankStrInObj(error, 'errStack');
    }
}

const errorHandler = (err, _req, res, _next) => {
    res.status(err.statusCode).json(err);
};

module.exports = { ErrorHandler, errorHandler };`;

const authMiddleWareFileContent = `const to = require('await-to-js').default;
const { sign, verify } = require('jsonwebtoken');
const { ErrorHandler } = require('../helpers/errors')
const constants = require('../constants');
require("dotenv").config();

const generateJWT = (payload, expiry = process.env.JWT_EXPIRES_IN) =>
  sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: expiry });

const getTokenFromHeader = async (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
  
  const error = new ErrorHandler(constants.ERRORS.AUTH, {
    statusCode: 401,
    message: 'Missing or invalid authentication header',
  });

  throw error;
};

const verifyToken = async (token) => verify(token, process.env.JWT_SECRET_KEY);

const authMiddleware = async (req, res, next) => {
  const [err, token] = await to(getTokenFromHeader(req));
  if (err) {
    next(err);
  }

  const [err2, payload] = await to(verifyToken(token));
  if (err2) {
    const error = new ErrorHandler(constants.ERRORS.AUTH, {
      statusCode: 401,
      errStack: err2,
      message: 'JWT authentication failed',
    });
    next(error);
  }
  res.locals.decode = payload;
  next();
};

module.exports = { authMiddleware, generateJWT, verifyToken, getTokenFromHeader };`;

const mySQLConnectionFileContent = 
'const mysql = require("mysql");\n' + 
'const chalk = require("chalk");\n' +
'require("dotenv").config();\n\n' +

'const connect = () => {\n\n' + 
'\tconst host = process.env.DBHost;\n' +
'\tconst port = process.env.DBPort;\n' +
'\tconst database = process.env.DBName;\n' +
'\tconst username = process.env.DBUserName;\n' + 
'\tconst password = process.env.DBPassword;\n\n' +

'\tconst connection = mysql.createConnection({\n' + 
'\t\thost : host,\n' +
'\t\tport : port,\n' +
'\t\tdatabase : database,\n' +
'\t\tuser : username,\n' +
'\t\tpassword : password\n' +
'\t});\n\n' +

'\tconnection.connect((err) => {\n' +
'\t\tconst configs = `\\nhost : ${host}\\nport : ${port}\\ndatabase : ${database}\\nuser : ${username}\\npassword : ${password}`;\n' +
'\t\tif (err) {\n' +
'\t\t\tconsole.log(chalk.yellow(`Error Connecting To MySQL Database With Following Configs, ${configs}`));\n' + 
'\t\t\tconsole.log(chalk.red(`Error : ` + err.message));\n' +
'\t\t} else {\n' +
'\t\t\tconsole.log(chalk.green(`MySQL successfully connected with ${database}`));\n' +
'\t\t}\n' +
'\t});\n\n' +
'}\n\n' +

'module.exports = connect();';

module.exports = { 
  appFileContent, 
  indexFileContent,  
  mongoDbConnectionFileContent, 
  errorHandlerFileContent, 
  utilFileContent,
  authMiddleWareFileContent,
  mySQLConnectionFileContent
};