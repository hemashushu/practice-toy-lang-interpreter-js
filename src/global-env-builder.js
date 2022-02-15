/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { readFileSync, writeFileSync } from 'fs';

import { Environment } from './environment.js';

class GlobalEnvironmentBuilder {
    static build() {
        const records = new Map();
        GlobalEnvironmentBuilder.addBuiltinFunctions(records);
        GlobalEnvironmentBuilder.addBuiltinConstants(records);

        return new Environment(null, records);
    }

    static addBuiltinFunctions(records) {

        /* ******** I/O ******** */

        records.set('print', (v) => {
            console.log(v);
            return null;
        });

        records.set('printf', (s, list) => {
            console.log(s, ...list);
            return null;
        });

        records.set('read_file', (fullname) => {
            // https://nodejs.org/api/fs.html#fsreadfilesyncpath-options
            return readFileSync(fullname, 'utf-8');
        });

        records.set('write_file', (fullname, text) => {
            // https://nodejs.org/api/fs.html#fswritefilesyncfile-data-options
            writeFileSync(fullname, text, 'utf-8');
            return null;
        });

        /* ******** Math ******** */

        // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math

        records.set('abs', x => {
            return Math.abs(x);
        });

        /* ******** 取整函数 ******** */

        records.set('ceil', x => {
            return Math.ceil(x);
        });

        records.set('floor', x => {
            return Math.floor(x);
        });

        records.set('round', x => {
            return Math.round(x);
        });

        records.set('trunc', x => {
            return Math.trunc(x);
        });

        /* ******** 对数/幂/平方根 ******** */

        records.set('log', x => {      // log base 10
            return Math.log10(x);
        });

        records.set('ln', x => {       // log base e
            return Math.log(x);
        });

        records.set('pow', (base, exp) => {
            return Math.pow(base, exp)
        });

        records.set('sqrt', x => {
            return Math.sqrt(x);
        });

        /* ******** 随机数 ******** */

        records.set('random', () => {
            return Math.random(); // 返回在范围 [0,1) 里的随机数
        });

        /* ******** 三角函数 ******** */

        records.set('sin', x => {
            return Math.sin(x); // 单位：弧度
        });

        records.set('cos', x => {
            return Math.cos(x);
        });

        records.set('tan', x => {
            return Math.tan(x);
        });

        records.set('asin', x => {
            return Math.asin(x);
        });

        records.set('acos', x => {
            return Math.acos(x);
        });

        records.set('atan', x => {
            return Math.atan(x);
        });
    }

    static addBuiltinConstants(records) {
        records.set('E', Math.E);
        records.set('PI', Math.PI);
    }
}

export { GlobalEnvironmentBuilder };