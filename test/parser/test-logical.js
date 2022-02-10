/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { strict as assert } from 'assert';

import { Parser } from '../../src/parser.js';

function testLogicalAnd() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        true && false;
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "LogicalExpression",
                        "operator": "&&",
                        "left": {
                            "type": "BooleanLiteral",
                            "value": true
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
        x>0 && y != 0;
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "LogicalExpression",
                        "operator": "&&",
                        "left": {
                            "type": "BinaryExpression",
                            "operator": ">",
                            "left": {
                                "type": "Identifier",
                                "name": "x"
                            },
                            "right": {
                                "type": "NumericLiteral",
                                "value": 0
                            }
                        },
                        "right": {
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
                }
            ]
        }
    );
}

function testLogicalOr() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        m > n || p == q;
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "LogicalExpression",
                        "operator": "||",
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
                            "type": "BinaryExpression",
                            "operator": "==",
                            "left": {
                                "type": "Identifier",
                                "name": "p"
                            },
                            "right": {
                                "type": "Identifier",
                                "name": "q"
                            }
                        }
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        i && j || x && y;
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "LogicalExpression",
                        "operator": "||",
                        "left": {
                            "type": "LogicalExpression",
                            "operator": "&&",
                            "left": {
                                "type": "Identifier",
                                "name": "i"
                            },
                            "right": {
                                "type": "Identifier",
                                "name": "j"
                            }
                        },
                        "right": {
                            "type": "LogicalExpression",
                            "operator": "&&",
                            "left": {
                                "type": "Identifier",
                                "name": "x"
                            },
                            "right": {
                                "type": "Identifier",
                                "name": "y"
                            }
                        }
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        p = x && y || z;
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
                            "type": "LogicalExpression",
                            "operator": "||",
                            "left": {
                                "type": "LogicalExpression",
                                "operator": "&&",
                                "left": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "right": {
                                    "type": "Identifier",
                                    "name": "y"
                                }
                            },
                            "right": {
                                "type": "Identifier",
                                "name": "z"
                            }
                        }
                    }
                }
            ]
        }
    );
}

function testLogical() {
    testLogicalAnd();
    testLogicalOr();

    console.log('testLogical() passed.');
}

export { testLogical };