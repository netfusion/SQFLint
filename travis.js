/*
    DO NOT USE WITHOUT EXCLUSIVE PERMISSION

    SQFLint
    Author: NetFusion
    https://github.com/netfusion/SQFLint

    Description:
    Travis integration of SQFLint
*/

const fs = require('fs');
const path = require('path');

const Lexer = require('./classes/lexer');
const Parser = require('./classes/parser');

const readFilesSync = (dir, filter) => {
    let files = [];

    fs.readdirSync(dir).forEach(file => {
        file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
        files = files.concat(readFilesSync(file, filter));
    } else {
        if (file.match(filter)) files.push(file);
    }
});

    return files;
};

console.log('Validating SQF...');

let errors = 0;
const files = readFilesSync('../addons', /\.sqf$/);
files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
const tokens = Lexer.lex(content, file);
if (tokens[tokens.length - 1].type == 'eos') {
    errors = errors + Parser.parse(tokens, file, content);
} else {
    errors += 1;
}
});

console.log('Validating finished with ' + errors + ' errors.');

process.exit(errors);