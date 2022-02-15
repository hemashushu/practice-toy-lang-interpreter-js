/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { strict as assert } from 'assert';

import { Evaluator } from "../../src/evaluator.js";

function testSimpleClass() {
    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        class Num {
        }

        let a = new Num();
        a != null;
        `), true);

    assert.equal(evaluator.evalString(`
        class Num {
            let val;

            constructor(this) {
                this.val = 1;
            }
        }

        let a = new Num();
        a.val;
        `), 1);

    assert.equal(evaluator.evalString(`
        class Num {
            let val;

            constructor(this, x) {
                this.val = x;
            }
        }

        let a = new Num(2);
        a.val;
        `), 2);

    assert.equal(evaluator.evalString(`
        class Num {
            let val;

            constructor(this, x) {
                this.val = x;
            }

            function add(this, y) {
                this.val += y;
            }

            function get(this) {
                this.val;
            }
        }

        let a = new Num(3);
        a.add(2);
        a.get();
        `), 5);

}

function testMultipleInstance() {
    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        class Num {
            let val;

            constructor(this, x) {
                this.val = x;
            }
        }

        let a = new Num(1);
        let b = new Num(2);
        a.val + b.val;
        `), 3);

    assert.equal(evaluator.evalString(`
        class Num {
            let val;

            constructor(this, x) {
                this.val = x;
            }
        }

        let a = new Num(1);
        let b = new Num(2);
        a.val = 3;
        b.val = 5;
        a.val + b.val;
        `), 8);

    assert.equal(evaluator.evalString(`
        class Num {
            let val;

            constructor(this, x) {
                this.val = x;
            }

            function add(this, y) {
                this.val += y;
            }
        }

        let a = new Num(1);
        let b = new Num(2);
        a.add(3);
        b.add(5);
        a.val + b.val;
        `), 11);
}

function testCombineClass() {

    let evaluator = new Evaluator();

    assert.equal(evaluator.evalString(`
        class Point {
            let x,y;
            constructor(this, x, y) {
                this.x = x;
                this.y = y;
            }
        }

        class Line {
            let p1,p2;
            constructor(this, p1, p2) {
                this.p1 = p1;
                this.p2 = p2;
            }

            function length(this) {
                sqrt(
                    pow(this.p1.x - this.p2.x,
                        2)
                    +
                    pow(this.p1.y - this.p2.y,
                        2)
                );
            }
        }

        let p1 = new Point(2,3);
        let p2 = new Point(5,7);
        let n = new Line(p1, p2);
        n.length();
        `), 5);
}

function testClassDeclarationAndNewCallAndMember() {
    testSimpleClass();
    testMultipleInstance();
    testCombineClass();

    console.log('testClassDeclarationAndNewCallAndMember() passed.');
}

export { testClassDeclarationAndNewCallAndMember };