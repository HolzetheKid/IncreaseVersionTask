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
    var increaseBuildStr = tl.getInput('increasePatch', true);
    var increasePatchStr = tl.getInput('increaseBuild', true);
    result.increaseMajor = Boolean(increaseMajorStr);
    result.increaseMinor = Boolean(increaseMinorStr);
    result.increasePatch = Boolean(increasePatchStr);
    result.increaseBuild = Boolean(increaseBuildStr);
    return result;
}
exports.readConfig = readConfig;
