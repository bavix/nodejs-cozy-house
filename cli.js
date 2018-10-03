#!/usr/bin/env node

// load env
require('dotenv').load();

const db = require('./lib/db');
const uuid = require('uuid/v4');
const yargs = require('yargs');

function result(res) {
    console.info(res);
    process.exit(0);
}

yargs.command('$0 <name>', 'Utility to add target (get API key)', (yargs) => {
    yargs.positional('name', {
        describe: 'The name of the target',
        type: 'string'
    })
}, ({ name }) => {
    db.one('SELECT name, token FROM targets WHERE name=$1', name)
        .then(result)
        .catch((error) => {
            db.one('INSERT INTO targets (name, token) VALUES($1, $2) RETURNING name, token', [name, uuid()])
                .then(result)
                .catch(console.error);
        });
});

yargs.version('version', '1.0.0');
yargs.demandCommand();
yargs.help();

const { argv } = yargs;
