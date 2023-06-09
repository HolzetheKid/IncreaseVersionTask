"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tl = require("azure-pipelines-task-lib/task");
const vr = __importStar(require("./readWriteVersion"));
const utils = __importStar(require("./utils"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('======================================================');
            console.log(" Working directory:" + process.cwd());
            console.log("---config:---");
            console.log("   increase major:" + (config === null || config === void 0 ? void 0 : config.increaseMajor));
            console.log("   increase minor:" + (config === null || config === void 0 ? void 0 : config.increaseMinor));
            console.log("   increase patch:" + (config === null || config === void 0 ? void 0 : config.increasePatch));
            console.log("   increase build:" + (config === null || config === void 0 ? void 0 : config.increaseBuild));
            console.log("   project file:" + (config === null || config === void 0 ? void 0 : config.file));
            console.log('======================================================');
            var config = utils.readConfig();
            if ((config === null || config === void 0 ? void 0 : config.file) == '') {
                console.log("projectPath not set");
                tl.setResult(tl.TaskResult.Failed, 'project file not set');
                return;
            }
            console.log("---read version from" + (config === null || config === void 0 ? void 0 : config.file) + "---");
            var version = vr.read(config === null || config === void 0 ? void 0 : config.file);
            console.log("------");
            if ((config === null || config === void 0 ? void 0 : config.increaseMajor) && (version === null || version === void 0 ? void 0 : version.major) != undefined) {
                console.log("increase major ");
                var numberValue = +version.major;
                console.log("numbervalue " + numberValue);
                numberValue = numberValue + 1;
                version.major = numberValue.toString();
            }
            if ((config === null || config === void 0 ? void 0 : config.increaseMinor) && (version === null || version === void 0 ? void 0 : version.minor) != undefined) {
                console.log("increase minor ");
                var numberValue = +version.minor;
                numberValue = numberValue + 1;
                version.minor = numberValue.toString();
            }
            if ((config === null || config === void 0 ? void 0 : config.increasePatch) && (version === null || version === void 0 ? void 0 : version.patch) != undefined) {
                console.log("increase patch");
                var numberValue = +version.patch;
                numberValue = numberValue + 1;
                version.patch = numberValue.toString();
            }
            if ((config === null || config === void 0 ? void 0 : config.increaseBuild) && (version === null || version === void 0 ? void 0 : version.build) != undefined) {
                console.log("increase build ");
                var numberValue = +version.build;
                numberValue = numberValue + 1;
                version.build = numberValue.toString();
            }
            console.log("write new  version");
            vr.write(config === null || config === void 0 ? void 0 : config.file, version);
        }
        catch (err) {
            console.log(err);
            console.log(err.message);
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
run();
