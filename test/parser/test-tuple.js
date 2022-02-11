/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { strict as assert } from 'assert';

import { Parser } from '../../src/parser.js';

function testTuple() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        (1,2);
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Tuple",
                        "elements": [
                            {
                                "type": "NumericLiteral",
                                "value": 1
                            },
                            {
                                "type": "NumericLiteral",
                                "value": 2
                            }
                        ]
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        (3,);   // single element tuple
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Tuple",
                        "elements": [
                            {
                                "type": "NumericLiteral",
                                "value": 3
                            }
                        ]
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        ("a","b",); // the last seperator is allowed
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Tuple",
                        "elements": [
                            {
                                "type": "StringLiteral",
                                "value": "a"
                            },
                            {
                                "type": "StringLiteral",
                                "value": "b"
                            }
                        ]
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        ();     // empty tuple
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Tuple",
                        "elements": [
                            //
                        ]
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        (4+5, "foo");
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Tuple",
                        "elements": [
                            {
                                type: 'BinaryExpression',
                                operator: '+',
                                left: {
                                    "type": "NumericLiteral",
                                    "value": 4
                                },
                                right: {
                                    "type": "NumericLiteral",
                                    "value": 5
                                }
                            },
                            {
                                "type": "StringLiteral",
                                "value": "foo"
                            }
                        ]
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        (6,(7,8));      // nested tuple
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Tuple",
                        "elements": [
                            {
                                "type": "NumericLiteral",
                                "value": 6
                            },
                            {
                                "type": "Tuple",
                                "elements": [
                                    {
                                        "type": "NumericLiteral",
                                        "value": 7
                                    },
                                    {
                                        "type": "NumericLiteral",
                                        "value": 8
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    );

    console.log('testTuple() passed.');
}

export { testTuple };