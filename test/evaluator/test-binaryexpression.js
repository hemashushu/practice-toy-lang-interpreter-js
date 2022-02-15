/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { strict as assert } from 'assert';

import { Evaluator } from "../../src/evaluator.js";

function testAdditiveExpression() {
    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        1+2;
        `), 3);

    assert.equal(evaluator.evalString(`
        1+2+3;
        `), 6);
}

function testMultiplicativeExpression() {
    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        1*2;
        `), 2);

    assert.equal(evaluator.evalString(`
        1+2*3;
        `), 7);
}

function testParenthesizedExpression() {
    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        (1+2)*3;
        `), 9);

    assert.equal(evaluator.evalString(`
        8*(2+3)+4;
        `), 44);
}

function testBinaryExpression() {
    testAdditiveExpression();
    testMultiplicativeExpression();
    testParenthesizedExpression();

    console.log('testBinaryExpression() passed.');
}

export { testBinaryExpression };