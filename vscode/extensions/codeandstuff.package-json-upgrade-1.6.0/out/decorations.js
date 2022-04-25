"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDecoratorForUpdate = exports.decorateDiscreet = void 0;
const vscode_1 = require("vscode");
const config_1 = require("./config");
const decorateUpdatedPackage = ({ overviewRulerColor, light, dark, contentText, }) => {
    return vscode_1.window.createTextEditorDecorationType({
        isWholeLine: false,
        overviewRulerLane: vscode_1.OverviewRulerLane.Right,
        after: {
            margin: '2em',
            contentText,
        },
        overviewRulerColor,
        light,
        dark,
    });
};
const decorateMajorUpdate = (contentText) => {
    const settingsColor = (0, config_1.getConfig)().majorUpgradeColorOverwrite;
    return decorateUpdatedPackage({
        overviewRulerColor: 'red',
        light: { after: { color: getCorrectColor(settingsColor, '#C74632') } },
        dark: { after: { color: getCorrectColor(settingsColor, '#E03419') } },
        contentText,
    });
};
const decorateMinorUpdate = (contentText) => {
    const settingsColor = (0, config_1.getConfig)().minorUpgradeColorOverwrite;
    return decorateUpdatedPackage({
        overviewRulerColor: 'yellow',
        light: { after: { color: getCorrectColor(settingsColor, '#ABAB00') } },
        dark: { after: { color: getCorrectColor(settingsColor, '#F8FF99') } },
        contentText,
    });
};
const decoratePatchUpdate = (contentText) => {
    const settingsColor = (0, config_1.getConfig)().patchUpgradeColorOverwrite;
    return decorateUpdatedPackage({
        overviewRulerColor: 'green',
        light: { after: { color: getCorrectColor(settingsColor, '#009113') } },
        dark: { after: { color: getCorrectColor(settingsColor, '#19E034') } },
        contentText,
    });
};
const decoratePrereleaseUpdate = (contentText) => {
    const settingsColor = (0, config_1.getConfig)().prereleaseUpgradeColorOverwrite;
    return decorateUpdatedPackage({
        overviewRulerColor: 'purple',
        light: { after: { color: getCorrectColor(settingsColor, '#C433FF') } },
        dark: { after: { color: getCorrectColor(settingsColor, '#EC33FF') } },
        contentText,
    });
};
const getCorrectColor = (settingsColor, defaultColor) => {
    if (settingsColor === '') {
        return defaultColor;
    }
    if (settingsColor.startsWith('#')) {
        return settingsColor;
    }
    else {
        return `#${settingsColor}`;
    }
};
const decorateDiscreet = (contentText) => {
    return decorateUpdatedPackage({
        overviewRulerColor: 'darkgray',
        light: { color: 'lightgray', after: { color: 'lightgray' } },
        dark: { color: 'darkgray', after: { color: 'darkgray' } },
        contentText,
    });
};
exports.decorateDiscreet = decorateDiscreet;
// "major" | "premajor" | "minor" | "preminor" | "patch" | "prepatch" | "prerelease";
const getDecoratorForUpdate = (releaseType, latestVersion, currentVersionExisting) => {
    switch (releaseType) {
        case 'major':
        case 'premajor':
            return decorateMajorUpdate(getUpdateDescription(latestVersion, currentVersionExisting));
        case 'minor':
        case 'preminor':
            return decorateMinorUpdate(getUpdateDescription(latestVersion, currentVersionExisting));
        case 'patch':
        case 'prepatch':
            return decoratePatchUpdate(getUpdateDescription(latestVersion, currentVersionExisting));
        case 'prerelease':
            return decoratePrereleaseUpdate(getUpdateDescription(latestVersion, currentVersionExisting));
        case null:
        default:
            return undefined;
    }
};
exports.getDecoratorForUpdate = getDecoratorForUpdate;
function getUpdateDescription(latestVersion, currentVersionExisting) {
    const versionString = (0, config_1.getConfig)().decorationString.replace('%s', latestVersion);
    if (currentVersionExisting) {
        return versionString;
    }
    else {
        return `${versionString} (current version not found)`;
    }
}
//# sourceMappingURL=decorations.js.map