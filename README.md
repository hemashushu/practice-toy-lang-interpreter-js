# (Practice) Toy Language Interpreter - JS

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [(Practice) Toy Language Interpreter - JS](#practice-toy-language-interpreter-js)
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
    - [数据类型](#数据类型)
    - [操作符](#操作符)
    - [语句](#语句)
  - [内置函数](#内置函数)
    - [I/O](#io)
    - [数学函数](#数学函数)
  - [内置常数](#内置常数)

<!-- /code_chunk_output -->

练习单纯使用 JS 编写简单的 _玩具语言_ 解析器。

> 注：本项目是阅读和学习《Building a Parser from scratch》时的随手练习，并无实际用途。程序的原理、讲解和代码的原始出处请移步 http://dmitrysoshnikov.com/courses/parser-from-scratch/


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

`$ sudo npm install -g ./practice-toy-lang-interpreter-js`

其中 `./practice-toy-lang-interpreter-js` 是本项目源码的目录（可以是相对或绝对路径），如果安装过程停住了，可以按 `Ctrl+C` 中止，实际上已经成功安装。

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

计算斐波那契数列（Fibonacci sequence）（即：0、1、1、2、3、5、8、13、21、34、55...）第 9 个（从 0 开始）数：

```js
function fib(n) {
    if (n==0) {
        0;
    }else if(n==1) {
        1;
    }else {
        fib(n-1) + fib(n-2);
    }
}

print(fib(9)); // 34
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

### 数据类型

* 数字：整数和浮点数，如：`123`, `2.718`
* 字符串：如 `"foobar"`
* 布尔：如 `true`，`false`
* 元组：`(1,)` `(1,"foo",true)`
* 列表：`[1,2,3]`
* 映射：`#{a: 1, b: 2}`

### 操作符

* 四则运算 `+` `-` `*` `/`，如 `1+2*3`, `(1+2)*3`
* 大小比较 `>` `>=` `<` `<=`，如 `3>2`
* 相等比较 `==` `!=`，如 `3>3==true`
* 逻辑运算 `&&` `||`，如 `true && false`, `x>0 || y>0`
* 一元运算 `!` `+` `-`，如 `!false`，`-123`, `+100`

### 语句

* 声明语句 `let`，如 `let a = 1`，`let a, b`, `let a, b=2`, `let y=x+3`
* 赋值语句 `=` `+=` `-=` `*=` `/=`，如 `x=1`，`y=2*x+3`, `x+=1`
* 条件语句 `if`，如
  - ```js
    if (x) a=0`
    ```
  - ```js
    if (x)
        a = 0;
    else
        a = 1;
    ```
  - ```js
    if (x) {
        a=0;
    }
    ```
  - ```js
    if (x)
        if (y)
            2;
        else
            8;
    ```
  - ```js
    if (p){
        1;
    }else if (q) {
        2;
    }
    ```
* 循环语句
  - ```js
    while(x>10) {
        x -=1;
    }
    ```
  - ```js
    do{
        x+=1;
    }while(x<10);
    ```
  - ```js
    for(let i =0;i<10;i+=1) {
        x+=i;
    }
    ```
* 函数声明
  ```js
  function double(x) {
      return x*2;
  }
  ```
* 成员访问 `a.b.c`, `a[1]`, `b[1][2]`
* 函数调用 `foo()`, `list.add(1)`, `ele[2]("foo")`, `make_func(1)(2)`
* 类
  ```js
  class Point {
      constructor(x,y) {
          this.x = x;
          this.y = y;
      }

      function calc() {
          return 2;
      }
  }
  ```
* 类的继承
  ```js
  class Point3D extends Point {
      constructor(x,y,z) {
          super(x,y);
      }

      function calc() {
          return super.calc() + 1;
      }
  }
  ```
* 类的实例化
  ```js
  new Point(1, 2);
  ```

## 内置函数

### I/O

* print(s) 打印一个字符串，如果参数 `s` 是数字，则会按字面的值转换为字符串（即，并非按照数字的 ascii 或者 unicode code point 来转换）。函数返回 null。
* printf(s, [v1, v2, ...]) 打印带格式的字符串，字符串的格式同 JavaScript，如 `string %s, num %d`，第二个参数是一个列表。函数返回 null。

* read_file(file_name) 读取指定的文本文件，返回 String。
* write_file(file_name, text) 将 String 写入到指定的文件，返回 null。

### 数学函数

* abs(x) 计算绝对值，返回 number
* ceil(x) 向上取整，返回 number
* floor(x) 向下取整，返回 number
* round(x) 四舍五入取整，返回 number
* trunc(x) 取整，返回 number

* log(x) 计算 log 10(x)，返回 number
* ln(x) 计算 log e(x)，返回 number
* pow(x, y) 幂函数，返回 number
* sqrt(x) 平方根，返回 number

* random() 获取随机数，返回 [0,1)

* sin(x) 正弦，返回 number
* cos(x) 余弦，返回 number
* tan(x) 正切，返回 number
* asin(x) 反正弦，返回 number
* acos(x) 反余弦，返回 number
* atan(x) 反正切，返回 number

## 内置常数

* E 自然对数
* PI 圆周率