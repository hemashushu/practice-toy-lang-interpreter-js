/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { strict as assert } from 'assert';

import { Parser } from '../../src/parser.js';

function testSingleLineComment() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        // comment 1
        555; // comment 2
        `), {
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

function testMultiLineComment() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        /**
         * comment
         */
        555 /* "also comment" */ ;
        `), {
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

function testComment() {
    testSingleLineComment();
    testMultiLineComment();

    console.log('testComment() passed.');
}

export { testComment };