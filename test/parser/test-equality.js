/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { strict as assert } from 'assert';

import { Parser } from '../../src/parser.js';

function testSimpleEqualityExpression() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        x == true;
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "BinaryExpression",
                        "operator": "==",
                        "left": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "right": {
                            "type": "BooleanLiteral",
                            "value": true
                        }
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        y != 0;
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "BinaryExpression",
                        "operator": "!=",
                        "left": {
                            "type": "Identifier",
                            "name": "y"
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
}

function testComplexEqualityExpression() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        m > n == false;
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "BinaryExpression",
                        "operator": "==",
                        "left": {
                            "type": "BinaryExpression",
                            "operator": ">",
                            "left": {
                                "type": "Identifier",
                                "name": "m"
                            },
                            "right": {
                                "type": "Identifier",
                                "name": "n"
                            }
                        },
                        "right": {
                            "type": "BooleanLiteral",
                            "value": false
                        }
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        i + 1 == j < 2;
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "BinaryExpression",
                        "operator": "==",
                        "left": {
                            "type": "BinaryExpression",
                            "operator": "+",
                            "left": {
                                "type": "Identifier",
                                "name": "i"
                            },
                            "right": {
                                "type": "NumericLiteral",
                                "value": 1
                            }
                        },
                        "right": {
                            "type": "BinaryExpression",
                            "operator": "<",
                            "left": {
                                "type": "Identifier",
                                "name": "j"
                            },
                            "right": {
                                "type": "NumericLiteral",
                                "value": 2
                            }
                        }
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        p = q * 3 != 6;
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
                            "name": "p"
                        },
                        "right": {
                            "type": "BinaryExpression",
                            "operator": "!=",
                            "left": {
                                "type": "BinaryExpression",
                                "operator": "*",
                                "left": {
                                    "type": "Identifier",
                                    "name": "q"
                                },
                                "right": {
                                    "type": "NumericLiteral",
                                    "value": 3
                                }
                            },
                            "right": {
                                "type": "NumericLiteral",
                                "value": 6
                            }
                        }
                    }
                }
            ]
        }
    );
}

function testEquality() {
    testSimpleEqualityExpression();
    testComplexEqualityExpression();

    console.log('testEquality() passed.');
}

export { testEquality };