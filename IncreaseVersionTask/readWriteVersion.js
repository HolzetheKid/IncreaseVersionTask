"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseVersion = exports.readCsProjectVersionSync = exports.readAssemblyVersionSync = exports.write = exports.read = void 0;
const tl = require("azure-pipelines-task-lib/task");
const fs = require("fs");
function read(path) {
    if (path.length == 0) {
        console.log("path is empty");
        return undefined;
    }
    console.log("reading file: " + path);
    try {
        var versionStr;
        if (path.endsWith(".csproj")) {
            versionStr = readCsProjectVersionSync(path);
            console.log("csproj VersionStr:" + versionStr);
        }
        else if (path.endsWith("AssemblyInfo.cs")) {
            versionStr = readAssemblyVersionSync(path);
            console.log("AssemblyInfo VersionStr:" + versionStr);
        }
        if (versionStr == undefined)
            return undefined;
        var result = parseVersion(versionStr);
        if (result == undefined)
            return undefined;
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
            console.log("NewVersionStr:" + newVersionStr);
            console.log("OldVersionStr:" + oldVersionStr);
            data = data.replace(oldVersionStr, newVersionStr);
            //  console.log("new Data:" + data)
        }
    }
    catch (err) {
        console.log(err);
        console.log(err.message);
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}
exports.write = write;
function readAssemblyVersionSync(filePath) {
    try {
        // Read the file content synchronously
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        // Regular expression pattern to match the AssemblyVersion line
        const versionPattern = /AssemblyVersion\("(\d+\.\d+\.\d+\.\d+)"/;
        // Extract the AssemblyVersion
        const match = versionPattern.exec(fileContent);
        if (match) {
            return match[1];
        }
    }
    catch (error) {
        // Handle file reading errors
        console.error('An error occurred while reading the file:', error);
    }
    return undefined;
}
exports.readAssemblyVersionSync = readAssemblyVersionSync;
function readCsProjectVersionSync(filePath) {
    try {
        var data = fs.readFileSync(filePath, "utf8");
        var startStr = "<AssemblyVersion>";
        var endStr = "</AssemblyVersion>";
        var start = data.indexOf(startStr) + startStr.length;
        var end = data.indexOf(endStr);
        return data.substring(start, end);
    }
    catch (error) {
        // Handle file reading errors
        console.error('An error occurred while reading the file:', error);
    }
    return undefined;
}
exports.readCsProjectVersionSync = readCsProjectVersionSync;
function parseVersion(versionStr) {
    try {
        const arr = versionStr.split(".");
        const result = {
            source: versionStr,
            major: arr[0],
            minor: arr[1],
            patch: arr[2],
            build: arr[3]
        };
        return result;
    }
    catch (error) {
        // Handle file reading errors
        console.error('An error occurred parsing versionstring : | ' + versionStr + ' |', error);
        return undefined;
    }
}
exports.parseVersion = parseVersion;
