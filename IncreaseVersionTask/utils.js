"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readConfig = void 0;
const tl = require("azure-pipelines-task-lib/task");
function readConfig() {
    var result = {};
    result.file = tl.getInput('projectfile', true);
    ;
    var increaseMajorStr = tl.getInput('increaseMajor', true);
    var increaseMinorStr = tl.getInput('increaseMinor', true);
    var increaseBuildStr = tl.getInput('increaseBuild', true);
    var increasePatchStr = tl.getInput('increasePatch', true);
    result.increaseMajor = booleanify(increaseMajorStr);
    result.increaseMinor = booleanify(increaseMinorStr);
    result.increasePatch = booleanify(increasePatchStr);
    result.increaseBuild = booleanify(increaseBuildStr);
    return result;
}
exports.readConfig = readConfig;
//https://webtips.dev/solutions/convert-string-to-boolean-in-typescript
const booleanify = (value) => {
    const truthy = [
        'true',
        'True',
        '1'
    ];
    if (value == undefined)
        return false;
    return truthy.includes(value);
};
