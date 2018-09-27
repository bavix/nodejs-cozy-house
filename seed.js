#!/usr/bin/env node

// load env
require('dotenv').load();

const db = require('./auth/db');
const uuid = require('uuid/v4');

for (let i = 0; i < 100000; i++) {
    const name = ('t'+Math.random()).substring(0, 40);
    const token = uuid();

    db.one('INSERT INTO targets (name, token) VALUES($1, $2) RETURNING id', [name, token])
        .then(data => {
            console.log(data.id); // print new user id;
        })
        .catch(error => {
            console.log('ERROR:', error); // print error;
        });
}
