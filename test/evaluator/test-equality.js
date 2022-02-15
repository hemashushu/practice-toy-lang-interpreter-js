/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { strict as assert } from 'assert';

import { Evaluator } from "../../src/evaluator.js";

function testSimpleEqualityExpression() {
    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        let x = true;   // ADD
        x == true;
        `), true);

    // ADD
    assert.equal(evaluator.evalString(`
        let x = false;  // ADD
        x == true;
        `), false);


    assert.equal(evaluator.evalString(`
        let y=0;        // ADD
        y != 0;
        `), false);

    // ADD
    assert.equal(evaluator.evalString(`
        let y=2;        // ADD
        y != 0;
        `), true);
}

function testComplexEqualityExpression() {
    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        let m = 2;      // ADD
        let n = 1;      // ADD
        m > n == false;
        `), false);

    // ADD
    assert.equal(evaluator.evalString(`
        let m = 2;      // ADD
        let n = 3;      // ADD
        m > n == false;
        `), true);

    assert.equal(evaluator.evalString(`
        let i = 0;      // ADD
        let j = 0;      // ADD
        i < 1 == j < 2;
        `), true);

    // ADD
    assert.equal(evaluator.evalString(`
        let i = 1;      // ADD
        let j = 1;      // ADD
        i < 1 == j < 2;
        `), false);

    // ADD
    assert.equal(evaluator.evalString(`
        let i = 2;      // ADD
        let j = 2;      // ADD
        i < 1 == j < 2;
        `), true);

    assert.equal(evaluator.evalString(`
        let p = null;   // ADD
        let q = 2;      // ADD
        p = q * 3 != 6;
        `), false);

    // ADD
    assert.equal(evaluator.evalString(`
        let p = null;   // ADD
        let q = 3;      // ADD
        p = q * 3 != 6;
        `), true);
}

function testEquality() {
    testSimpleEqualityExpression();
    testComplexEqualityExpression();

    console.log('testEquality() passed.');
}

export { testEquality };