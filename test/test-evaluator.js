/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { testLiteral } from './evaluator/test-literal.js';
// import { testWhitespace } from './evaluator/test-whitespace.js';
import { testComment } from './evaluator/test-comment.js';
import { testStatement } from './evaluator/test-statement.js';
import { testBlockStatement } from './evaluator/test-blockstatement.js';
import { testBinaryExpression } from './evaluator/test-binaryexpression.js';
// import { testAssignmentExpression } from './evaluator/test-assignment.js';
import { testDeclarationStatement } from './evaluator/test-declaration.js';
import { testIfStatement } from './evaluator/test-if-statement.js';
import { testRelational } from './evaluator/test-relational.js';
import { testEquality } from './evaluator/test-equality.js';
import { testLogical } from './evaluator/test-logical.js';
import { testUnary } from './evaluator/test-unary.js';
import { testIteration } from './evaluator/test-iteration.js';
import { testFunctionDeclarationAndFunctionCall } from './evaluator/test-function-declaration-and-function-call.js';
// import { testMember } from './evaluator/test-member.js';
// import { testFunctionCall } from './evaluator/test-function-call.js';
// import { testClassDeclaration } from './evaluator/test-class-declaration.js';
// import { testNewCall } from './evaluator/test-new-call.js';
import { testClassDeclarationAndNewCallAndMember } from './evaluator/test-class-declaration-and-new-call-and-member.js';
// import { testTuple } from './evaluator/test-tuple.js';
// import { testList } from './evaluator/test-list.js';
// import { testMap } from './evaluator/test-map.js';

function testEvaluator() {
    console.log('> testing evaluator...');

    testLiteral();
    // testWhitespace();
    testComment();
    testStatement();
    testBlockStatement();
    testBinaryExpression();
    // testAssignmentExpression();
    testDeclarationStatement();
    testIfStatement();
    testRelational();
    testEquality();
    testLogical();
    testUnary();
    testIteration();
    // testMember();
    // testFunctionDeclaration();
    // testFunctionCall();
    testFunctionDeclarationAndFunctionCall();
    // testClassDeclaration();
    // testNewCall();
    testClassDeclarationAndNewCallAndMember();
    // testTuple();
    // testList();
    // testMap();
}

export { testEvaluator };