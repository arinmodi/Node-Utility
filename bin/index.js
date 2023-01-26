#! /usr/bin/env node
const { program } = require('commander')
const { doTheBasics } = require('../commands/doTheBasics')
const { doTheMongoSetUp } = require('../commands/mongoDB');

program.command('basic').description("Do the Basic Set Up Of API Project").action(doTheBasics);
program.command('mongocon').description("Connect the Project With The MongoDB").action(doTheMongoSetUp);
program.parse()