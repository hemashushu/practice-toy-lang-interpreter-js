/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { strict as assert } from 'assert';

import { Parser } from '../../src/parser.js';

function testSimpleMap() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        #{a:b};
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Map",
                        "entries": [
                            {
                                type: 'MapEntry',
                                "key": {
                                    "type": "Identifier",
                                    "name": "a"
                                },
                                "value": {
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

    assert.deepEqual(parser.parse(
        `
        #{"foo":1, "bar": true,};
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Map",
                        "entries": [
                            {
                                type: 'MapEntry',
                                "key": {
                                    "type": "StringLiteral",
                                    "value": "foo"
                                },
                                "value": {
                                    "type": "NumericLiteral",
                                    "value": 1
                                }
                            },
                            {
                                type: 'MapEntry',
                                "key": {
                                    "type": "StringLiteral",
                                    "value": "bar"
                                },
                                "value": {
                                    "type": "BooleanLiteral",
                                    "value": true
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
        #{"a": 1 + 2, "b": sqrt(4),};
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Map",
                        "entries": [
                            {
                                type: 'MapEntry',
                                "key": {
                                    "type": "StringLiteral",
                                    "value": "a"
                                },
                                "value": {
                                    "type": "BinaryExpression",
                                    operator: '+',
                                    left: {
                                        type: 'NumericLiteral',
                                        value: 1
                                    },
                                    right: {
                                        type: 'NumericLiteral',
                                        value: 2
                                    }
                                }
                            },
                            {
                                type: 'MapEntry',
                                "key": {
                                    "type": "StringLiteral",
                                    "value": "b"
                                },
                                "value": {
                                    "type": "CallExpression",
                                    "callee": {
                                        type: 'Identifier',
                                        name: 'sqrt'
                                    },
                                    "arguments": [
                                        {
                                            type: 'NumericLiteral',
                                            value: 4
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

function testNestedMap() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        #{"a":1, "b":#{"foo":true}};      // nested map
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Map",
                        "entries": [
                            {
                                type: 'MapEntry',
                                "key": {
                                    "type": "StringLiteral",
                                    "value": "a"
                                },
                                "value": {
                                    "type": "NumericLiteral",
                                    "value": 1
                                }
                            },
                            {
                                type: 'MapEntry',
                                "key": {
                                    "type": "StringLiteral",
                                    "value": "b"
                                },
                                "value": {
                                    "type": "Map",
                                    "entries": [
                                        {
                                            type: 'MapEntry',
                                            "key": {
                                                "type": "StringLiteral",
                                                "value": "foo"
                                            },
                                            "value": {
                                                "type": "BooleanLiteral",
                                                "value": true
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

function testMapWithTuple() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        #{"foo":1, "bar": (a, b),};
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Map",
                        "entries": [
                            {
                                type: 'MapEntry',
                                "key": {
                                    "type": "StringLiteral",
                                    "value": "foo"
                                },
                                "value": {
                                    "type": "NumericLiteral",
                                    "value": 1
                                }
                            },
                            {
                                type: 'MapEntry',
                                "key": {
                                    "type": "StringLiteral",
                                    "value": "bar"
                                },
                                "value": {
                                    "type": "Tuple",
                                    elements: [
                                        {
                                            type: 'Identifier',
                                            name: 'a'
                                        },
                                        {
                                            type: 'Identifier',
                                            name: 'b'
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

    assert.deepEqual(parser.parse(
        `
        (a, #{"foo":1, "bar": 2},);
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression":
                    {
                        "type": "Tuple",
                        elements: [
                            {
                                type: 'Identifier',
                                name: 'a'
                            },
                            {
                                "type": "Map",
                                "entries": [
                                    {
                                        type: 'MapEntry',
                                        "key": {
                                            "type": "StringLiteral",
                                            "value": "foo"
                                        },
                                        "value": {
                                            "type": "NumericLiteral",
                                            "value": 1
                                        }
                                    },
                                    {
                                        type: 'MapEntry',
                                        "key": {
                                            "type": "StringLiteral",
                                            "value": "bar"
                                        },
                                        "value": {
                                            "type": "NumericLiteral",
                                            "value": 2
                                        }
                                    }
                                ]
                            }
                        ]
                    }

                }
            ]
        }
    );
}

function testMapWithList() {
    let parser = new Parser();

    assert.deepEqual(parser.parse(
        `
        #{"foo":1, "bar": [a, b],};
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Map",
                        "entries": [
                            {
                                type: 'MapEntry',
                                "key": {
                                    "type": "StringLiteral",
                                    "value": "foo"
                                },
                                "value": {
                                    "type": "NumericLiteral",
                                    "value": 1
                                }
                            },
                            {
                                type: 'MapEntry',
                                "key": {
                                    "type": "StringLiteral",
                                    "value": "bar"
                                },
                                "value": {
                                    "type": "List",
                                    elements: [
                                        {
                                            type: 'Identifier',
                                            name: 'a'
                                        },
                                        {
                                            type: 'Identifier',
                                            name: 'b'
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

    assert.deepEqual(parser.parse(
        `
        [a, #{"foo":1, "bar": 2},];
        `),
        {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression":
                    {
                        "type": "List",
                        elements: [
                            {
                                type: 'Identifier',
                                name: 'a'
                            },
                            {
                                "type": "Map",
                                "entries": [
                                    {
                                        type: 'MapEntry',
                                        "key": {
                                            "type": "StringLiteral",
                                            "value": "foo"
                                        },
                                        "value": {
                                            "type": "NumericLiteral",
                                            "value": 1
                                        }
                                    },
                                    {
                                        type: 'MapEntry',
                                        "key": {
                                            "type": "StringLiteral",
                                            "value": "bar"
                                        },
                                        "value": {
                                            "type": "NumericLiteral",
                                            "value": 2
                                        }
                                    }
                                ]
                            }
                        ]
                    }

                }
            ]
        }
    );
}

function testMap() {
    testSimpleMap();
    testNestedMap();
    testMapWithTuple();

    console.log('testMap() passed.');
}

export { testMap };