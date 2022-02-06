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

function testParser() {
    testLiteral();
    testWhitespace();
    testComment();

    console.log('testParser() passed.');
}

export { testParser };