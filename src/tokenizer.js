/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

// NOTE::
// exercise from https://github.com/DmitrySoshnikov/letter-rdp-source

/**
 * tokenizer spec
 */
const Spec = [
    // Whitespace
    [/^\s+/, null],

    // Comments
    [/^\/\/.*/, null],              // single line comment "//..."
    [/^\/\*[\s\S]*?\*\//, null],    // multi line comment "/*...*/"

    // Symbols, delimiters
    [/^;/, ';'],        // ;
    [/^{/, '{'],        // {
    [/^}/, '}'],        // }
    [/^\(/, '('],       // (
    [/^\)/, ')'],       // )

    [/^,/, ','],        // ,

    // Assignment operators
    [/^=/, 'SIMPLE_ASSIGN'],
    [/^[*/+-]=/, 'COMPLEX_ASSIGN'],

    // Operators
    [/^[+-]/, 'ADDITIVE_OPERATOR'],         // + -
    [/^[*\/]/, 'MULTIPLICATIVE_OPERATOR'],  // * /

    // Keywords
    [/^\blet\b/, 'let'],        // let

    // Number
    [/^\d[\d.e_-]*/, 'NUMBER'],

    // String
    [/^".*?(?<!\\)"/, 'STRING'],

    // Identifiers
    [/^\w+/, 'IDENTIFIER'],

];

class Tokenizer {
    init(string) {
        this._string = string;
        this._cursor = 0;
    }

    getNextToken() {
        if (!this.hasMoreTokens()) {
            return null;
        }

        const string = this._string.slice(this._cursor);

        for (const [regexp, tokenType] of Spec) {
            let tokenValue = this._match(regexp, string);
            if (tokenValue === null) {
                continue;
            }

            if (tokenType === null) {
                return this.getNextToken();
            }

            return {
                type: tokenType,
                value: tokenValue
            };
        }

        let char = string[0];
        throw new SyntaxError(`Unexpected token: "${char}"`);
    }

    hasMoreTokens() {
        return this._cursor < this._string.length;
    }

    /**
     * match and consume
     * @param {*} regexp
     * @param {*} string
     * @returns
     */
    _match(regexp, string) {
        const matched = regexp.exec(string);
        if (matched === null) {
            return null;
        }

        this._cursor += matched[0].length;

        return matched[0];
    }
}

export { Tokenizer };