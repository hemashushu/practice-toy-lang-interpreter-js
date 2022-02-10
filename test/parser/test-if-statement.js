/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */


import { strict as assert } from 'assert';

import { Parser } from '../../src/parser.js';

function testSimpleIfStatement() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        if (x) a=0;
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "IfStatement",
                    "test": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "consequent": {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "AssignmentExpression",
                            "operator": "=",
                            "left": {
                                "type": "Identifier",
                                "name": "a"
                            },
                            "right": {
                                "type": "NumericLiteral",
                                "value": 0
                            }
                        }
                    },
                    "alternate": null
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        if (x)
            a = 0;
        else
            a = 1;
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "IfStatement",
                    "test": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "consequent": {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "AssignmentExpression",
                            "operator": "=",
                            "left": {
                                "type": "Identifier",
                                "name": "a"
                            },
                            "right": {
                                "type": "NumericLiteral",
                                "value": 0
                            }
                        }
                    },
                    "alternate": {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "AssignmentExpression",
                            "operator": "=",
                            "left": {
                                "type": "Identifier",
                                "name": "a"
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

function testIfStatementWithBlockStatement() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        if (x) {
            a=0;
        }
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "IfStatement",
                    "test": {
                        type: 'Identifier',
                        name: 'x'
                    },
                    "consequent": {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'AssignmentExpression',
                                    operator: '=',
                                    left: {
                                        type: 'Identifier',
                                        name: 'a'
                                    },
                                    right: {
                                        type: 'NumericLiteral',
                                        value: 0
                                    }
                                }
                            }
                        ]
                    },
                    "alternate": null
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        if (x) {
            a=0;
        }else {
            a=1;
        }
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "IfStatement",
                    "test": {
                        type: 'Identifier',
                        name: 'x'
                    },
                    "consequent": {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'AssignmentExpression',
                                    operator: '=',
                                    left: {
                                        type: 'Identifier',
                                        name: 'a'
                                    },
                                    right: {
                                        type: 'NumericLiteral',
                                        value: 0
                                    }
                                }
                            }
                        ]
                    },
                    "alternate": {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'AssignmentExpression',
                                    operator: '=',
                                    left: {
                                        type: 'Identifier',
                                        name: 'a'
                                    },
                                    right: {
                                        type: 'NumericLiteral',
                                        value: 1
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

function testCascadingIfStatement() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        if (x)
            if (y)
                2;
            else
                8;
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "IfStatement",
                    "test": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "consequent": {
                        "type": "IfStatement",
                        "test": {
                            "type": "Identifier",
                            "name": "y"
                        },
                        "consequent": {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "NumericLiteral",
                                "value": 2
                            }
                        },
                        "alternate": {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "NumericLiteral",
                                "value": 8
                            }
                        }
                    },
                    "alternate": null
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        if (p){
            1;
        }else if (q) {
            2;
        }
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "IfStatement",
                    "test": {
                        "type": "Identifier",
                        "name": "p"
                    },
                    "consequent": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "NumericLiteral",
                                    "value": 1
                                }
                            }
                        ]
                    },
                    "alternate": {
                        "type": "IfStatement",
                        "test": {
                            "type": "Identifier",
                            "name": "q"
                        },
                        "consequent": {
                            "type": "BlockStatement",
                            "body": [
                                {
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "NumericLiteral",
                                        "value": 2
                                    }
                                }
                            ]
                        },
                        "alternate": null
                    }
                }
            ]
        }
    );

    assert.deepEqual(parser.parse(
        `
        if (m) if (n) {1;} else {2;} else {3;}
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "IfStatement",
                    "test": {
                        "type": "Identifier",
                        "name": "m"
                    },
                    "consequent": {
                        "type": "IfStatement",
                        "test": {
                            "type": "Identifier",
                            "name": "n"
                        },
                        "consequent": {
                            "type": "BlockStatement",
                            "body": [
                                {
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "NumericLiteral",
                                        "value": 1
                                    }
                                }
                            ]
                        },
                        "alternate": {
                            "type": "BlockStatement",
                            "body": [
                                {
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "NumericLiteral",
                                        "value": 2
                                    }
                                }
                            ]
                        }
                    },
                    "alternate": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "NumericLiteral",
                                    "value": 3
                                }
                            }
                        ]
                    }
                }
            ]
        }
    );
}

function testIfStatement() {
    testSimpleIfStatement();
    testIfStatementWithBlockStatement();
    testCascadingIfStatement();

    console.log('testIfStatement() passed.');
}

export { testIfStatement };