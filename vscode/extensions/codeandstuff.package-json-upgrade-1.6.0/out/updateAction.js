"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAction = void 0;
const vscode = require("vscode");
const extension_1 = require("./extension");
const npm_1 = require("./npm");
const packageJson_1 = require("./packageJson");
const util_1 = require("./util/util");
class UpdateAction {
    provideCodeActions(document, range) {
        const lineLimit = (0, packageJson_1.getLineLimitForLine)(document, range.start.line);
        if ((0, packageJson_1.isPackageJson)(document) === false || lineLimit === undefined) {
            return;
        }
        if (range.isSingleLine === false) {
            return;
        }
        const lineText = document.lineAt(range.start.line).text;
        const dep = (0, packageJson_1.parseDependencyLine)(lineText);
        if (dep === undefined) {
            return;
        }
        const npmCache = (0, npm_1.getCachedNpmData)(dep.dependencyName);
        if (npmCache === undefined || npmCache.item === undefined) {
            return;
        }
        const wholeLineRange = new vscode.Range(range.start.line, 0, range.start.line, lineText.length);
        const actions = [];
        if (lineLimit.isPeerDependency === false) {
            const possibleUpgrades = (0, npm_1.getPossibleUpgrades)(npmCache.item.npmData, dep.currentVersion, dep.dependencyName);
            if (possibleUpgrades.major !== undefined) {
                actions.push(this.createFix(document, wholeLineRange, 'major', dep.currentVersion, possibleUpgrades.major.version));
            }
            if (possibleUpgrades.minor !== undefined) {
                actions.push(this.createFix(document, wholeLineRange, 'minor', dep.currentVersion, possibleUpgrades.minor.version));
            }
            if (possibleUpgrades.patch !== undefined) {
                actions.push(this.createFix(document, wholeLineRange, 'patch', dep.currentVersion, possibleUpgrades.patch.version));
            }
            if (possibleUpgrades.prerelease !== undefined) {
                actions.push(this.createFix(document, wholeLineRange, 'prerelease', dep.currentVersion, possibleUpgrades.prerelease.version));
            }
        }
        if (npmCache.item.npmData.homepage !== undefined) {
            const commandAction = this.createHomepageCommand(npmCache.item.npmData.homepage);
            actions.push(commandAction);
        }
        const changelog = (0, npm_1.getCachedChangelog)(dep.dependencyName);
        if (changelog !== undefined && changelog.item !== undefined) {
            const commandAction = this.createChangelogCommand(changelog.item);
            actions.push(commandAction);
        }
        return actions;
    }
    createFix(document, range, type, rawCurrentVersion, newVersion) {
        const lineText = document.lineAt(range.start.line).text;
        const currentVersion = (0, npm_1.getExactVersion)(rawCurrentVersion);
        const newLineText = (0, util_1.replaceLastOccuranceOf)(lineText, currentVersion, newVersion);
        const fix = new vscode.CodeAction(`Do ${type} upgrade to ${newVersion}`, vscode.CodeActionKind.Empty);
        fix.edit = new vscode.WorkspaceEdit();
        fix.edit.replace(document.uri, range, newLineText);
        return fix;
    }
    createHomepageCommand(url) {
        const action = new vscode.CodeAction('Open homepage', vscode.CodeActionKind.Empty);
        action.command = {
            command: extension_1.OPEN_URL_COMMAND,
            title: 'Open homepage',
            tooltip: 'This will open the dependency homepage.',
            arguments: [url],
        };
        return action;
    }
    createChangelogCommand(url) {
        const action = new vscode.CodeAction('Open changelog', vscode.CodeActionKind.Empty);
        action.command = {
            command: extension_1.OPEN_URL_COMMAND,
            title: 'Open changelog',
            tooltip: 'This will open the dependency changelog.',
            arguments: [url],
        };
        return action;
    }
}
exports.UpdateAction = UpdateAction;
UpdateAction.providedCodeActionKinds = [vscode.CodeActionKind.QuickFix];
//# sourceMappingURL=updateAction.js.map