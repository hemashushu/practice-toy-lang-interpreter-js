/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import fs from 'fs';

import { Parser } from './parser.js';
import { Environment } from './environment.js';
import { GlobalEnvironmentBuilder } from './global-env-builder.js';

class Evaluator {

    evalFile(file) {
        const string = fs.readFileSync(file, 'utf-8');
        return this.evalString(string);
    }

    evalString(string) {
        const ast = new Parser().parse(string);
        const env = GlobalEnvironmentBuilder.build();
        return this.eval(ast, env);
    }

    eval(node, env) {
        switch (node.type) {
            case 'Program':
                return this.evalStatements(node.body, env);

            case 'ExpressionStatement':
                return this.eval(node.expression, env);
            case 'BlockStatement':
                return this.evalBlockStatement(node.body, env);
            case 'EmptyStatement': // 空语句会消耗最后一个语句的结果
                return null;
            case 'VariableStatement':
                return this.evalVariableStatement(node.declarations, env);

            case 'IfStatement':
                return this.evalIfStatement(node.test, node.consequent, node.alternate, env);
            case 'WhileStatement':
                return this.evalWhileStatement(node.test, node.body, env);
            case 'DoWhileStatement':
                return this.evalDoWhileStatement(node.test, node.body, env);
            case 'ForStatement':
                return this.evalForStatement(node.init, node.test, node.update, node.body, env);

            case 'FunctionDeclaration':
                return this.evalFunctionDeclaration(node.name.name, node.params, node.body, env);
            case 'Constructor':
                // 构造函数可视为名称为 'constructor' 的普通函数
                return this.evalFunctionDeclaration('constructor', node.params, node.body, env);
            case 'CallExpression':
                return this.evalCallExpression(node.callee, node.arguments, env);

            case 'ClassDeclaration':
                return this.evalClassDeclaration(node.id, node.superClass, node.body, env);
            case 'NewExpression':
                return this.evalNewExpression(node.callee, node.arguments, env);
            case 'MemberExpression':
                return this.evalMemberExpression(node.object, node.property, node.computed, env);

            case 'BinaryExpression':
                return this.evalBinaryExpression(node.operator, node.left, node.right, env);
            case 'LogicalExpression':
                return this.evalLogicalExpression(node.operator, node.left, node.right, env);
            case 'AssignmentExpression':
                return this.evalAssignmentExpression(node.operator, node.left, node.right, env);
            case 'UnaryExpression':
                return this.evalUnaryExpression(node.operator, node.argument, env);

            case 'Identifier':
                return this.evalIdentifier(node.name, env);

            case 'List':
                return this.evalList(node.elements, env);
            case 'Tuple':
                return this.evalTuple(node.elements, env);
            case 'Map':
                return this.evalMap(node.entries, env);

            case 'NumericLiteral':
                return node.value;
            case 'StringLiteral':
                return node.value;
            case 'BooleanLiteral':
                return node.value;
            case 'NullLiteral':
                return null;
        }

        throw new EvalError('Unsupported node: ' + JSON.stringify(node));
    }

    evalIdentifier(name, env) {
        return env.lookup(name);
    }

    evalStatements(nodes, env) {
        let value = null;
        for (const node of nodes) {
            value = this.eval(node, env);
        }
        return value;
    }

    evalBlockStatement(nodes, env) {
        const blockEnv = new Environment(env);
        return this._evalNodes(nodes, blockEnv);
    }

    _evalNodes(nodes, env) {
        let value = null;
        for (const node of nodes) {
            value = this.eval(node, env);
        }

        return value;
    }

    evalVariableStatement(declarationNodes, env) {
        let value = null;
        for (const node of declarationNodes) {
            const name = node.id.name;
            const initNode = node.init;
            const initValue = initNode !== null ? this.eval(initNode, env) : null;

            value = env.define(name, initValue);
        }
        return value;
    }

    evalIfStatement(testNode, consequentNode, alternateNode, env) {
        // 注：alternateNode 有可能为 null

        const test = this.eval(testNode, env);
        let value = null;

        if (test === true) {
            value = this.eval(consequentNode, env);
        } else if (alternateNode !== null) {
            value = this.eval(alternateNode, env);
        }
        return value;
    }

