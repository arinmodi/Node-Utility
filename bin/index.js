#! /usr/bin/env node
const { program } = require('commander')
const { doTheBasics } = require('../commands/doTheBasics');
const { jwtSetUp } = require('../commands/jwtSetUp');
const { doTheMongoSetUp } = require('../commands/mongoDB');
const { mySQLCon } = require('../commands/mySQLConnection');

program.command('basic').description("Do the Basic Set Up Of Node-JS API Project").action(doTheBasics);
program.command('mongocon').description("Connect the Project With The MongoDB").action(doTheMongoSetUp);
program.command('jwt').description("Setup Necessary Functions For Adding JWT Authentication").action(jwtSetUp);
program.command('mysqlcon').description("Connect the Project With The MySQL").action(mySQLCon);
program.parse()