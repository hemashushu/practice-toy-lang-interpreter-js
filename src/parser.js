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
    StatementList(stopLookaheadTokenType = null) {
        const statementList = [this.Statement()];

        while (this._lookahead !== null &&
            this._lookahead.type !== stopLookaheadTokenType) {
            statementList.push(this.Statement());
        }

        return statementList;
    }

    /**
     * Statement
     *  : ExpressionStatement
     *  | BlockStatement
     *  | EmptyStatement
     *  | VariableStatement
     *  ;
     */
    Statement() {
        switch (this._lookahead.type) {
            case ';':
                return this.EmptyStatement();
            case '{':
                return this.BlockStatement();
            case 'let':
                return this.VariableStatement();
            default:
                return this.ExpressionStatement();
        }
    }

    /**
     * VariableStatement
     *  : 'let' VariableDeclarationList ';'
     *  ;
     */
    VariableStatement() {
        this._consume('let');
        const declarations = this.VariableDeclarationList();
        this._consume(';');

        return {
            type: 'VariableStatement',
            declarations
        };
    }

    /**
     * VariableDeclarationList
     *  : VariableDeclaration
     *  | VariableDeclarationList ',' VariableDeclaration
     */
    VariableDeclarationList() {
        const declarations = [];

        do {
            declarations.push(this.VariableDeclaration());
        } while (this._lookahead.type === ',' && this._consume(','));

        return declarations;
    }

    /**
     * VariableDeclaration
     *  : Identifier OptionalVariableInitializer
     *  ;
     */
    VariableDeclaration() {
        const id = this.Identifier();

        // const init = this._lookahead.type !== ';' && this._lookahead.type !== ',' ?
        //     this.VariableInitializer() : null;

        const init = (this._lookahead.type === 'SIMPLE_ASSIGN') ?
            this.VariableInitializer() : null;

        return {
            type: 'VariableDeclaration',
            id,
            init
        };
    }

    /**
     * VariableInitializer
     *  : SIMPLE_ASSIGN AssignmentExpression
     *  ;
     */
    VariableInitializer() {
        this._consume('SIMPLE_ASSIGN');
        return this.AssignmentExpression();
    }

    /**
     * EmptyStatement
     *  : ';'
     *  ;
     */
    EmptyStatement() {
        this._consume(';');
        return {
            type: 'EmptyStatement'
        };
    }

    /**
     * BlockStatement
     *  : '{' OptionalStatementList  '}'
     *  ;
     */
    BlockStatement() {
        this._consume('{');

        const body = this._lookahead.type === '}' ?
            [] : this.StatementList('}');

        this._consume('}');

        return {
            type: 'BlockStatement',
            body
        };
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
     *  : AdditiveExpression
     * ;
     */
    Expression() {
        return this.AssignmentExpression();
    }

    /**
     * AssignmentExpression
     *  : AdditiveExpression
     *  | LeftHandSideExpression AssignmentOperator AssignmentExpression
     *  ;
     */
    AssignmentExpression() {
        const left = this.AdditiveExpression();

        if (!this._isAssignmentOperator(this._lookahead.type)) {
            return left;
        }

        return {
            type: 'AssignmentExpression',
            operator: this.AssignmentOperator().value,
            left: this._checkValidAssignmentTarget(left),
            right: this.AssignmentExpression()
        };
    }

    _isAssignmentOperator(tokenType) {
        return tokenType === 'SIMPLE_ASSIGN' || tokenType === 'COMPLEX_ASSIGN';
    }

    /**
     * AssignmentOperator
     *  : SIMPLE_ASSIGN
     *  | COMPLEX_ASSIGN
     *  ;
     * @returns
     */
    AssignmentOperator() {
        if (this._lookahead.type === 'SIMPLE_ASSIGN') {
            return this._consume('SIMPLE_ASSIGN');
        } else {
            return this._consume('COMPLEX_ASSIGN');
        }
    }

    _checkValidAssignmentTarget(node) {
        if (node.type === 'Identifier') {
            return node;
        }

        throw new SyntaxError('Invalid left-hand side in assignment expression');
    }

    /**
     * AdditiveExpression
     *  : MultiplicativeExpression
     *  | AdditiveExpression ADDITIVE_OPERATOR MultiplicativeExpression
     */
    AdditiveExpression() {
        return this._RightAssociativeBinaryExpression(
            'MultiplicativeExpression', 'ADDITIVE_OPERATOR');
    }

    /**
     * MultiplicativeExpression
     *  : PrimaryExpression
     *  | MultiplicativeExpression MULTIPLICATIVE_OPERATOR PrimaryExpression
     */
    MultiplicativeExpression() {
        return this._RightAssociativeBinaryExpression(
            'PrimaryExpression', 'MULTIPLICATIVE_OPERATOR');
    }

    _RightAssociativeBinaryExpression(builderFuncionName, operatorTokenType) {
        const builderFunction = this[builderFuncionName];

        // bind the 'this' value to the funcion
        // or, invoke the builder function with 'call' or 'apply' method.
        const bindedBuilderFunction = builderFunction.bind(this);

        let left = bindedBuilderFunction();

        while (this._lookahead.type === operatorTokenType) {
            const operator = this._consume(operatorTokenType).value;
            const right = bindedBuilderFunction();

            let node = {
                type: 'BinaryExpression',
                operator,
                left,
                right
            };

            // right associative
            left = node;
        }

        return left;
    }

    /**
     * PrimaryExpression
     *  : Literal
     *  | ParenthesizedExpression
     *  | LeftHandSideExpression
     *  ;
     */
    PrimaryExpression() {
        if (this._isLiteral(this._lookahead.type)) {
            return this.Literal();
        }

        switch (this._lookahead.type) {
            case '(':
                return this.ParenthesizedExpression();
            default:
                return this.LeftHandSideExpression();
        }
    }

    _isLiteral(tokenType) {
        return tokenType === 'STRING' || tokenType === 'NUMBER';
    }

    /**
     * LeftHandSideExpression
     *  : Identifier
     *  ;
     */
    LeftHandSideExpression() {
        return this.Identifier();
    }

    /**
     * Identifier
     *  : IDENTIFIER
     *  ;
     */
    Identifier() {
        const name = this._consume('IDENTIFIER').value;
        return {
            type: 'Identifier',
            name
        };
    }

    /**
     * ParenthesizedExpression
     *  : '(' Expression ')'
     *  ;
     */
    ParenthesizedExpression() {
        this._consume('(');
        const expression = this.Expression();
        this._consume(')');

        return expression;
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
