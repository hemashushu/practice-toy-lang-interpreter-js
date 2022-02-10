/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */


import { strict as assert } from 'assert';

import { Parser } from '../../src/parser.js';

function testDotMember() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        a.b;
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "MemberExpression",
                        "computed": false,  // 点成员 = false, 中括号 = true
                        "object": {
                            "type": "Identifier",
                            "name": "a"
                        },
                        "property": {
                            "type": "Identifier",
                            "name": "b"
                        }
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        x.y = 1;
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        type: 'AssignmentExpression',
                        operator: '=',
                        left: {
                            "type": "MemberExpression",
                            "computed": false, // 点成员 = false, 中括号 = true
                            "object": {
                                "type": "Identifier",
                                "name": "x"
                            },
                            "property": {
                                "type": "Identifier",
                                "name": "y"
                            }
                        },
                        right: {
                            type: 'NumericLiteral',
                            value: 1
                        }
                    }
                }
            ]
        }
    );
}

function testBracketMember() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        a[1];
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "MemberExpression",
                        "computed": true,  // 点成员 = false, 中括号 = true
                        "object": {
                            "type": "Identifier",
                            "name": "a"
                        },
                        "property": {
                            "type": "NumericLiteral",
                            value: 1
                        }
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        x[y*2] = 1;
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        type: 'AssignmentExpression',
                        operator: '=',
                        left: {
                            "type": "MemberExpression",
                            "computed": true, // 点成员 = false, 中括号 = true
                            "object": {
                                "type": "Identifier",
                                "name": "x"
                            },
                            "property": {
                                type: 'BinaryExpression',
                                operator: '*',
                                left: {
                                    "type": "Identifier",
                                    "name": "y"
                                },
                                right: {
                                    type: 'NumericLiteral',
                                    value: 2
                                }
                            }
                        },
                        right: {
                            type: 'NumericLiteral',
                            value: 1
                        }
                    }
                }
            ]
        }
    );
}

function testChain() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        a.b.c[1];
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "MemberExpression",
                        "computed": true,  // 点成员 = false, 中括号 = true
                        "object": {
                            "type": "MemberExpression",
                            "computed": false,  // 点成员 = false, 中括号 = true
                            "object": {
                                "type": "MemberExpression",
                                "computed": false,  // 点成员 = false, 中括号 = true
                                "object": {
                                    "type": "Identifier",
                                    "name": "a"
                                },
                                "property": {
                                    "type": "Identifier",
                                    "name": "b"
                                }
                            },
                            "property": {
                                "type": "Identifier",
                                "name": "c"
                            }
                        },
                        "property": {
                            "type": "NumericLiteral",
                            value: 1
                        }
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        x.y[0].z;
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "MemberExpression",
                        "computed": false,
                        "object": {
                            "type": "MemberExpression",
                            "computed": true,
                            "object": {
                                "type": "MemberExpression",
                                "computed": false,
                                "object": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "property": {
                                    "type": "Identifier",
                                    "name": "y"
                                }
                            },
                            "property": {
                                "type": "NumericLiteral",
                                "value": 0
                            }
                        },
                        "property": {
                            "type": "Identifier",
                            "name": "z"
                        }
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        x[1][2];
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "MemberExpression",
                        "computed": true,  // 点成员 = false, 中括号 = true
                        "object": {
                            "type": "MemberExpression",
                            "computed": true,  // 点成员 = false, 中括号 = true
                            "object": {
                                "type": "Identifier",
                                "name": "x"
                            },
                            "property": {
                                "type": "NumericLiteral",
                                "value": 1
                            }
                        },
                        "property": {
                            "type": "NumericLiteral",
                            "value": 2
                        }
                    }
                }
            ]
        }
    );
}

function testMember() {
    testDotMember();
    testBracketMember();
    testChain();

    console.log('testMember() passed.');
}

export { testMember };