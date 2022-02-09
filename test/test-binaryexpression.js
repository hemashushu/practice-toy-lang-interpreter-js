/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { strict as assert } from 'assert';

import { Parser } from '../src/parser.js';

function testAdditiveExpression() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        1+2;
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
                            "value": 1
                        },
                        "right": {
                            "type": "NumericLiteral",
                            "value": 2
                        }
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        1+2+3;
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
                            "type": "BinaryExpression",
                            "operator": "+",
                            "left": {
                                "type": "NumericLiteral",
                                "value": 1
                            },
                            "right": {
                                "type": "NumericLiteral",
                                "value": 2
                            }
                        },
                        "right": {
                            "type": "NumericLiteral",
                            "value": 3
                        }
                    }
                }
            ]
        }
    );
}

function testMultiplicativeExpression() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        1*2;
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "BinaryExpression",
                        "operator": "*",
                        "left": {
                            "type": "NumericLiteral",
                            "value": 1
                        },
                        "right": {
                            "type": "NumericLiteral",
                            "value": 2
                        }
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        1+2*3;
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
                            "value": 1
                        },
                        "right": {
                            "type": "BinaryExpression",
                            "operator": "*",
                            "left": {
                                "type": "NumericLiteral",
                                "value": 2
                            },
                            "right": {
                                "type": "NumericLiteral",
                                "value": 3
                            }
                        },
                    }
                }
            ]
        }
    );
}

function testParenthesizedExpression() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        (1+2)*3;
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "BinaryExpression",
                        "operator": "*",
                        "left": {
                            "type": "BinaryExpression",
                            "operator": "+",
                            "left": {
                                "type": "NumericLiteral",
                                "value": 1
                            },
                            "right": {
                                "type": "NumericLiteral",
                                "value": 2
                            }
                        },
                        "right": {
                            "type": "NumericLiteral",
                            "value": 3
                        },
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
            1+(2+3)+4;
            `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        type: "BinaryExpression",
                        operator: '+',
                        left: {
                            "type": "BinaryExpression",
                            "operator": "+",
                            "left": {
                                "type": "NumericLiteral",
                                "value": 1
                            },
                            "right": {
                                "type": "BinaryExpression",
                                "operator": "+",
                                "left": {
                                    "type": "NumericLiteral",
                                    "value": 2
                                },
                                "right": {
                                    "type": "NumericLiteral",
                                    "value": 3
                                }
                            },

                        },
                        right: {
                            type: 'NumericLiteral',
                            value: 4
                        }
                    }
                }
            ]
        }
    );
}

function testBinaryExpression() {
    testAdditiveExpression();
    testMultiplicativeExpression();
    testParenthesizedExpression();

    console.log('testBinaryExpression() passed.');
}

export { testBinaryExpression };