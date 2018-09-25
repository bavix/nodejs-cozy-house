#!/usr/bin/env node

// load env
require('dotenv').load();

const dispatch = require('./queue/dispatch');
const routes = require('./queue/routes');

dispatch(routes.enqueue, [1,2,{a:1}]);
