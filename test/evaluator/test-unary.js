/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { strict as assert } from 'assert';

import { Evaluator } from "../../src/evaluator.js";

function testUnaryNot() {
    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        !false;
        `), true);

    assert.equal(evaluator.evalString(`
        let m=true;         // ADD
        !m;
        `), false);

    assert.equal(evaluator.evalString(`
        let a=0, b=0;       // ADD
        !(a>b);
        `), true);

    // ADD
    assert.equal(evaluator.evalString(`
        let a=1, b=0;       // ADD
        !(a>b);
        `), false);
}

function testUnaryNegative() {
    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        let x =2;           // ADD
        -x;
        `), -2);

    assert.equal(evaluator.evalString(`
        +123;
        `), 123);

    assert.equal(evaluator.evalString(`
        let y=5;            // ADD
        -(y+10);
        `), -15);

    assert.equal(evaluator.evalString(`
        5+-2;
        `), 3);
}

function testUnaryChain() {
    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        let x =2;           // ADD
        !-x;
        `), false);

    assert.equal(evaluator.evalString(`
        !!false;
        `), false);
}

function testUnary() {
    testUnaryNot();
    testUnaryNegative();
    testUnaryChain();

    console.log('testUnary() passed.');
}

export { testUnary };