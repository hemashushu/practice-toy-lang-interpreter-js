/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { Parser } from '../src/parser.js';

class Evaluator {

    eval() {
        const parser = new Parser();
        const ast = parser.parse(`
            // let x;
            // let y = 1;
            // let a, b;
            // let m, n = 2;
            //let z = x+1;
            let f = b= 10;
        `);

        console.log(JSON.stringify(ast, undefined, '  '));
    }

}

export { Evaluator };