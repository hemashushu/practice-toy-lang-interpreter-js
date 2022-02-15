/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/**
 * 用于手动调试 Parser
 */

import { Parser } from '../src/parser.js';

function printUsage() {
    console.log(`
usage:
    $ npm run devel
    `);
}

function printAst(string) {
    const parser = new Parser();
    const ast = parser.parse(string);
    console.log(JSON.stringify(ast, null, 2));
}

let args = process.argv;

if (args.length !== 2) {
    printUsage();
    process.exit(1);
}

// 这里写上需要调试的 toy 语言代码
const string = `
    print("Hello world!");
    `;

printAst(string);