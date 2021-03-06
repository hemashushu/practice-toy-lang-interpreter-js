// original from https://github.com/DmitrySoshnikov/letter-rdp-source

/**
 * tokenizer spec
 */
const Spec = [
    // Whitespace
    [/^\s+/, null],

    // Comments
    [/^\/\/.*/, null],              // single line comment "//..."
    [/^\/\*[\s\S]*?\*\//, null],    // multi line comment "/*...*/"

    // Logical operators
    [/^&&/,'LOGICAL_AND'],                  // &&
    [/^\|\|/,'LOGICAL_OR'],                 // ||

    // Equality operators
    [/^[!=]=/, 'EQUALITY_OPERATOR'],        // ==, !=

    // Relational operators
    [/^[><]=?/, 'RELATIONAL_OPERATOR'],     // >= <= > <

    // Assignment operators
    [/^[*/+-]=/, 'COMPLEX_ASSIGN'],         // +=, -=, *=, /=
    [/^=/, 'SIMPLE_ASSIGN'],                // =

    // Math operators
    [/^[+-]/, 'ADDITIVE_OPERATOR'],         // + -
    [/^[*\/]/, 'MULTIPLICATIVE_OPERATOR'],  // * /

    // Unary operators
    [/^!/,'LOGICAL_NOT'],                   // "!"

    [/^#{/, '#{'],      // #{   // map start
    [/^:/, ':'],        // :

    // Symbols, delimiters
    [/^;/, ';'],        // ;
    [/^{/, '{'],        // {
    [/^}/, '}'],        // }
    [/^\(/, '('],       // (
    [/^\)/, ')'],       // )
    [/^\[/, '['],       // [
    [/^\]/, ']'],       // ]

    [/^,/, ','],        // ,
    [/^\./, '.'],       // .

    // Keywords
    [/^\blet\b/, 'let'],        // let
    [/^\bif\b/, 'if'],          // if
    [/^\belse\b/, 'else'],      // else
    [/^\bwhile\b/,'while'],     // while
    [/^\bdo\b/,'do'],           // do
    [/^\bfor\b/,'for'],         // for
    [/^\bfunction\b/,'function'],         // function
    [/^\bconstructor\b/,'constructor'],   // constructor
    [/^\breturn\b/,'return'],   // return
    [/^\bclass\b/,'class'],     // class
    [/^\bextends\b/,'extends'], // extends
    [/^\bnew\b/,'new'],         // new

    [/^\btrue\b/, 'TRUE'],      // true
    [/^\bfalse\b/, 'FALSE'],    // false
    [/^\bnull\b/, 'NULL'],      // null

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