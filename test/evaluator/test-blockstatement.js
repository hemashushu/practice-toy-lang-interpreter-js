/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { strict as assert } from 'assert';

import { Evaluator } from "../../src/evaluator.js";

function testSingleBlockStatement() {
    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        {
            123;
            "foo";
        }
        `), 'foo');
}

function testMultiBlockStatements() {
    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        {
            "foo";
        }
        123;
        {
            "bar";
        }
        `), 'bar');
}

function testNestedBlockStatements() {
    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        {
            "foo";
            {
                123;
            }
        }
        `), 123);
}

function testEmptyStatement() {
    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        123;
        ;
        `), null);
}

function testEmptyBlockStatement() {
    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        {}
        `), null);
}

function testBlockStatement() {
    testSingleBlockStatement();
    testMultiBlockStatements();
    testNestedBlockStatements();

    testEmptyStatement();
    testEmptyBlockStatement();

    console.log('testBlockStatement() passed.');
}

export { testBlockStatement };