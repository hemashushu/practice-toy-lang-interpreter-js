/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { strict as assert } from 'assert';

import { Evaluator } from "../../src/evaluator.js";

function testWhileStatement() {
    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        let x = 20;     // ADD
        while(x>10) {
            x -=1;
        }
        x;              // ADD
        `), 10);
}

function testDoWhileStatement() {
    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        let x = 0;      // ADD
        do{
            x+=1;
        }while(x<10);
        x;              // ADD
        `), 10);
}

function testForStatement() {
    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        let x = 0;      // ADD
        for(let i =0;i<10;i+=1) {
            x+=i;
        }
        x;              // ADD
        `), 45);
}

function testIteration() {
    testWhileStatement();
    testDoWhileStatement();
    testForStatement();

    console.log('testIteration() passed.');
}

export { testIteration };