"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPackageJson = exports.parseDependencyLine = exports.getLineLimitForLine = exports.getDependencyLineLimits = void 0;
// TODO this function is still a hax that breakes if you have a "dependency" key higher up in package.json.
// It would be nice with a function that works correctly.
const getDependencyLineLimits = (document) => {
    const limits = [];
    const devDependencies = getFlatTagStartEnd(document, /\s*"devDependencies"\s*:/, false);
    if (devDependencies !== undefined) {
        limits.push(devDependencies);
    }
    const peerDependencies = getFlatTagStartEnd(document, /\s*"peerDependencies"\s*:/, true);
    if (peerDependencies !== undefined) {
        limits.push(peerDependencies);
    }
    const dependencies = getFlatTagStartEnd(document, /\s*"dependencies"\s*:/, false);
    if (dependencies !== undefined) {
        limits.push(dependencies);
    }
    return limits;
};
exports.getDependencyLineLimits = getDependencyLineLimits;
// lineLimits can be supplied here to save some cpu
const getLineLimitForLine = (document, line, lineLimits) => {
    if (lineLimits === undefined) {
        lineLimits = (0, exports.getDependencyLineLimits)(document);
    }
    return lineLimits.find((limit) => limit.startLine < line && limit.endLine > line);
};
exports.getLineLimitForLine = getLineLimitForLine;
const parseDependencyLine = (line) => {
    const regexResult = /\s*"([^"]*)"\s*:\s*"([^"]*)"\s*/.exec(line);
    if (regexResult === null || regexResult.length !== 3) {
        console.error(`detected weird dependency string: ${line}`);
        return undefined;
    }
    return {
        dependencyName: regexResult[1],
        currentVersion: regexResult[2],
    };
};
exports.parseDependencyLine = parseDependencyLine;
const getFlatTagStartEnd = (document, regexp, isPeerDependency) => {
    // TODO this whole limit detection is nooby. How to do it smarter? Is there a cool library for parsing json and finding lines in it?
    const array = Array.from({ length: document.lineCount }).map((_, index) => index);
    const startLine = array.find((i) => {
        const lineText = document.lineAt(i).text;
        return regexp.test(lineText);
    });
    if (startLine === undefined) {
        return undefined;
    }
    // detect if it opens and closes on same line:
    if (document.lineAt(startLine).text.includes('}')) {
        return undefined;
    }
    const endLine = array.slice(startLine + 1).find((i) => {
        return document.lineAt(i).text.includes('}');
    });
    if (endLine === undefined) {
        return undefined;
    }
    return {
        startLine,
        endLine,
        isPeerDependency,
    };
};
const isPackageJson = (document) => {
    // Is checking both slashes necessary? Test on linux and mac.
    return document.fileName.endsWith('\\package.json') || document.fileName.endsWith('/package.json');
};
exports.isPackageJson = isPackageJson;
//# sourceMappingURL=packageJson.js.map