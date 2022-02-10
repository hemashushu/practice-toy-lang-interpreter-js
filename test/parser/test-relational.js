/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { strict as assert } from 'assert';

import { Parser } from '../../src/parser.js';

function testSingleRelationalExpression() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        x>0;
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "BinaryExpression",
                        "operator": ">",
                        "left": {
                            "type": "Identifier",
                            "name": 'x'
                        },
                        "right": {
                            "type": "NumericLiteral",
                            "value": 0
                        }
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        y+1>9;
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "BinaryExpression",
                        "operator": ">",
                        "left": {
                            "type": "BinaryExpression",
                            "operator": "+",
                            "left": {
                                "type": "Identifier",
                                "name": "y"
                            },
                            "right": {
                                "type": "NumericLiteral",
                                "value": 1
                            }
                        },
                        "right": {
                            "type": "NumericLiteral",
                            "value": 9
                        }
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        z=i>1;
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "Identifier",
                            "name": "z"
                        },
                        "right": {
                            "type": "BinaryExpression",
                            "operator": ">",
                            "left": {
                                "type": "Identifier",
                                "name": "i"
                            },
                            "right": {
                                "type": "NumericLiteral",
                                "value": 1
                            }
                        }
                    }
                }
            ]
        }
    );
}

function testRelationalExpressionWithinIfStatement() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        if (x<=0){
            1;
        }
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "IfStatement",
                    "test": {
                        "type": "BinaryExpression",
                        "operator": "<=",
                        "left": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "right": {
                            "type": "NumericLiteral",
                            "value": 0
                        }
                    },
                    "consequent": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "NumericLiteral",
                                    "value": 1
                                }
                            }
                        ]
                    },
                    "alternate": null
                }
            ]
        }
    );
}

function testRelational() {
    testSingleRelationalExpression();
    testRelationalExpressionWithinIfStatement();

    console.log('testRelational() passed.');
}

export { testRelational };