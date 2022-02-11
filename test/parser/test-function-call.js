/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { strict as assert } from 'assert';

import { Parser } from '../../src/parser.js';

function testSimpleFunctionCall() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        nop();
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    expression: {
                        type: 'CallExpression',
                        callee: {   // callee 即 “被调用者”
                            type: 'Identifier',
                            name: 'nop'
                        },
                        arguments: [
                            //
                        ]
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        print(s, 1);
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    expression: {
                        type: 'CallExpression',
                        callee: {   // callee 即 “被调用者”
                            type: 'Identifier',
                            name: 'print'
                        },
                        arguments: [
                            {
                                type: 'Identifier',
                                name: 's'
                            }, {
                                type: 'NumericLiteral',
                                value: 1
                            }
                        ]
                    }
                }
            ]
        }
    );
}

function testComplexFunctionCall() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        console.log(a[1]);
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    expression: {
                        type: 'CallExpression',
                        callee: {   // callee 即 “被调用者”
                            type: 'MemberExpression',
                            computed: false,
                            object: {
                                type: 'Identifier',
                                name: 'console'
                            },
                            property: {
                                type: 'Identifier',
                                name: 'log'
                            }
                        },
                        arguments: [
                            {
                                type: 'MemberExpression',
                                computed: true,
                                object: {
                                    type: 'Identifier',
                                    name: 'a'
                                },
                                property: {
                                    type: 'NumericLiteral',
                                    value: 1
                                }
                            }
                        ]
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        user.name.slice(0);
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
                                "type": "MemberExpression",
                                "computed": false,
                                "object": {
                                    "type": "Identifier",
                                    "name": "user"
                                },
                                "property": {
                                    "type": "Identifier",
                                    "name": "name"
                                }
                            },
                            "property": {
                                "type": "Identifier",
                                "name": "slice"
                            }
                        },
                        "arguments": [
                            {
                                "type": "NumericLiteral",
                                "value": 0
                            }
                        ]
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        print(add(1,2));
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    expression: {
                        type: 'CallExpression',
                        callee: {   // callee 即 “被调用者”
                            type: 'Identifier',
                            name: 'print'
                        },
                        arguments: [
                            {
                                type: 'CallExpression',
                                callee: {
                                    type: 'Identifier',
                                    name: 'add'
                                },
                                arguments: [
                                    {
                                        type: 'NumericLiteral',
                                        value: 1
                                    },
                                    {
                                        type: 'NumericLiteral',
                                        value: 2
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        inc(1)(2);
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'CallExpression',
                            callee: {   // callee 即 “被调用者”
                                type: 'Identifier',
                                name: 'inc'
                            },
                            arguments: [{
                                type: 'NumericLiteral',
                                value: 1
                            }]
                        },
                        arguments: [{
                            type: 'NumericLiteral',
                            value: 2
                        }]
                    }
                }
            ]
        }
    );
}

function testFunctionCall() {
    testSimpleFunctionCall();
    testComplexFunctionCall();

    console.log('testFunctionCall() passed.');
}

export { testFunctionCall };