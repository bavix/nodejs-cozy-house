#!/usr/bin/env node

// load env
require('dotenv').load();

const db = require('./auth/db');
const uuid = require('uuid/v4');
const yargs = require('yargs');
const argv = yargs.argv;
const name = argv.name;

if (name === undefined) {
    console.warn('argument --name is required');
    process.exit(1);
}

function result(res) {
    console.info(res);
    process.exit(0);
}

db.one('SELECT name, token FROM targets WHERE name=$1', name)
    .then(result)
    .catch((error) => {
        db.one('INSERT INTO targets (name, token) VALUES($1, $2) RETURNING name, token', [name, uuid()])
            .then(result)
            .catch(console.error);
    });
