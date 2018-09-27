#!/usr/bin/env node

// load env
require('dotenv').load();

const db = require('./auth/db');
const uuid = require('uuid/v4');

for (let i = 0; i < 1000000; i++) {
    db.none('INSERT INTO targets (name, token) VALUES($1, $2)', [
        ('t'+Math.random()).substring(0, 40),
        uuid()
    ]);
}
