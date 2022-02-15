/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

class Environment {
    constructor(parent = null, records = new Map()) {
        this.parent = parent;
        this.records = records;
    }

    define(name, value) {
        if (this.records.has(name)) {
            throw new SyntaxError(`Identifier "${name}" has already been declared.`);
        }

        this.records.set(name, value);
        return value;
    }

    /**
     *
     * @returns return undefined when name not found.
     */
    getValue(name) {
        return this.records.get(name);
    }

    setValue(name, value) {
        this.records.set(name, value);
    }

    lookup(name) {
        return this.resolve(name).getValue(name);
    }

    assign(name, value) {
        this.resolve(name).setValue(name, value);
        return value;
    }

    /**
     * return the specified environment in which
     * an identifier is defined.
     * @param {*} name
     */
    resolve(name) {
        if (this.records.has(name)){
            return this;
        }

        if (this.parent == null) {
            throw new ReferenceError(`Identifier "${name}" is not defined.`);
        }

        return this.parent.resolve(name);
    }
}

export { Environment };