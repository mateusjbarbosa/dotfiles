"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDependencyIgnored = exports.getIgnorePattern = void 0;
const vscode = require("vscode");
const config_1 = require("./config");
function getIgnorePattern() {
    const ignorePatterns = [];
    for (const pattern of (0, config_1.getConfig)().ignorePatterns) {
        try {
            ignorePatterns.push(new RegExp(pattern));
        }
        catch (err) {
            vscode.window.showErrorMessage(`Invalid ignore pattern ${pattern}${err instanceof Error ? `: ${err.message}` : ``}`);
        }
    }
    return ignorePatterns;
}
exports.getIgnorePattern = getIgnorePattern;
function isDependencyIgnored(dependencyName, ignorePatterns) {
    for (const ignorePattern of ignorePatterns) {
        if (ignorePattern.exec(dependencyName) !== null) {
            return true;
        }
    }
    return false;
}
exports.isDependencyIgnored = isDependencyIgnored;
//# sourceMappingURL=ignorePattern.js.map