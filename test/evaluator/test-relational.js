/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { strict as assert } from 'assert';

import { Evaluator } from "../../src/evaluator.js";

function testSingleRelationalExpression() {
    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        let x=0;        // ADD
        x>0;
        `), false);

    // ADD
    assert.equal(evaluator.evalString(`
        let x=2;        // ADD
        x>0;
        `), true);

    assert.equal(evaluator.evalString(`
        let y=1;        // ADD
        y+1>9;
        `), false);

    // ADD
    assert.equal(evaluator.evalString(`
        let y=9;        // ADD
        y+1>9;
        `), true);

    assert.equal(evaluator.evalString(`
        let i=1;        // ADD
        let z=null;     // ADD
        z=i>1;
        `), false);

    // ADD
    assert.equal(evaluator.evalString(`
        let i=2;        // ADD
        let z=null;     // ADD
        z=i>1;
        `), true);
}

function testRelationalExpressionWithinIfStatement() {
    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        let x = 0;      // ADD
        if (x<=0){
            1;
        }
        `), 1);

    // ADD
    assert.equal(evaluator.evalString(`
        let x = 1;      // ADD
        if (x<=0){
            1;
        }
        `), null);
}

function testRelational() {
    testSingleRelationalExpression();
    testRelationalExpressionWithinIfStatement();

    console.log('testRelational() passed.');
}

export { testRelational };