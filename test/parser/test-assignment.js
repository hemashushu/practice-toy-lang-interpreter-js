/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { strict as assert } from 'assert';

import { Parser } from '../../src/parser.js';

function testIdentifier() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        i;
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Identifier",
                        "name": "i"
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        x+1;
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
                            "type": "Identifier",
                            "name": "x"
                        },
                        "right": {
                            "type": "NumericLiteral",
                            "value": 1
                        }
                    }
                }
            ]
        }
    );
}

function testSimpleAssignmentExpression() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        x=1;
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
                            "name": "x"
                        },
                        "right": {
                            "type": "NumericLiteral",
                            "value": 1
                        }
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
            x =1+2;
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
                            "name": "x"
                        },
                        "right": {
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
                }

            ]
        }
    );
}

function testComplexAssignmentExpression() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        x+=1;
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "+=",
                        "left": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "right": {
                            "type": "NumericLiteral",
                            "value": 1
                        }
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
            x *= i+2;
            `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "*=",
                        "left": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "right": {
                            "type": "BinaryExpression",
                            "operator": "+",
                            "left": {
                                "type": "Identifier",
                                "name": "i"
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
}

function testChainAssignmentExpression() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        x=y=1;
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
                            "name": "x"
                        },
                        "right": {
                            "type": "AssignmentExpression",
                            "operator": "=",
                            "left": {
                                "type": "Identifier",
                                "name": "y"
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

function testAssignmentExpression() {
    testIdentifier();
    testSimpleAssignmentExpression();
    testComplexAssignmentExpression();
    testChainAssignmentExpression();

    console.log('testAssignmentExpression() passed.');
}

export { testAssignmentExpression };