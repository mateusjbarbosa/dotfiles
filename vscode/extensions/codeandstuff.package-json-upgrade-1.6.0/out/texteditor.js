"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearDecorations = exports.handleFileDecoration = void 0;
const vscode = require("vscode");
const decorations_1 = require("./decorations");
const ignorePattern_1 = require("./ignorePattern");
const npm_1 = require("./npm");
const packageJson_1 = require("./packageJson");
const types_1 = require("./types");
const handleFileDecoration = (document, showDecorations) => {
    if (showDecorations === false) {
        (0, exports.clearDecorations)();
        return;
    }
    if ((0, packageJson_1.isPackageJson)(document)) {
        loadDecoration(document);
    }
};
exports.handleFileDecoration = handleFileDecoration;
// TODO maybe have cooler handling of decorationtypes? Investigate!
let currentDecorationTypes = [];
const clearDecorations = () => {
    currentDecorationTypes.forEach((d) => d.dispose());
    currentDecorationTypes = [];
};
exports.clearDecorations = clearDecorations;
const loadDecoration = (document) => __awaiter(void 0, void 0, void 0, function* () {
    const dependencyLineLimits = (0, packageJson_1.getDependencyLineLimits)(document);
    const textEditor = getTextEditorFromDocument(document);
    if (textEditor === undefined) {
        return;
    }
    // Add "loading" to each dependency group
    if (currentDecorationTypes.length === 0) {
        dependencyLineLimits.forEach((lineLimit) => {
            const lineText = document.lineAt(lineLimit.startLine).text;
            const range = new vscode.Range(new vscode.Position(lineLimit.startLine, lineText.length), new vscode.Position(lineLimit.startLine, lineText.length));
            const loadingUpdatesDecoration = (0, decorations_1.decorateDiscreet)('Loading updates...');
            textEditor.setDecorations(loadingUpdatesDecoration, [
                {
                    range,
                },
            ]);
            currentDecorationTypes.push(loadingUpdatesDecoration);
        });
    }
    yield (0, npm_1.refreshPackageJsonData)(document);
    const ignorePatterns = (0, ignorePattern_1.getIgnorePattern)();
    (0, exports.clearDecorations)();
    Array.from({ length: document.lineCount })
        .map((_, index) => index)
        .filter((index) => {
        const lineLimit = (0, packageJson_1.getLineLimitForLine)(document, index, dependencyLineLimits);
        return lineLimit !== undefined && lineLimit.isPeerDependency === false;
    })
        .forEach((index) => {
        const lineText = document.lineAt(index).text;
        const dep = (0, packageJson_1.parseDependencyLine)(lineText);
        if (dep === undefined) {
            return;
        }
        if ((0, ignorePattern_1.isDependencyIgnored)(dep.dependencyName, ignorePatterns)) {
            return;
        }
        const range = new vscode.Range(new vscode.Position(index, lineText.length), new vscode.Position(index, lineText.length));
        const npmCache = (0, npm_1.getCachedNpmData)(dep.dependencyName);
        if (npmCache === undefined) {
            return;
        }
        if (npmCache.asyncstate === types_1.AsyncState.Rejected) {
            const notFoundDecoration = (0, decorations_1.decorateDiscreet)('Dependency not found');
            textEditor.setDecorations(notFoundDecoration, [
                {
                    range,
                },
            ]);
            currentDecorationTypes.push(notFoundDecoration);
            return;
        }
        if (npmCache.item === undefined) {
            return;
        }
        const possibleUpgrades = (0, npm_1.getPossibleUpgrades)(npmCache.item.npmData, dep.currentVersion, dep.dependencyName);
        let decorator;
        if (possibleUpgrades.major !== undefined) {
            // TODO add info about patch version?
            decorator = (0, decorations_1.getDecoratorForUpdate)('major', possibleUpgrades.major.version, possibleUpgrades.existingVersion);
        }
        else if (possibleUpgrades.minor !== undefined) {
            decorator = (0, decorations_1.getDecoratorForUpdate)('minor', possibleUpgrades.minor.version, possibleUpgrades.existingVersion);
        }
        else if (possibleUpgrades.patch !== undefined) {
            decorator = (0, decorations_1.getDecoratorForUpdate)('patch', possibleUpgrades.patch.version, possibleUpgrades.existingVersion);
        }
        else if (possibleUpgrades.prerelease !== undefined) {
            decorator = (0, decorations_1.getDecoratorForUpdate)('prerelease', possibleUpgrades.prerelease.version, possibleUpgrades.existingVersion);
        }
        else if (possibleUpgrades.validVersion === false) {
            decorator = (0, decorations_1.decorateDiscreet)('Failed to parse version');
        }
        else {
            decorator = undefined;
        }
        if (decorator !== undefined) {
            currentDecorationTypes.push(decorator);
            textEditor.setDecorations(decorator, [
                {
                    range,
                },
            ]);
        }
    });
});
const getTextEditorFromDocument = (document) => {
    return vscode.window.visibleTextEditors.find((textEditor) => {
        return textEditor.document === document;
    });
};
//# sourceMappingURL=texteditor.js.map