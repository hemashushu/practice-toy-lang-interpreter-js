/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { strict as assert } from 'assert';

import { Parser } from '../../src/parser.js';

function testUnaryNot() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        !false;
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "UnaryExpression",
                        "operator": "!",
                        "argument": {
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
        !m;
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "UnaryExpression",
                        "operator": "!",
                        "argument": {
                            "type": "Identifier",
                            "name": "m"
                        }
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        !(a>b);
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "UnaryExpression",
                        "operator": "!",
                        "argument": {
                            "type": "BinaryExpression",
                            "operator": ">",
                            "left": {
                                "type": "Identifier",
                                "name": "a"
                            },
                            "right": {
                                "type": "Identifier",
                                "name": "b"
                            }
                        }
                    }
                }
            ]
        }
    );
}

function testUnaryNegative() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        -x;
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "UnaryExpression",
                        "operator": "-",
                        "argument": {
                            "type": "Identifier",
                            "name": "x"
                        }
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        +123;
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "UnaryExpression",
                        "operator": "+",
                        "argument": {
                            "type": "NumericLiteral",
                            "value": 123
                        }
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        -(y+10);
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "UnaryExpression",
                        "operator": "-",
                        "argument": {
                            "type": "BinaryExpression",
                            "operator": "+",
                            "left": {
                                "type": "Identifier",
                                "name": "y"
                            },
                            "right": {
                                "type": "NumericLiteral",
                                "value": 10
                            }
                        }
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        5+-2;
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "BinaryExpression",
                        "operator": "+",
                        "left": {
                            "type": "NumericLiteral",
                            "value": 5
                        },
                        "right": {
                            "type": "UnaryExpression",
                            "operator": "-",
                            "argument": {
                                "type": "NumericLiteral",
                                "value": 2
                            }
                        }
                    }
                }
            ]
        }
    );
}

function testUnaryChain() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        !-x;
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "UnaryExpression",
                        "operator": "!",
                        "argument": {
                            "type": "UnaryExpression",
                            "operator": "-",
                            "argument": {
                                "type": "Identifier",
                                "name": "x"
                            }
                        }
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        !!false;
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "UnaryExpression",
                        "operator": "!",
                        "argument": {
                            "type": "UnaryExpression",
                            "operator": "!",
                            "argument": {
                                "type": "BooleanLiteral",
                                "value": false
                            }
                        }
                    }
                }
            ]
        }
    );
}

function testUnary() {
    testUnaryNot();
    testUnaryNegative();
    testUnaryChain();

    console.log('testUnary() passed.');
}

export { testUnary };