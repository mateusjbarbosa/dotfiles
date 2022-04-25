"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceLastOccuranceOf = exports.objectEntries = exports.objectKeys = void 0;
const objectKeys = (obj) => {
    const entries = Object.keys(obj);
    return entries;
};
exports.objectKeys = objectKeys;
function objectEntries(obj) {
    const entries = Object.entries(obj);
    return entries;
}
exports.objectEntries = objectEntries;
const replaceLastOccuranceOf = (s, replace, replaceWith) => {
    const indexOfReplace = s.lastIndexOf(replace);
    if (indexOfReplace !== -1) {
        return s.substr(0, indexOfReplace) + replaceWith + s.substr(indexOfReplace + replace.length);
    }
    else {
        return s;
    }
};
exports.replaceLastOccuranceOf = replaceLastOccuranceOf;
//# sourceMappingURL=util.js.map