    evalWhileStatement(testNode, bodyNode, env) {
        let value = null;
        while (this.eval(testNode, env)) {
            value = this.eval(bodyNode, env);
        }
        return value;
    }

    evalDoWhileStatement(testNode, bodyNode, env) {
        let value = null;
        do {
            value = this.eval(bodyNode, env);
        } while (this.eval(testNode, env));

        return value;
    }

    evalForStatement(initNode, testNode, updateNode, bodyNode, env) {
        // 注：init, test, update 都有可能为 null

        if (initNode !== null) {
            this.eval(initNode, env);
        }

        let value = null;
        while (testNode === null || this.eval(testNode, env)) {
            if (bodyNode !== null) {
                value = this.eval(bodyNode, env);
            }

            if (updateNode !== null) {
                this.eval(updateNode, env);
            }
        }

        return value;
    }

    evalFunctionDeclaration(name, paramNodes, bodyNode, env) {
        return env.define(name, {
            params: paramNodes,
            body: bodyNode,
            env: env // 记录定义函数时的所在环境，实现静态范围（static scope）
        });
    }

    evalClassDeclaration(idNode, superClassNode, bodyNode, env) {
        // 注：superClassNode 有可能为 null

        const name = idNode.name;
        const parentEnv = superClassNode === null ?
            env : this.eval(superClassNode, env);

        // class 声明语句实际上是创建一个 class environment
        const classEnv = new Environment(parentEnv);

        // bodyNode 是一个 block statement
        // 不能直接调用 eval() 或者 evalBlockStatement()，因为那会为 block 创建一个新的 environment
        this._evalNodes(bodyNode.body, classEnv);

        return env.define(name, classEnv);
    }

    evalCallExpression(calleeNode, argumentNodes, env) {
        if (calleeNode.type === 'MemberExpression') {
            // 调用成员函数

            const obj = this.eval(calleeNode.object, env); // obj 应该是 instance environment
            const instanceCallee = obj.lookup(calleeNode.property.name);

            const args = argumentNodes.map(argumentNode => this.eval(argumentNode, env));
            const instanceArgs = [obj, ...args]; // 补上 `this` 参数的值，即 instance environment

            const paramNodes = instanceCallee.params;
            const bodyNode = instanceCallee.body;
            const funcEnv = instanceCallee.env;

            return this._callFunction(instanceArgs, paramNodes, bodyNode, funcEnv);

        } else if (calleeNode.type === 'Identifier') {
            if (calleeNode.name === 'super') {
                // 调用 instance 的 parent (class env) 的 constructor 函数

                throw new EvalError("Unsupported callee type.");

            } else {
                // 调用直接函数

                const callee = this.eval(calleeNode, env);
                const args = argumentNodes.map(argumentNode => this.eval(argumentNode, env));

                if (typeof callee === 'function') {
                    // 内置函数
                    return callee.apply(null, args);

                } else {
                    // 用户自定义函数
                    // callee: {params, body, env}

                    const paramNodes = callee.params;
                    const bodyNode = callee.body;
                    const funcEnv = callee.env;

                    return this._callFunction(args, paramNodes, bodyNode, funcEnv);
                }
            }

        } else {
            throw new EvalError("Unsupported callee type.");
        }
    }

    evalNewExpression(calleeNode, argumentNodes, env) {
        // calleeNode 是 class 的名字，其值是 class 对应的 environment
        const classEnv = this.eval(calleeNode, env);
        const args = argumentNodes.map(argumentNode => this.eval(argumentNode, env));

        // new 语句实际上是创建一个 instance environment
        const instanceEnv = new Environment(classEnv);

        // 尝试寻找构造函数
        const constructor = classEnv.getValue('constructor');
        if (constructor !== undefined) {
            // 补上 `this` 参数的值
            const constructorArgs = [instanceEnv, ...args];

            const paramNodes = constructor.params;
            const bodyNode = constructor.body;
            const funcEnv = constructor.env;

            // 使用 instance env 执行构造函数
            this._callFunction(constructorArgs, paramNodes, bodyNode, funcEnv);
        }

        return instanceEnv;
    }

