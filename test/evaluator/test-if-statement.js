/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { strict as assert } from 'assert';

import { Evaluator } from "../../src/evaluator.js";

function testSimpleIfStatement() {
    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        let a = 3;      // ADD
        let x = true;   // ADD
        if (x) a=0;
        a;              // ADD
        `), 0);

    // ADD
    assert.equal(evaluator.evalString(`
        let a = 3;      // ADD
        let x = false;  // ADD
        if (x) a=0;
        a;              // ADD
        `), 3);

    assert.equal(evaluator.evalString(`
        let a = 3;      // ADD
        let x = true;   // ADD
        if (x)
            a = 0;
        else
            a = 1;
        a;              // ADD
        `), 0);

    // ADD
    assert.equal(evaluator.evalString(`
        let a = 3;      // ADD
        let x = false;  // ADD
        if (x)
            a = 0;
        else
            a = 1;
        a;              // ADD
        `), 1);
}

function testIfStatementWithBlockStatement() {
    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        let a = 3;      // ADD
        let x = true;   // ADD
        if (x) {
            a=0;
        }
        a;              // ADD
        `), 0);

    // ADD
    assert.equal(evaluator.evalString(`
        let a = 3;      // ADD
        let x = false;  // ADD
        if (x) {
            a=0;
        }
        a;              // ADD
        `), 3);

    assert.equal(evaluator.evalString(`
        let a = 3;      // ADD
        let x = false;  // ADD
        if (x) {
            a=0;
        }else {
            a=1;
        }
        a;              // ADD
        `), 1);

    // ADD
    assert.equal(evaluator.evalString(`
        let a = 3;      // ADD
        let x = true;   // ADD
        if (x) {
            a=0;
        }else {
            a=1;
        }
        a;              // ADD
        `), 0);
}

function testCascadingIfStatement() {
    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        let x = true;   // ADD
        let y = true;   // ADD
        if (x)
            if (y)
                2;
            else
                8;
        `), 2);

    // ADD
    assert.equal(evaluator.evalString(`
        let x = true;   // ADD
        let y = false;  // ADD
        if (x)
            if (y)
                2;
            else
                8;
        `), 8);

    // ADD
    assert.equal(evaluator.evalString(`
        let x = false;  // ADD
        let y = true;   // ADD
        if (x)
            if (y)
                2;
            else
                8;
        `), null);

    // ADD
    assert.equal(evaluator.evalString(`
        let x = false;  // ADD
        let y = false;  // ADD
        if (x)
            if (y)
                2;
            else
                8;
        `), null);

    assert.equal(evaluator.evalString(`
        let p = true;   // ADD
        let q = true;   // ADD
        if (p){
            1;
        }else if (q) {
            2;
        }
        `), 1);

    // ADD
    assert.equal(evaluator.evalString(`
        let p = true;   // ADD
        let q = false;  // ADD
        if (p){
            1;
        }else if (q) {
            2;
        }
        `), 1);

    // ADD
    assert.equal(evaluator.evalString(`
        let p = false;  // ADD
        let q = true;   // ADD
        if (p){
            1;
        }else if (q) {
            2;
        }
        `), 2);

    // ADD
    assert.equal(evaluator.evalString(`
        let p = false;  // ADD
        let q = false;  // ADD
        if (p){
            1;
        }else if (q) {
            2;
        }
        `), null);

    assert.equal(evaluator.evalString(`
        let m = true;   // ADD
        let n = true;   // ADD
        if (m) if (n) {1;} else {2;} else {3;}
        `), 1);

    // ADD
    assert.equal(evaluator.evalString(`
        let m = true;   // ADD
        let n = false;  // ADD
        if (m) if (n) {1;} else {2;} else {3;}
        `), 2);

    // ADD
    assert.equal(evaluator.evalString(`
        let m = false;  // ADD
        let n = true;   // ADD
        if (m) if (n) {1;} else {2;} else {3;}
        `), 3);

    // ADD
    assert.equal(evaluator.evalString(`
        let m = false;  // ADD
        let n = false;  // ADD
        if (m) if (n) {1;} else {2;} else {3;}
        `), 3);
}

function testIfStatement() {
    testSimpleIfStatement();
    testIfStatementWithBlockStatement();
    testCascadingIfStatement();

    console.log('testIfStatement() passed.');
}

export { testIfStatement };