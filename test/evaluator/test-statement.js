/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { strict as assert } from 'assert';

import { Evaluator } from "../../src/evaluator.js";

function testMultiStatements() {
    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        "hello";
        123;
        `), 123);
}

function testStatement() {
    testMultiStatements();

    console.log('testStatement() passed.');
}

export { testStatement };