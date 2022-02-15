/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { strict as assert } from 'assert';

import { Evaluator } from "../../src/evaluator.js";

function testFunctionDeclarationAndFunctionCall() {

    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        function double(x) {
            x*2;
        }
        double(3);
        `), 6);

    assert.equal(evaluator.evalString(`
        function add(m, n) {
            m+n;    // ADD
        }
        add(2, 3);
        `), 5);

    assert.equal(evaluator.evalString(`
        function empty() {

        }
        empty();
        `), null);

    console.log('testFunctionDeclarationAndFunctionCall() passed.');
}

export { testFunctionDeclarationAndFunctionCall };