/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { strict as assert } from 'assert';

import { Parser } from '../src/parser.js';

function testSingleBlockStatement() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        {
            123;
            "foo";
        }
        `), {
        type: 'Program',
        body: [{
            type: 'BlockStatement',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'NumericLiteral',
                    value: 123
                }
            }, {
                type: 'ExpressionStatement',
                expression: {
                    type: 'StringLiteral',
                    value: "foo"
                }
            }]
        }]
    });
}

function testMultiBlockStatements() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        {
            "foo";
        }
        123;
        {
            "bar";
        }
        `), {
        type: 'Program',
        body: [{
            type: 'BlockStatement',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'StringLiteral',
                    value: "foo"
                }
            }]
        }, {
            type: 'ExpressionStatement',
            expression: {
                type: 'NumericLiteral',
                value: 123
            }
        }, {
            type: 'BlockStatement',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'StringLiteral',
                    value: "bar"
                }
            }]
        }]
    });
}

function testNestedBlockStatements() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        {
            "foo";
            {
                123;
            }
            {}
        }
        `), {
        type: 'Program',
        body: [{
            type: 'BlockStatement',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'StringLiteral',
                    value: "foo"
                }
            },
            {
                type: 'BlockStatement',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'NumericLiteral',
                        value: 123
                    }
                }]
            },
            {
                type: 'BlockStatement',
                body: []
            }]
        }]
    });
}

function testEmptyStatement() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        ;
        `), {
        type: 'Program',
        body: [
            {
                type: 'EmptyStatement'
            }
        ]
    });
}

function testEmptyBlockStatement() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        {}
        `), {
        type: 'Program',
        body: [
            {
                type: 'BlockStatement',
                body: []
            }
        ]
    });
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