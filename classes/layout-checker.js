/*
 DO NOT USE WITHOUT EXCLUSIVE PERMISSION

 SQFLint
 Author: NetFusion
 https://github.com/netfusion/SQFLint

 Description:
 Parser class for SQFLint
 */

const Parser = require('./parser');

class LayoutChecker extends Parser {
    static checkLayout(tokens, filename, content) {
        const layoutChecker = new LayoutChecker(tokens, filename, content);
        try {
            layoutChecker.check();
        } catch (e) {
            return 1;
        }
        return 0;
    }

    check() {
        this.expect('preprocessor-start');
        const macroInclude = this.expect('preprocessor-include');
        if (macroInclude.value != 'macros.hpp') this.error('Unknown include path: {0}', macroInclude.value);
        this.expect('newline');
        const fileHeader = this.expect('blockComment');
        //console.log(fileHeader);
        this.expect('blank');
    }
}

module.exports = LayoutChecker;