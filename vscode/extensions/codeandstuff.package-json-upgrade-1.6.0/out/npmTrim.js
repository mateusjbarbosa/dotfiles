"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimNpmVersion = exports.trimNpmData = exports.trimNpmCache = void 0;
const util_1 = require("./util/util");
// removes all data that we dont use
const trimNpmCache = (cache) => {
    //
    return (0, util_1.objectEntries)(cache).reduce((partialCache, [key, value]) => {
        return Object.assign(Object.assign({}, partialCache), { [key]: {
                asyncstate: value.asyncstate,
                item: value.item ? trimCacheItem(value.item) : undefined,
            } });
    }, {});
};
exports.trimNpmCache = trimNpmCache;
const trimCacheItem = (cacheItem) => {
    return {
        date: cacheItem.date,
        npmData: (0, exports.trimNpmData)(cacheItem.npmData),
    };
};
const trimNpmData = (npmData) => {
    return {
        'dist-tags': npmData['dist-tags'],
        versions: (0, util_1.objectEntries)(npmData.versions).reduce((partialNpmData, [key, value]) => (Object.assign(Object.assign({}, partialNpmData), { [key]: (0, exports.trimNpmVersion)(value) })), {}),
        homepage: npmData.homepage,
    };
};
exports.trimNpmData = trimNpmData;
const trimNpmVersion = (versionData) => {
    return {
        name: versionData.name,
        version: versionData.version,
    };
};
exports.trimNpmVersion = trimNpmVersion;
//# sourceMappingURL=npmTrim.js.map