"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reloadConfig = exports.getConfig = void 0;
const vscode = require("vscode");
let currentConfig;
const getConfig = () => {
    if (currentConfig === undefined) {
        (0, exports.reloadConfig)();
    }
    return currentConfig;
};
exports.getConfig = getConfig;
const reloadConfig = () => {
    var _a, _b, _c, _d, _e, _f;
    const config = vscode.workspace.getConfiguration('package-json-upgrade');
    const newConfig = {
        showUpdatesAtStart: config.get('showUpdatesAtStart') === true,
        skipNpmConfig: config.get('skipNpmConfig') === true,
        majorUpgradeColorOverwrite: (_a = config.get('majorUpgradeColorOverwrite')) !== null && _a !== void 0 ? _a : '',
        minorUpgradeColorOverwrite: (_b = config.get('minorUpgradeColorOverwrite')) !== null && _b !== void 0 ? _b : '',
        patchUpgradeColorOverwrite: (_c = config.get('patchUpgradeColorOverwrite')) !== null && _c !== void 0 ? _c : '',
        prereleaseUpgradeColorOverwrite: (_d = config.get('prereleaseUpgradeColorOverwrite')) !== null && _d !== void 0 ? _d : '',
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        decorationString: config.get('decorationString') || '\t\tUpdate available: %s',
        ignorePatterns: (_e = config.get('ignorePatterns')) !== null && _e !== void 0 ? _e : [],
        ignoreVersions: (_f = config.get('ignoreVersions')) !== null && _f !== void 0 ? _f : {},
    };
    currentConfig = newConfig;
};
exports.reloadConfig = reloadConfig;
//# sourceMappingURL=config.js.map