#!/usr/bin/env node

// load env
require('dotenv').load();

const dispatch = require('./queue/dispatch');
const routes = require('./consts/routes');

dispatch(routes.enqueue, [Math.random()]);
