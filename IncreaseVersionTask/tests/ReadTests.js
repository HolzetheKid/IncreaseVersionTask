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
Object.defineProperty(exports, "__esModule", { value: true });
const read = __importStar(require("../readWriteVersion"));
const assert = __importStar(require("assert"));
describe('read versionnumber Tests', () => {
    it("pass assemblyInforcs should return right version values", () => {
        const result = read.read('.\\tests\\samples\\AssemblyInfo.cs');
        assert.equal(result === null || result === void 0 ? void 0 : result.major, '1');
        assert.equal(result === null || result === void 0 ? void 0 : result.minor, '0');
        assert.equal(result === null || result === void 0 ? void 0 : result.patch, '0');
        assert.equal(result === null || result === void 0 ? void 0 : result.build, '5');
    });
    it('pass csprojec should return right version values', () => {
        const result = read.read('.\\tests\\samples\\WpfApp2.csproj');
        assert.equal(result === null || result === void 0 ? void 0 : result.major, '1');
        assert.equal(result === null || result === void 0 ? void 0 : result.minor, '0');
        assert.equal(result === null || result === void 0 ? void 0 : result.patch, '1');
        assert.equal(result === null || result === void 0 ? void 0 : result.build, '1');
    });
    it('pass txt should return undefined', () => {
        const result = read.read('.\\tests\\samples\\RandomFile.txt');
        assert.equal(result, undefined);
    });
    it('pass code file should return undefined', () => {
        const result = read.read('.\\tests\\samples\\RandomCode.cs');
        assert.equal(result, undefined);
    });
    it('pass file not exists should return undefined', () => {
        const result = read.read('.\\tests\\samples\\RandomFilexxxx.txt');
        assert.equal(result, undefined);
    });
});
