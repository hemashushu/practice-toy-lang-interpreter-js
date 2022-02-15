/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */


import fs from 'fs';

import { Parser } from '../src/parser.js';

function printUsage() {
    console.log(`
usage:
    $ npm run ast script_file
    `);
}

function printAst(string) {
    const parser = new Parser();
    const ast = parser.parse(string);
    console.log(JSON.stringify(ast, null, 2));
}

function printAstFromFile(file) {
    const string = fs.readFileSync(file, 'utf-8');
    printAst(string);
}

let args = process.argv;

if (args.length !== 3) {
    printUsage();
    process.exit(1);
}

printAstFromFile(args[2]);
