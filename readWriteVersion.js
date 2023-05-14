"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.write = exports.read = void 0;
const tl = require("azure-pipelines-task-lib/task");
const fs = require("fs");
function read(path) {
    var result = {};
    if (path.length == 0) {
        console.log("path is empty");
        return undefined;
    }
    console.log("reading file: " + path);
    try {
        var data = fs.readFileSync(path, "utf8");
        if (path.endsWith(".csproj")) {
            var startStr = "<AssemblyVersion>";
            var endStr = "</AssemblyVersion>";
            var start = data.indexOf(startStr) + startStr.length;
            var end = data.indexOf(endStr);
            var versionstr = data.substring(start, end);
            console.log("VersionStr:" + versionstr);
            var arr = versionstr.split(".");
            result.source = versionstr;
            if (arr.length > 0)
                result.major = arr[0];
            if (arr.length > 1)
                result.minor = arr[1];
            if (arr.length > 2)
                result.patch = arr[2];
            if (arr.length > 3)
                result.build = arr[3];
        }
        console.log("Values:");
        console.log("   major:" + result.major);
        console.log("   minor:" + result.minor);
        console.log("   patch:" + result.patch);
        console.log("   build:" + result.build);
    }
    catch (err) {
        console.log(err);
        console.log(err.message);
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
    return result;
}
exports.read = read;
function write(path, version) {
    if (path.length == 0) {
        console.log("path is empty");
        return;
    }
    try {
        var data = fs.readFileSync(path, "utf8");
        if (path.endsWith(".csproj")) {
            var startStr = "<AssemblyVersion>";
            var endStr = "</AssemblyVersion>";
            var start = data.indexOf(startStr) + startStr.length;
            var end = data.indexOf(endStr);
            var newVersionStr = version.major + "." + version.minor + "." + version.patch + "." + version.build;
            var oldVersionStr = data.substring(data.indexOf(startStr), end);
            data = data.replace(oldVersionStr, newVersionStr);
            console.log("NewVersionStr:" + newVersionStr);
            console.log("OldVersionStr:" + oldVersionStr);
            console.log("new Data:" + data);
        }
    }
    catch (err) {
        console.log(err);
        console.log(err.message);
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}
exports.write = write;
