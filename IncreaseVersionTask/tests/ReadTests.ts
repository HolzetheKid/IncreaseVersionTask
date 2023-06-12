
import * as read from '../readWriteVersion'
import * as assert from 'assert';

describe('read versionnumber Tests', () => {
    it("pass assemblyInforcs should return right version values", () => {
    const result = read.read('.\\tests\\samples\\AssemblyInfo.cs');
    assert.equal(result?.major, '1' );
    assert.equal(result?.minor, '0' );
    assert.equal(result?.patch, '0' );
    assert.equal(result?.build, '5' );
 });

 it('pass csprojec should return right version values', () => {
    const result = read.read('.\\tests\\samples\\WpfApp2.csproj');
    assert.equal(result?.major, '1' );
    assert.equal(result?.minor, '0' );
    assert.equal(result?.patch, '1' );
    assert.equal(result?.build, '1' );
 });

 it('pass txt should return undefined', () => {
    const result = read.read('.\\tests\\samples\\RandomFile.txt');
    assert.equal(result, undefined );
 });

 it('pass code file should return undefined', () => {
    const result = read.read('.\\tests\\samples\\RandomCode.cs');
    assert.equal(result, undefined );
 });

 it('pass file not exists should return undefined', () => {
    const result = read.read('.\\tests\\samples\\RandomFilexxxx.txt');
    assert.equal(result, undefined );
 });
});

