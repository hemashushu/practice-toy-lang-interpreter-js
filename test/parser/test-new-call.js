/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */


import { strict as assert } from 'assert';

import { Parser } from '../../src/parser.js';

function testSimpleNewCall() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        new Foo();
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "NewExpression",
                        "callee": {
                            "type": "Identifier",
                            "name": "Foo"
                        },
                        "arguments": []
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        new Foo(1);
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "NewExpression",
                        "callee": {
                            "type": "Identifier",
                            "name": "Foo"
                        },
                        "arguments": [
                            {
                                "type": "NumericLiteral",
                                "value": 1
                            }
                        ]
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        let f = new Foo(1);
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "VariableStatement",
                    "declarations": [
                        {
                            "type": "VariableDeclaration",
                            "id": {
                                "type": "Identifier",
                                "name": "f"
                            },
                            "init": {
                                "type": "NewExpression",
                                "callee": {
                                    "type": "Identifier",
                                    "name": "Foo"
                                },
                                "arguments": [
                                    {
                                        "type": "NumericLiteral",
                                        "value": 1
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    );
}

function testComplexNewCall() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        new Foo.bar(1);     // -> new (Foo.bar)(1)
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "NewExpression",
                        "callee": {
                            "type": "MemberExpression",
                            "computed": false,
                            "object": {
                                "type": "Identifier",
                                "name": "Foo"
                            },
                            "property": {
                                "type": "Identifier",
                                "name": "bar"
                            }
                        },
                        "arguments": [
                            {
                                "type": "NumericLiteral",
                                "value": 1
                            }
                        ]
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        new Foo(1).bar(2); // -> (new Foo(1)).bar(2)
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "CallExpression",
                        "callee": {
                            "type": "MemberExpression",
                            "computed": false,
                            "object": {
                                "type": "NewExpression",
                                "callee": {
                                    "type": "Identifier",
                                    "name": "Foo"
                                },
                                "arguments": [
                                    {
                                        "type": "NumericLiteral",
                                        "value": 1
                                    }
                                ]
                            },
                            "property": {
                                "type": "Identifier",
                                "name": "bar"
                            }
                        },
                        "arguments": [
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
        new new Foo(1).bar(2); // -> (new (new Foo(1)).bar)(2)
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "NewExpression",
                        "callee": {
                            "type": "MemberExpression",
                            "computed": false,
                            "object": {
                                "type": "NewExpression",
                                "callee": {
                                    "type": "Identifier",
                                    "name": "Foo"
                                },
                                "arguments": [
                                    {
                                        "type": "NumericLiteral",
                                        "value": 1
                                    }
                                ]
                            },
                            "property": {
                                "type": "Identifier",
                                "name": "bar"
                            }
                        },
                        "arguments": [
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
}

function testNewCall() {
    testSimpleNewCall();
    testComplexNewCall();

    console.log('testNewCall() passed.');
}

export { testNewCall };