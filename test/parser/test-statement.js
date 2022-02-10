/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { strict as assert } from 'assert';

import { Parser } from '../../src/parser.js';

function testSingleStatement() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `555;`), {
        type: 'Program',
        body: [{
            type: 'ExpressionStatement',
            expression: {
                type: 'NumericLiteral',
                value: 555
            }
        }]
    });
}

function testMultiStatements() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        "hello";
        123;
        `), {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'StringLiteral',
                    value: "hello"
                }
            },
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'NumericLiteral',
                    value: 123
                }
            }]
    });
}

function testStatement() {
    testSingleStatement();
    testMultiStatements();

    console.log('testStatement() passed.');
}

export { testStatement };