/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { strict as assert } from 'assert';

import { Parser } from '../../src/parser.js';

function testSimpleClassDeclaration() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        class Animal {

        }
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ClassDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "Animal"
                    },
                    "superClass": null,
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        class Point {
            constructor(x,y) {
                this.x = x;
                this.y = y;
            }

            function calc() {
                return 2;
            }
        }
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ClassDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "Point"
                    },
                    "superClass": null,
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "Constructor",
                                // "name": {
                                //     "type": "Identifier",
                                //     "name": "constructor"
                                // },
                                "params": [
                                    {
                                        "type": "Identifier",
                                        "name": "x"
                                    },
                                    {
                                        "type": "Identifier",
                                        "name": "y"
                                    }
                                ],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "AssignmentExpression",
                                                "operator": "=",
                                                "left": {
                                                    "type": "MemberExpression",
                                                    "computed": false,
                                                    "object": {
                                                        "type": "Identifier",
                                                        "name": "this"
                                                    },
                                                    "property": {
                                                        "type": "Identifier",
                                                        "name": "x"
                                                    }
                                                },
                                                "right": {
                                                    "type": "Identifier",
                                                    "name": "x"
                                                }
                                            }
                                        },
                                        {
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "AssignmentExpression",
                                                "operator": "=",
                                                "left": {
                                                    "type": "MemberExpression",
                                                    "computed": false,
                                                    "object": {
                                                        "type": "Identifier",
                                                        "name": "this"
                                                    },
                                                    "property": {
                                                        "type": "Identifier",
                                                        "name": "y"
                                                    }
                                                },
                                                "right": {
                                                    "type": "Identifier",
                                                    "name": "y"
                                                }
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                "type": "FunctionDeclaration",
                                "name": {
                                    "type": "Identifier",
                                    "name": "calc"
                                },
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
                                            "type": "ReturnStatement",
                                            "argument": {
                                                "type": "NumericLiteral",
                                                "value": 2
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            ]
        }
    );
}

function testInheritedClassDeclaration() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        class Cat extends Animal{

        }
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ClassDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "Cat"
                    },
                    "superClass": {
                        "type": "Identifier",
                        "name": "Animal"
                    },
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        class Point3D extends Point {
            constructor(x,y,z) {
                super(x,y);
            }

            function calc() {
                return super.calc() + 1;
            }
        }
        `),

        {
            "type": "Program",
            "body": [
                {
                    "type": "ClassDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "Point3D"
                    },
                    "superClass": {
                        "type": "Identifier",
                        "name": "Point"
                    },
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "Constructor",
                                // "name": {
                                //     "type": "Identifier",
                                //     "name": "constructor"
                                // },
                                "params": [
                                    {
                                        "type": "Identifier",
                                        "name": "x"
                                    },
                                    {
                                        "type": "Identifier",
                                        "name": "y"
                                    },
                                    {
                                        "type": "Identifier",
                                        "name": "z"
                                    }
                                ],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "CallExpression",
                                                "callee": {
                                                    "type": "Identifier",
                                                    "name": "super"
                                                },
                                                "arguments": [
                                                    {
                                                        "type": "Identifier",
                                                        "name": "x"
                                                    },
                                                    {
                                                        "type": "Identifier",
                                                        "name": "y"
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                "type": "FunctionDeclaration",
                                "name": {
                                    "type": "Identifier",
                                    "name": "calc"
                                },
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
                                            "type": "ReturnStatement",
                                            "argument": {
                                                "type": "BinaryExpression",
                                                "operator": "+",
                                                "left": {
                                                    "type": "CallExpression",
                                                    "callee": {
                                                        "type": "MemberExpression",
                                                        "computed": false,
                                                        "object": {
                                                            "type": "Identifier",
                                                            "name": "super"
                                                        },
                                                        "property": {
                                                            "type": "Identifier",
                                                            "name": "calc"
                                                        }
                                                    },
                                                    "arguments": []
                                                },
                                                "right": {
                                                    "type": "NumericLiteral",
                                                    "value": 1
                                                }
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            ]
        }
    );
}

function testClassDeclaration() {
    testSimpleClassDeclaration();
    testInheritedClassDeclaration();

    console.log('testClassDeclaration() passed.');
}

export { testClassDeclaration };