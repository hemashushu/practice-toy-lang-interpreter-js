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
        const statementList = [];

        while (this._lookahead !== null &&
            this._lookahead.type !== stopLookaheadTokenType) {
            let statement = this.Statement()
            statementList.push(statement);
        }

        return statementList;
    }

    /**
     * Statement
     *  : ExpressionStatement
     *  | BlockStatement
     *  | EmptyStatement
     *  | VariableStatement
     *  | IterationStatement
     *  | FunctionDeclaration
     *  | ReturnStatement
     *  ;
     */
    Statement() {
        switch (this._lookahead.type) {
            case ';':
                return this.EmptyStatement();
            case 'if':
                return this.IfStatement();
            case '{':
                return this.BlockStatement();
            case 'let':
                return this.VariableStatement();
            case 'while':
            case 'do':
            case 'for':
                return this.IterationStatement();
            case 'def':
                return this.FunctionDeclaration();
            case 'return':
                return this.ReturnStatement();
            case 'class':
                return this.ClassDeclaration();
            default:
                return this.ExpressionStatement();
        }
    }

    /**
     * ClassDeclaration
     *  : 'class' IDENTIFIER OptionalClassExtends BlockStatement
     *  ;
     */
    ClassDeclaration() {
        this._consume('class');
        const id = this.Identifier();

        const superClass = (this._lookahead.type === 'extends') ?
            this.ClassExtends() : null;

        const body = this.BlockStatement();

        return {
            type: 'ClassDeclaration',
            id,
            superClass,
            body
        };
    }

    /**
     * ClassExtends
     *  : 'extends' IDENTIFIER
     *  ;
     */
    ClassExtends() {
        this._consume('extends');
        return this.Identifier();
    }

    /**
     * FunctionDeclaration
     *  : 'def' IDENTIFIER '(' OptionalFormalParameterList ')' BlockStatement
     *  ;
     */
    FunctionDeclaration() {
        this._consume('def');
        const name = this.Identifier();

        this._consume('(');
        const params = this._lookahead.type === ')' ?
            [] : this.FormalParameterList();
        this._consume(')');

        const body = this.BlockStatement();

        return {
            type: 'FunctionDeclaration',
            name,
            params,
            body
        };
    }

    /**
     * FormalParameterList
     *  : Identifier
     *  | FormalParameterList ',' Identifier
     *  ;
     */
    FormalParameterList() {
        let params = [];

        do {
            params.push(this.Identifier());
        } while (this._lookahead.type === ',' && this._consume(','));

        return params;
    }

    /**
     * IterationStatement
     *  : WhileStatement
     *  | DoWhileStatement
     *  | ForStatement
     *  ;
     */
    IterationStatement() {
        switch (this._lookahead.type) {
            case 'while':
                return this.WhileStatement();
            case 'do':
                return this.DoWhileStatement();
            case 'for':
                return this.ForStatement();
        }
    }

    /**
     * WhileStatement
     *  : 'while' '(' Expression ')' Statement
     *  ;
     */
    WhileStatement() {
        this._consume('while');
        this._consume('(');
        const test = this.Expression();
        this._consume(')');

        const body = this.Statement();

        return {
            type: 'WhileStatement',
            test,
            body
        };
    }

    /**
     * DoWhileStatement
     *  : 'do' Statement 'while' '(' Expression ')' ';'
     *  ;
     */
    DoWhileStatement() {
        this._consume('do');
        const body = this.Statement();

        this._consume('while');
        this._consume('(');
        const test = this.Expression();
        this._consume(')');
        this._consume(';');

        return {
            type: 'DoWhileStatement',
            test,
            body
        };
    }

    /**
     * ForStatement
     *  : 'for' '(' OptionalForStatementInit ';' OptionalExpression ';' OptionalExpression ')' Statement
     *  ;
     */
    ForStatement() {
        this._consume('for');
        this._consume('(');

        let init = this._lookahead.type === ';' ? null : this.ForStatementInit();
        this._consume(';');

        let test = this._lookahead.type === ';' ? null : this.Expression();
        this._consume(';');

        let update = this._lookahead.type === ')' ? null : this.Expression();
        this._consume(')');

        let body = this.Statement();

        return {
            type: 'ForStatement',
            init,
            test,
            update,
            body
        };
    }

    /**
     * ForStatementInit
     *  : VariableStatementInit
     *  | Expression
     *  ;
     */
    ForStatementInit() {
        if (this._lookahead.type === 'let') {
            return this.VariableStatementInit();
        } else {
            return this.Expression();
        }
    }

    /**
     * IfStatement
     *  : 'if' '(' Expression ')' Statement
     *  | 'if' '(' Expression ')' Statement 'else' Statement
     *  ;
     */
    IfStatement() {
        this._consume('if');
        this._consume('(');
        const test = this.Expression();
        this._consume(')');

        const consequent = this.Statement();

        let alternate = null;

        if (this._lookahead !== null &&
            this._lookahead.type === 'else') {
            this._consume('else');
            alternate = this.Statement();
        }

        return {
            type: 'IfStatement',
            test,
            consequent,
            alternate
        };
    }

    /**
     * VariableStatementInit
     *  : 'let' VariableDeclarationList
     *  ;
     */
    VariableStatementInit() {
        this._consume('let');
        const declarations = this.VariableDeclarationList();

        return {
            type: 'VariableStatement',
            declarations
        };
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
     * ReturnStatement
     *  : 'return' OptionalExpression ';'
     *  ;
     */
    ReturnStatement() {
        this._consume('return');
        const argument = this._lookahead.type === ';' ? null : this.Expression();
        this._consume(';');

        return {
            type: 'ReturnStatement',
            argument
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
     *  : AssignmentExpression
     * ;
     */
    Expression() {
        return this.AssignmentExpression();
    }

    /**
     * AssignmentExpression
     *  : LogicalOrExpression
     *  | LeftHandSideExpression AssignmentOperator AssignmentExpression
     *  ;
     */
    AssignmentExpression() {
        const left = this.LogicalOrExpression();

        // todo::
        // if (this._lookahead === null) ... // excepted ';'

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

    /**
     * LogicalOrExpression
     *  : LogicalAndExpression
     *  | LogicalOrExpression LOGICAL_OR LogicalAndExpression
     *  ;
     */
    LogicalOrExpression() {
        return this._LogicalExpression(
            'LogicalAndExpression', 'LOGICAL_OR');
    }

    /**
     * LogicalAndExpression
     *  : EqualityExpression
     *  | LogicalAndExpression LOGICAL_AND EqualityExpression
     *  ;
     */
    LogicalAndExpression() {
        return this._LogicalExpression(
            'EqualityExpression', 'LOGICAL_AND');
    }

    /**
     * EqualityExpression
     *  : RelationalExpression
     *  | EqualityExpression EQUALITY_OPERATOR RelationalExpression
     *  ;
     */
    EqualityExpression() {
        return this._RightAssociativeBinaryExpression(
            'RelationalExpression', 'EQUALITY_OPERATOR');
    }

    /**
     * RelationalExpression
     *  : AdditiveExpression
     *  | RelationalExpression RELATIONAL_OPERATOR AdditiveExpression
     *  ;
     */
    RelationalExpression() {
        return this._RightAssociativeBinaryExpression(
            'AdditiveExpression', 'RELATIONAL_OPERATOR');
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
        if (node.type === 'Identifier' ||
            node.type === 'MemberExpression') {
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
     *  : UnaryExpression
     *  | MultiplicativeExpression MULTIPLICATIVE_OPERATOR UnaryExpression
     */
    MultiplicativeExpression() {
        return this._RightAssociativeBinaryExpression(
            'UnaryExpression', 'MULTIPLICATIVE_OPERATOR');
    }

    _LogicalExpression(builderFuncionName, operatorTokenType) {
        const builderFunction = this[builderFuncionName];

        // bind the 'this' value to the funcion
        // or, invoke the builder function with 'call' or 'apply' method.
        const bindedBuilderFunction = builderFunction.bind(this);

        let left = bindedBuilderFunction();

        // todo::
        // if (this._lookahead === null) ... // excepted ';'

        while (this._lookahead.type === operatorTokenType) {
            const operator = this._consume(operatorTokenType).value;
            const right = bindedBuilderFunction();

            let node = {
                type: 'LogicalExpression',
                operator,
                left,
                right
            };

            // right associative
            left = node;
        }

        return left;
    }

    _RightAssociativeBinaryExpression(builderFuncionName, operatorTokenType) {
        const builderFunction = this[builderFuncionName];

        // bind the 'this' value to the funcion
        // or, invoke the builder function with 'call' or 'apply' method.
        const bindedBuilderFunction = builderFunction.bind(this);

        let left = bindedBuilderFunction();

        // todo::
        // if (this._lookahead === null) ... // excepted ';'

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
     * UnaryExpression
     *  : LeftHandSideExpression
     *  | ADDITIVE_OPERATOR UnaryExpression
     *  | LOGICAL_NOT UnaryExpression
     *  ;
     */
    UnaryExpression() {
        let operator = null;
        switch (this._lookahead.type) {
            case 'ADDITIVE_OPERATOR':
                operator = this._consume('ADDITIVE_OPERATOR').value;
                break;

            case 'LOGICAL_NOT':
                operator = this._consume('LOGICAL_NOT').value;
                break;
        }

        if (operator === null) {
            return this.LeftHandSideExpression();
        } else {
            return {
                type: 'UnaryExpression',
                operator,
                argument: this.UnaryExpression() // this will enable the unary chain, e.g. `!!true`
            };
        }
    }

    /**
     * LeftHandSideExpression
     *  : CallOrMemberExpression
     *  ;
     */
    LeftHandSideExpression() {
        return this.CallOrMemberExpression();
    }

    /**
     * CallOrMemberExpression
     *  : MemberExpression
     *  | CallExpression
     *  ;
     */
    CallOrMemberExpression() {
        const member = this.MemberExpression();

        if (this._lookahead.type === '(') {
            return this._CallExpression(member);
        } else {
            return member;
        }
    }

    /**
     * CallExpression
     *  : Callee Arguments
     *  ;
     *
     * Callee
     *  : MemberExpression
     *  | CallExpression
     *  ;
     */
    _CallExpression(callee) {
        let callExpression = {
            type: 'CallExpression',
            callee,
            arguments: this.Arguments()
        };

        while (this._lookahead.type === '(') {
            // callExpression = this._CallExpression(callExpression);
            // .or.

            callExpression = {
                type: 'CallExpression',
                callee: callExpression,
                arguments: this.Arguments()
            };
        }

        return callExpression;
    }

    /**
     * Arguments
     *  : '(' OptionalArgumentList ')'
     *  ;
     */
    Arguments() {
        this._consume('(');
        const argumentList = this._lookahead.type === ')' ?
            [] : this.ArgumentList();
        this._consume(')');

        return argumentList;
    }

    /**
     * ArgumentList
     *  : Expression
     *  | ArgumentList ',' Expression
     *  ;
     */
    ArgumentList() {
        let argumentList = [];

        argumentList.push(this.Expression());

        while (this._lookahead.type === ',' && this._consume(',')) {
            argumentList.push(this.Expression());
        }

        return argumentList;
    }

    /**
     * MemberExpression
     *  : PrimaryExpression
     *  | MemberExpression '.' Identifier
     *  | MemberExpression '[' Expression ']'
     *  ;
     */
    MemberExpression() {
        let object = this.PrimaryExpression();

        while (this._lookahead.type === '.' || this._lookahead.type === '[') {
            switch (this._lookahead.type) {
                case '.':
                    {
                        this._consume('.');
                        const property = this.Identifier();

                        object = {
                            type: 'MemberExpression',
                            computed: false,
                            object,
                            property
                        };
                        break;
                    }
                case '[':
                    {
                        this._consume('[');
                        const property = this.Expression();
                        this._consume(']');

                        object = {
                            type: 'MemberExpression',
                            computed: true,
                            object,
                            property
                        };
                        break;
                    }
            }
        }

        return object;
    }

    /**
     * PrimaryExpression
     *  : Literal
     *  | ParenthesizedExpression
     *  | Identifier
     *  ;
     */
    PrimaryExpression() {
        if (this._isLiteral(this._lookahead.type)) {
            return this.Literal();
        }

        switch (this._lookahead.type) {
            case '(':
                return this.ParenthesizedExpression();
            case 'IDENTIFIER':
                return this.Identifier();
            case 'new':
                return this.NewExpression();
        }
    }

    /**
     * NewExpression
     *  : 'new' MemberExpression Arguments
     *  ;
     */
    NewExpression() {
        // new 操作符的优先级比 member 要高
        //
        // new Foo.bar(1) -> new (Foo.bar)(1)
        // new Foo(1).bar(2) -> (new Foo(1)).bar(2)
        // new new Foo(1).bar(2) -> (new (new Foo(1)).bar)(2)

        this._consume('new');
        return  {
            type: 'NewExpression',
            callee: this.MemberExpression(),
            arguments: this.Arguments()
        }
    }

    _isLiteral(tokenType) {
        return tokenType === 'STRING' ||
            tokenType === 'NUMBER' ||
            tokenType === 'TRUE' ||
            tokenType === 'FALSE' ||
            tokenType === 'NULL';
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
     *  | TrueLiteral
     *  | FalseLiteral
     *  | NullLiteral
     *  ;
     */
    Literal() {
        switch (this._lookahead.type) {
            case 'NUMBER':
                return this.NumericLiteral();
            case 'STRING':
                return this.StringLiteral();
            case 'TRUE':
                return this.BooleanLiteral(true);
            case 'FALSE':
                return this.BooleanLiteral(false);
            case 'NULL':
                return this.NullLiteral();
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

    /**
     * BooleanLiteral
     *  : TRUE
     *  | FALSE
     *  ;
     */
    BooleanLiteral(value) {
        this._consume(value ? 'TRUE' : 'FALSE');
        return {
            type: 'BooleanLiteral',
            value: value
        };
    }

    /**
     * NullLiteral
     *  : NULL
     *  ;
     */
    NullLiteral() {
        this._consume('NULL');
        return {
            type: 'NullLiteral',
            value: null
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
