/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { strict as assert } from 'assert';

import { Parser } from '../../src/parser.js';

function testSimpleFunctionDeclaration() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        def double(x) {
            return x*2;
        }
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "name": {
                        type: 'Identifier',
                        name: 'double'
                    },
                    params: [
                        {
                            type: 'Identifier',
                            name: 'x'
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ReturnStatement',
                            argument: {
                                "type": "BinaryExpression",
                                "operator": "*",
                                left: {
                                    type: 'Identifier',
                                    name: 'x'
                                },
                                right: {
                                    type: 'NumericLiteral',
                                    value: 2
                                }
                            }
                        }]
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        def add(m,n) {
            return;
        }
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "name": {
                        type: 'Identifier',
                        name: 'add'
                    },
                    params: [
                        {
                            type: 'Identifier',
                            name: 'm'
                        },
                        {
                            type: 'Identifier',
                            name: 'n'
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ReturnStatement',
                            argument: null
                        }]
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        def empty() {
            //
        }
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "name": {
                        type: 'Identifier',
                        name: 'empty'
                    },
                    params: [
                        //
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [
                            //
                        ]
                    }
                }
            ]
        }
    );
}

function testFunctionDeclaration() {
    testSimpleFunctionDeclaration();

    console.log('testFunctionDeclaration() passed.');
}

export { testFunctionDeclaration };