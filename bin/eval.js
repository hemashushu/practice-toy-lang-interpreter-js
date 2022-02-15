/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { Evaluator } from '../src/evaluator.js';

function printUsage() {
    console.log(`
usage:
    $ npm run eval script_file
    `);
}

let args = process.argv;

if (args.length !== 3) {
    printUsage();
    process.exit(1);
}

const evaluator = new Evaluator();
let value = evaluator.evalFile(args[2]);

console.log('> program return value:');
console.log(JSON.stringify(value, null, 2));