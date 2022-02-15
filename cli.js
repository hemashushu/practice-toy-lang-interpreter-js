#!/usr/bin/env node

import { Evaluator } from './src/evaluator.js';

function printUsage() {
    console.log(`
usage:
    $ toy-js script_file.toy
    `);
}

let args = process.argv;

if (args.length !== 3) {
    printUsage();
    process.exit();
}

const evaluator = new Evaluator();
evaluator.evalFile(args[2]);