    _callFunction(args, paramNodes, bodyNode, funcEnv) {
        // 构建函数运行的环境
        //
        // 使用定义函数时的所在环境，实现静态范围（static scope）
        // 即被调用的函数内部访问的变量是 “定义函数时” 的环境。
        // 如果使用 `new Environment(env)` 则会变成动态范围（dynamic scope）
        // 即被调用的函数内部访问的变量是 "函数调用者" 的环境。（参考 Perl 的 sub 过程里面的 local 关键字）

        const activationEnv = new Environment(funcEnv);

        // Array.prototype.entries()
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries
        for (const [index, arg] of args.entries()) {
            const paramName = paramNodes[index].name;
            activationEnv.define(paramName, arg);
        }

        return this.eval(bodyNode, activationEnv);
    }

    evalMemberExpression(objectNode, propertyNode, computed, env) {
        if (computed) {
            throw new EvalError('Not implemented yet.');
        } else {
            const propertyName = propertyNode.name;

            const obj = this.eval(objectNode, env); // obj 应该是一个 instance environment
            return obj.lookup(propertyName);
        }

    }

    evalBinaryExpression(operator, leftNode, rightNode, env) {
        const left = this.eval(leftNode, env);
        const right = this.eval(rightNode, env);

        switch (operator) {
            case '+':
                return left + right;
            case '-':
                return left - right;
            case '*':
                return left * right;
            case '/':
                return left / right;

            case '>=':
                return left >= right;
            case '<=':
                return left <= right;
            case '>':
                return left > right;
            case '<':
                return left < right;

            case '==':
                return left === right;
            case '!=':
                return left !== right;

            default:
                throw new EvalError('Unsupported binary operator.');
        }
    }

    evalLogicalExpression(operator, leftNode, rightNode, env) {
        const left = this.eval(leftNode, env);
        const right = this.eval(rightNode, env);

        switch (operator) {
            case '&&':
                return left && right;
            case '||':
                return left || right;

            default:
                throw new EvalError('Unsupported logical operator.');
        }
    }

    evalUnaryExpression(operator, argumentNode, env) {
        const value = this.eval(argumentNode, env);
        switch (operator) {
            case '-':
                return -value;
            case '+':
                return value;
            case '!':
                return !value;  // 采用 JavaScript 规则，0、null 在逻辑运算时被视为 false

            default:
                throw new EvalError('Unsupported unary operator.');
        }
    }

    evalAssignmentExpression(operator, leftNode, rightNode, env) {
        if (leftNode.type === 'Identifier') {
            const name = leftNode.name;
            const rightValue = this.eval(rightNode, env);

            switch (operator) {
                case '+=':
                    return env.assign(name, this.eval(leftNode, env) + rightValue);

                case '-=':
                    return env.assign(name, this.eval(leftNode, env) - rightValue);

                case '*=':
                    return env.assign(name, this.eval(leftNode, env) * rightValue);

                case '/=':
                    return env.assign(name, this.eval(leftNode, env) / rightValue);

                case '=':
                    return env.assign(name, rightValue);

                default:
                    throw new EvalError('Unsupported assignment operator.');
            }
        }

        // leftNode.computed: true = 中括号成员, false = 点成员
        if (leftNode.type === 'MemberExpression' && leftNode.computed === false) {
            const propertyName = leftNode.property.name;
            const rightValue = this.eval(rightNode, env);

            const obj = this.eval(leftNode.object, env); // obj 应该是 instance environment

            switch (operator) {
                case '+=':
                    return obj.setValue(propertyName, obj.lookup(propertyName) + rightValue);

                case '-=':
                    return obj.setValue(propertyName, obj.lookup(propertyName) - rightValue);

                case '*=':
                    return obj.setValue(propertyName, obj.lookup(propertyName) * rightValue);

                case '/=':
                    return obj.setValue(propertyName, obj.lookup(propertyName) / rightValue);

                case '=':
                    return obj.setValue(propertyName, rightValue);

                default:
                    throw new EvalError('Unsupported assignment operator.');
            }
        }

        throw new EvalError('Not implemented yet.');
    }

    evalList(elementNodes, env) {
        // 转成内部数据结构
        throw new EvalError('Not implemented yet.');
    }

    evalTuple(elementNodes, env) {
        // 转成内部数据结构
        throw new EvalError('Not implemented yet.');
    }

    evalMap(entryNodes, env) {
        // 转成内部数据结构
        throw new EvalError('Not implemented yet.');
    }
}

export { Evaluator };