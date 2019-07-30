#!/usr/bin/env node

const cei = require('.');
cei(process.argv[2]).then(console.log);
