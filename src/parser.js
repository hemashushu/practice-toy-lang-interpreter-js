/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

// NOTE::
// exercise from https://github.com/DmitrySoshnikov/letter-rdp-source

import { Tokenizer } from './tokenizer.js';

class Parser {
    constructor() {
        this._string = '';
        this._tokenizer = new Tokenizer();
    }

    // parses a string into an AST.
    parse(string) {
        this._string = string;
        this._tokenizer.init(string);

        this._lookahead = this._tokenizer.getNextToken();

        return this.Program();
    }

    /**
     * Main entry point
     *
     * Program
     *  : StatementList
     *  ;
     */
    Program() {
        return {
            type: 'Program',
            body: this.StatementList()
        };
    }

    /**
     * StatementList
     *  : Statement
     *  | StatementList Statement
     *  ;
     */
    StatementList() {
        const statementList = [this.Statement()];

        while (this._lookahead !== null) {
            statementList.push(this.Statement());
        }

        return statementList;
    }

    /**
     * Statement
     *  : ExpressionStatement
     *  ;
     */
    Statement() {
        return this.ExpressionStatement();
    }

    /**
     * ExpressionStatement
     *  : Expression ';'
     *  ;
     */
    ExpressionStatement() {
        const expression = this.Expression();
        this._consume(';');

        return {
            type: 'ExpressionStatement',
            expression
        };
    }

    /**
     * Expression
     *  : Literal
     * ;
     */
    Expression() {
        return this.Literal();
    }

    /**
     * Literal
     *  : NumericLiteral
     *  | StringLiteral
     */
    Literal() {
        switch (this._lookahead.type) {
            case 'NUMBER':
                return this.NumericLiteral();
            case 'STRING':
                return this.StringLiteral();
        }
        throw new SyntaxError(`Literal: unexcepted literal production`);
    }

    /**
     * StringLiteral
     *  : STRING
     *  ;
     */
    StringLiteral() {
        const token = this._consume('STRING');

        return {
            type: 'StringLiteral',
            // TODO:: unescape the '\\', '\"', '\n' ... etc
            value: token.value.substring(1, token.value.length - 1)
        };
    }

    /**
     * NumericLiteral
     *  : NUMBER
     *  ;
     */
    NumericLiteral() {
        const token = this._consume('NUMBER');

        return {
            type: 'NumericLiteral',
            value: Number(token.value),
        };
    }

    _consume(tokenType) {
        const token = this._lookahead;

        if (token === null) {
            throw new SyntaxError(
                `Unexpected end of input, excepted: "${tokenType}"`
            );
        }

        if (token.type !== tokenType) {
            throw new SyntaxError(
                `Unexpected token: "${token.value}", excepted: "${tokenType}"`
            );
        }

        // advance to next token
        this._lookahead = this._tokenizer.getNextToken();

        return token;
    }
}

export { Parser };
