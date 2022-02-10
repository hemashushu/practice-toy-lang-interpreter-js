/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { strict as assert } from 'assert';

import { Parser } from '../../src/parser.js';

function testSingleVariableDeclaration() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        let x;
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "VariableStatement",
                    "declarations": [
                        {
                            type: 'VariableDeclaration',
                            id: {
                                type: 'Identifier',
                                name: 'x'
                            },
                            init: null
                        }
                    ]
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        let y = 1;
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "VariableStatement",
                    "declarations": [
                        {
                            type: 'VariableDeclaration',
                            id: {
                                type: 'Identifier',
                                name: 'y'
                            },
                            init: {
                                type: 'NumericLiteral',
                                value: 1
                            }
                        }
                    ]
                }
            ]
        }
    );
}

function testMultipleVariableDeclaration() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        let a, b;
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "VariableStatement",
                    "declarations": [
                        {
                            type: 'VariableDeclaration',
                            id: {
                                type: 'Identifier',
                                name: 'a'
                            },
                            init: null
                        },
                        {
                            type: 'VariableDeclaration',
                            id: {
                                type: 'Identifier',
                                name: 'b'
                            },
                            init: null
                        }
                    ]
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        let m, n=2;
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "VariableStatement",
                    "declarations": [
                        {
                            type: 'VariableDeclaration',
                            id: {
                                type: 'Identifier',
                                name: 'm'
                            },
                            init: null
                        },
                        {
                            type: 'VariableDeclaration',
                            id: {
                                type: 'Identifier',
                                name: 'n'
                            },
                            init: {
                                type: 'NumericLiteral',
                                value: 2
                            }
                        }
                    ]
                }
            ]
        }
    );
}

function testVariableDeclarationWithExpressionInitializer() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        let z=x+1;
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
                                "name": "z"
                            },
                            "init": {
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
            ]
        }
    );

}

function testDeclarationStatement() {
    testSingleVariableDeclaration();
    testMultipleVariableDeclaration();
    testVariableDeclarationWithExpressionInitializer();

    console.log('testDeclarationStatement() passed.');
}

export { testDeclarationStatement };