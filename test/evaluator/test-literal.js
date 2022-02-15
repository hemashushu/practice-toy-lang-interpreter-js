/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { strict as assert } from 'assert';

import { Evaluator } from "../../src/evaluator.js";

function testNumericLiteral() {
    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        123;
        `), 123);

    assert.equal(evaluator.evalString(`
        2.718;
        `), 2.718);
}

function testStringLiteral() {
    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        "foo";
        `), 'foo');

    assert.equal(evaluator.evalString(`
        "";
        `), "");

    assert.equal(evaluator.evalString(`
        "foo bar";
        `), 'foo bar');

    assert.equal(evaluator.evalString(`
        "foo\\"bar";
        `), 'foo\\"bar'); // todo:: escaped char
}

function testLiteral() {
    testNumericLiteral();
    testStringLiteral();

    console.log('testLiteral() passed.');
}

export { testLiteral };