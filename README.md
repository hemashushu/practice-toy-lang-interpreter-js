# (Exercise) Toy Language Interpreter JS

练习 **不使用任何第三方库** 的情况下单纯使用 JS 编写简单的 _玩具语言_ 解析器。

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [(Exercise) Toy Language Interpreter JS](#exercise-toy-language-interpreter-js)
  - [单元测试](#单元测试)
  - [运行指定源代码](#运行指定源代码)
  - [打印指定源代码的 AST](#打印指定源代码的-ast)
  - [安装 CLI 程序](#安装-cli-程序)
  - [程序示例](#程序示例)
    - [一般函数的调用](#一般函数的调用)
    - [函数的递归调用](#函数的递归调用)
    - [类与对象](#类与对象)
    - [类的组合](#类的组合)
    - [列表的实现](#列表的实现)
  - [语法](#语法)
  - [内置函数](#内置函数)

<!-- /code_chunk_output -->

## 单元测试

```bash
$ npm test
```

或者

```bash
$ node test/test.js
```

## 运行指定源代码

```bash
$ npm run eval script.toy
```

或者

```bash
$ node bin/eval.js script.toy
```

其中 `script.toy` 是脚本文件的名称（可以是相对或绝对路径）。可以试试运行 `test/evalutor` 文件夹里面的示例脚本，比如：

```bash
$ npm run eval test/script/01-sum.toy
```

如无意外，应该能看到输出 `5050`。

## 打印指定源代码的 AST

```bash
$ npm run ast script.toy
```

或者

```bash
$ node bin/ast.js script.toy
```

其中 `script.toy` 是脚本文件的名称（可以是相对或绝对路径）。

## 安装 CLI 程序

首先安装本项目到全局：

`$ sudo npm install -g ./exercise-interpreter-js`

其中 `./exercise-interpreter-js` 是本项目源码的目录（可以是相对或绝对路径），如果安装过程停住了，可以按 `Ctrl+C` 中止，实际上已经成功安装。

然后就可以在任意文件路径下使用命令 `toy-js` 执行脚本，比如：

`$ toy-js script.toy`

## 程序示例

### 一般函数的调用

计算 1..100 的和：

```js
let sum;
for (let i = 1; i <= 100; i = i + 1) {
    sum = sum + i;
}

print(sum); // 5050
```

将上面的代码保存到文件（比如 `~/temp/script.toy`），然后在本项目的源码根目录执行下面命令即可执行上面的源代码：

```bash
$ npm run eval ~/temp/script.toy
```

或者

```bash
$ node bin/eval.js ~/temp/script.toy
```

如无意外，将会看到输出 `5050`。

已创建好的源代码文件在 `test/script` 文件夹里，所以也可以直接运行：

```bash
$ npm run eval test/script/01-sum.toy
```

### 函数的递归调用

计算斐波那契数列（Fibonacci sequence）第 9 个数：

```js
function fib(n) {
    if (n==0 || n==1) {
        1;
    }else {
        fib(n-1) + fib(n-2);
    }
}

print(fib(9)); // 55
```

运行：

```bash
$ npm run eval test/script/02-fib.toy
```

### 类与对象

```js
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

print(a.val + b.val);   // 11
```

运行：

```bash
$ npm run eval test/script/03-class.toy
```

### 类的组合

```js
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

print(n.length());  // 5
```

运行：

```bash
$ npm run eval test/script/04-line.toy
```

### 列表的实现

单向链表

```js
class Node {
    let val, next;
    constructor(this, val, next) {
        this.val = val;
        this.next = next;
    }
}

class List {
    let head;

    function push(this, val) {
        this.head = new Node(val, this.head);
    }

    function pop(this) {
        if (this.head != null) {
            let val = this.head.val;
            this.head = this.head.next;
            val;
        }
    }

    function length(this) {
        let i = 0;
        let n = this.head;
        while(n != null) {
            i+=1;
            n=n.next;
        }
        i;
    }

    function to_string(this) {
        let s = "";
        let n = this.head;
        while(n != null) {
            s += n.val + ",";
            n=n.next;
        }
        s;
    }
}

let list = new List();

print("push: 3,5,7,9");
list.push(3);
list.push(5);
list.push(7);
list.push(9);

print("length: " + list.length());
print("items: " + list.to_string());

print("pop: " + list.pop());
print("pop: " + list.pop());

print("length: " + list.length());
print("items: " + list.to_string());
```

运行：

```bash
$ npm run eval test/script/05-list.py
```

## 语法

::TODO

## 内置函数

* print(s) 打印一个字符串，如果参数 `s` 是数字，则会按字面的值转换为字符串（即，并非按照数字的 ascii 或者 unicode code point 来转换）。函数返回 null。
* printf(s, [v1, v2, ...]) 打印带格式的字符串，字符串的格式同 JavaScript，如 `string %s, num %d`，第二个参数是一个列表。函数返回 null。

* read_file(file_name) 读取指定的文本文件，返回 String。
* write_file(file_name, text) 将 String 写入到指定的文件，返回 null。
