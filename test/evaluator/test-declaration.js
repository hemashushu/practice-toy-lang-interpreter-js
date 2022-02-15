/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { strict as assert } from 'assert';

import { Evaluator } from "../../src/evaluator.js";

function testSingleVariableDeclaration() {
    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        let x;
        `), null);

    assert.equal(evaluator.evalString(`
        let y = 1;
        `), 1);
}

function testMultipleVariableDeclaration() {
    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        let a, b;
        `), null);

    assert.equal(evaluator.evalString(`
        let m, n=2;
        `), 2);
}

function testVariableDeclarationWithExpressionInitializer() {
    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        let x=2; // ADD
        let z=x+1;
        `), 3);
}

function testReadVariable_ADD() {
    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        let a=1;
        let b=2;
        let c=3;
        a;
        `), 1);

    assert.equal(evaluator.evalString(`
        let a=1;
        let b=2;
        let c=3;
        b;
        `), 2);

    assert.equal(evaluator.evalString(`
        let a=1;
        let b=2;
        let c=3;
        c;
        `), 3);
}

function testAssignVariable_ADD() {
    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        let a=1;
        a;
        `), 1);

    assert.equal(evaluator.evalString(`
        let a;
        a=2;
        `), 2);

    assert.equal(evaluator.evalString(`
        let a=1;
        a=3;
        a;
        `), 3);

    assert.equal(evaluator.evalString(`
        let a=1;
        a=4;
        0;
        a;
        `), 4);

    assert.equal(evaluator.evalString(`
        let a=5;
        let b;
        0;
        a;
        `), 5);

    assert.equal(evaluator.evalString(`
        let a=5;
        a+=1;
        `), 6);

    assert.equal(evaluator.evalString(`
        let a=5;
        a*=2;
        `), 10);
}

function testVariableScope_ADD() {
    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        let a=1;
        {
            0;
            a;
        }
        `), 1);

    assert.equal(evaluator.evalString(`
        let a=2;
        {
            let a=3;
        }
        a;
        `), 2);

    assert.equal(evaluator.evalString(`
        let a=4;
        {
            a=5;
            0;
        }
        a;
        `), 5);
}

function testException_ADD() {
    let evaluator = new Evaluator();

    try {
        evaluator.evalString(`
        let a;
        b;
        `);
        assert.fail();

    } catch (err) {
        //
    }

    try {
        evaluator.evalString(`
        let a;
        let a;
        `);
        assert.fail();

    } catch (err) {
        //
    }

    try {
        evaluator.evalString(`
        {
            let a=1;
        }
        a;
        `);
        assert.fail();

    } catch (err) {
        //
    }
}

function testDeclarationStatement() {
    testSingleVariableDeclaration();
    testMultipleVariableDeclaration();
    testVariableDeclarationWithExpressionInitializer();

    // ADD
    testReadVariable_ADD();
    testAssignVariable_ADD();
    testVariableScope_ADD();
    testException_ADD();

    console.log('testDeclarationStatement() passed.');
}

export { testDeclarationStatement };