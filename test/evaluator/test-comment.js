/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { strict as assert } from 'assert';

import { Evaluator } from "../../src/evaluator.js";

function testSingleLineComment() {
    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        // comment 1
        555; // comment 2
        `), 555);
}

function testMultiLineComment() {
    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        /**
         * comment
         */
        555 /* "also comment" */ ;
        `), 555);
}

function testComment() {
    testSingleLineComment();
    testMultiLineComment();

    console.log('testComment() passed.');
}

export { testComment };