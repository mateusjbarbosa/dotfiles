"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAll = void 0;
const vscode = require("vscode");
const ignorePattern_1 = require("./ignorePattern");
const npm_1 = require("./npm");
const packageJson_1 = require("./packageJson");
const util_1 = require("./util/util");
const updateAll = (textEditor) => {
    if (textEditor === undefined) {
        return [];
    }
    const document = textEditor.document;
    if ((0, packageJson_1.isPackageJson)(document)) {
        const ignorePatterns = (0, ignorePattern_1.getIgnorePattern)();
        const dependencyLineLimits = (0, packageJson_1.getDependencyLineLimits)(document);
        const edits = Array.from({ length: document.lineCount })
            .map((_, index) => index)
            .filter((index) => {
            const lineLimit = (0, packageJson_1.getLineLimitForLine)(document, index, dependencyLineLimits);
            return lineLimit !== undefined && lineLimit.isPeerDependency === false;
        })
            .map((index) => {
            const lineText = document.lineAt(index).text;
            const wholeLineRange = new vscode.Range(index, 0, index, lineText.length);
            const dep = (0, packageJson_1.parseDependencyLine)(lineText);
            if (dep === undefined) {
                return;
            }
            if ((0, ignorePattern_1.isDependencyIgnored)(dep.dependencyName, ignorePatterns)) {
                return;
            }
            const npmCache = (0, npm_1.getCachedNpmData)(dep.dependencyName);
            if ((npmCache === null || npmCache === void 0 ? void 0 : npmCache.item) === undefined) {
                return;
            }
            const latestVersion = (0, npm_1.getLatestVersion)(npmCache.item.npmData, dep.currentVersion, dep.dependencyName);
            if (latestVersion === undefined) {
                return;
            }
            const currentExactVersion = (0, npm_1.getExactVersion)(dep.currentVersion);
            const newLineText = (0, util_1.replaceLastOccuranceOf)(lineText, currentExactVersion, latestVersion.version);
            return {
                range: wholeLineRange,
                text: newLineText,
            };
        })
            .filter((edit) => edit !== undefined);
        textEditor.edit((editBuilder) => {
            edits.forEach((edit) => {
                editBuilder.replace(edit.range, edit.text);
            });
        });
        return edits;
    }
    else {
        vscode.window.showWarningMessage('Update failed: File not recognized as valid package.json');
        return [];
    }
};
exports.updateAll = updateAll;
//# sourceMappingURL=updateAll.js.map