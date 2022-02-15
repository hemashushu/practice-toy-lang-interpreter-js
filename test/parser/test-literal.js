/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { strict as assert } from 'assert';

import { Parser } from '../../src/parser.js';

function testNumericLiteral() {
    let parser = new Parser();

    assert.deepEqual(parser.parse('123;'), {
        type: 'Program',
        body: [{
            type: 'ExpressionStatement',
            expression:
            {
                type: 'NumericLiteral',
                value: 123
            }
        }]
    });

    assert.deepEqual(parser.parse('2.718;'), {
        type: 'Program',
        body: [{
            type: 'ExpressionStatement',
            expression:
            {
                type: 'NumericLiteral',
                value: 2.718
            }
        }]
    });
}

function testStringLiteral() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(`"foo";`), {
        type: 'Program',
        body: [{
            type: 'ExpressionStatement',
            expression: {
                type: 'StringLiteral',
                value: "foo"
            }
        }]
    });

    assert.deepEqual(parser.parse(`"";`), {
        type: 'Program',
        body: [{
            type: 'ExpressionStatement',
            expression: {
                type: 'StringLiteral',
                value: ""
            }
        }]
    });

    assert.deepEqual(parser.parse('"foo bar";'), {
        type: 'Program',
        body: [{
            type: 'ExpressionStatement',
            expression: {
                type: 'StringLiteral',
                value: 'foo bar'
            }
        }]
    });

    assert.deepEqual(parser.parse('"foo\\"bar";'), {
        type: 'Program',
        body: [{
            type: 'ExpressionStatement',
            expression: {
                type: 'StringLiteral',
                value: 'foo\\"bar' // todo:: escaped char
            }
        }]
    });
}

function testLiteral() {
    testNumericLiteral();
    testStringLiteral();

    console.log('testLiteral() passed.');
}

export { testLiteral };