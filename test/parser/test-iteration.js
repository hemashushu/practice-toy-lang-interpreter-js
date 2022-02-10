/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { strict as assert } from 'assert';

import { Parser } from '../../src/parser.js';

function testWhileStatement() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        while(x>10) {
            x -=1;
        }
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "WhileStatement",
                    "test": {
                        "type": "BinaryExpression",
                        "operator": ">",
                        "left": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "right": {
                            "type": "NumericLiteral",
                            "value": 10
                        }
                    },
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "AssignmentExpression",
                                    "operator": "-=",
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
                }
            ]
        }
    );
}

function testDoWhileStatement() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        do{
            x+=1;
        }while(x<10);
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "DoWhileStatement",
                    "test": {
                        "type": "BinaryExpression",
                        "operator": "<",
                        "left": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "right": {
                            "type": "NumericLiteral",
                            "value": 10
                        }
                    },
                    "body": {
                        "type": "BlockStatement",
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
                }
            ]
        }
    );
}

function testForStatement() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        for(let i =0;i<10;i+=1) {
            x+=i;
        }
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ForStatement",
                    "init": {
                        "type": "VariableStatement",
                        "declarations": [
                            {
                                "type": "VariableDeclaration",
                                "id": {
                                    "type": "Identifier",
                                    "name": "i"
                                },
                                "init": {
                                    "type": "NumericLiteral",
                                    "value": 0
                                }
                            }
                        ]
                    },
                    "test": {
                        "type": "BinaryExpression",
                        "operator": "<",
                        "left": {
                            "type": "Identifier",
                            "name": "i"
                        },
                        "right": {
                            "type": "NumericLiteral",
                            "value": 10
                        }
                    },
                    "update": {
                        "type": "AssignmentExpression",
                        "operator": "+=",
                        "left": {
                            "type": "Identifier",
                            "name": "i"
                        },
                        "right": {
                            "type": "NumericLiteral",
                            "value": 1
                        }
                    },
                    "body": {
                        "type": "BlockStatement",
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
                                        "type": "Identifier",
                                        "name": "i"
                                    }
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
        for(i =5;i<10;) {
            a;
        }
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ForStatement",
                    "init": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "Identifier",
                            "name": "i"
                        },
                        "right": {
                            "type": "NumericLiteral",
                            "value": 5
                        }
                    },
                    "test": {
                        "type": "BinaryExpression",
                        "operator": "<",
                        "left": {
                            "type": "Identifier",
                            "name": "i"
                        },
                        "right": {
                            "type": "NumericLiteral",
                            "value": 10
                        }
                    },
                    "update": null,
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "Identifier",
                                    "name": "a"
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
        for(;;) {
            b;
        }
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ForStatement",
                    "init": null,
                    "test": null,
                    "update": null,
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "Identifier",
                                    "name": "b"
                                }
                            }
                        ]
                    }
                }
            ]
        }
    );
}

function testIteration() {
    testWhileStatement();
    testDoWhileStatement();
    testForStatement();

    console.log('testIteration() passed.');
}

export { testIteration };