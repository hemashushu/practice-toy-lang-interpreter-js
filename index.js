/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

function printUsage() {
    console.log(`
    usage:
        $ npm run eval script_file -- -args|--args
    e.g.
        $ npm run eval asmple.toy
        $ npm run eval sample.toy -- --ast
        $ npm run eval -- --devel
        `);
}

import { Evaluator } from "./src/evaluator.js";
const e = new Evaluator();

let args = process.argv;

if (args.length < 3) {
    printUsage();
    process.exit(1);
}

// 注：
// 运行 `$ node index.js sample.toy -- --ast` 会把 `--` 符号传递进来
// 运行 `$ npm run eval sample.toy -- --ast` 不会把 `--` 符号传递进来

args = args.slice(2); // [0] == /usr/bin/node, [1] = /path/to/index.js

if (args.indexOf('--devel') >= 0) {
    e.devel();
}else if (args.indexOf('--ast') === 1)    {
    e.printFileAst(args[0]);
} else {
    e.evalFile(args[0]);
}