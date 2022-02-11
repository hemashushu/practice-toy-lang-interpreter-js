/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { testLiteral } from './parser/test-literal.js';
import { testWhitespace } from './parser/test-whitespace.js';
import { testComment } from './parser/test-comment.js';
import { testStatement } from './parser/test-statement.js';
import { testBlockStatement } from './parser/test-blockstatement.js';
import { testBinaryExpression } from './parser/test-binaryexpression.js';
import { testAssignmentExpression } from './parser/test-assignment.js';
import { testDeclarationStatement } from './parser/test-declaration.js';
import { testIfStatement } from './parser/test-if-statement.js';
import { testRelational } from './parser/test-relational.js';
import { testEquality } from './parser/test-equality.js';
import { testLogical } from './parser/test-logical.js';
import { testUnary } from './parser/test-unary.js';
import { testIteration } from './parser/test-iteration.js';
import { testFunctionDeclaration } from './parser/test-function-declaration.js';
import { testMember } from './parser/test-member.js';
import { testFunctionCall } from './parser/test-function-call.js';
import { testClassDeclaration } from './parser/test-class-declaration.js';
import { testNewCall } from './parser/test-new-call.js';

function testParser() {
    testLiteral();
    testWhitespace();
    testComment();
    testStatement();
    testBlockStatement();
    testBinaryExpression();
    testAssignmentExpression();
    testDeclarationStatement();
    testIfStatement();
    testRelational();
    testEquality();
    testLogical();
    testUnary();
    testIteration();
    testMember();
    testFunctionDeclaration();
    testFunctionCall();
    testClassDeclaration();
    testNewCall();

    console.log('testParser() passed.');
}

export { testParser };