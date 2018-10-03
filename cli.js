#!/usr/bin/env node

// load env
require('dotenv').load();

const knex = require('./lib/db');
const uuid = require('uuid/v4');
const yargs = require('yargs');

yargs.command('$0 <name>', 'Utility to add target (get API key)', (yargs) => {
    yargs.positional('name', {
        describe: 'The name of the target',
        type: 'string'
    })
}, async ({ name }) => {
    await knex('targets')
        .select('name', 'token')
        .where({name})
        .first()
        .then(async (row) => {
            if (row) {
                console.log(row);
            } else {
                await knex('targets')
                    .insert({name, token: uuid()})
                    .returning(['name', 'token'])
                    .then(([row]) => console.log(row))
                    .catch(console.error);
            }
        })
        .catch(console.error);

    process.exit(0);
});

yargs.version('version', '1.0.0');
yargs.demandCommand();
yargs.help();

const { argv } = yargs;
