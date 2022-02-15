/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { strict as assert } from 'assert';

import { Evaluator } from "../../src/evaluator.js";

function testLogicalAnd() {
    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        true && false;
        `), false);

    // ADD
    assert.equal(evaluator.evalString(`
        true && true;
        `), true);

    assert.equal(evaluator.evalString(`
        let x=0, y=0;           // ADD
        x>0 && y != 0;
        `), false);

    // ADD
    assert.equal(evaluator.evalString(`
        let x=1, y=1;           // ADD
        x>0 && y != 0;
        `), true);
}

function testLogicalOr() {
    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        let m=0, n=0, p=0, q=0; // ADD
        m > n || p == q;
        `), true);

    // ADD
    assert.equal(evaluator.evalString(`
        let m=1, n=0, p=1, q=0; // ADD
        m > n || p == q;
        `), true);

    // ADD
    assert.equal(evaluator.evalString(`
        let m=0, n=0, p=1, q=0; // ADD
        m > n || p == q;
        `), false);

    // ADD
    assert.equal(evaluator.evalString(`
        let m=0, n=0, p=1, q=0; // ADD
        m > n || p == q;
        `), false);
}

function testLogical() {
    testLogicalAnd();
    testLogicalOr();

    console.log('testLogical() passed.');
}

export { testLogical };