/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { testLiteral } from './test-literal.js';
import { testWhitespace } from './test-whitespace.js';
import { testComment } from './test-comment.js';
import { testStatement } from './test-statement.js';
import { testBlockStatement } from './test-blockstatement.js';
import { testBinaryExpression } from './test-binaryexpression.js';
import { testAssignmentExpression } from './test-assignment.js';
import { testDeclarationStatement } from './test-declaration.js';

function testParser() {
    testLiteral();
    testWhitespace();
    testComment();
    testStatement();
    testBlockStatement();
    testBinaryExpression();
    testAssignmentExpression();
    testDeclarationStatement();

    console.log('testParser() passed.');
}

export { testParser };