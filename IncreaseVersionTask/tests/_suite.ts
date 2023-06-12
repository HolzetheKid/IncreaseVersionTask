import * as path from 'path';
import * as assert from 'assert';
import * as ttm from 'azure-pipelines-task-lib/mock-test';

describe('Sample task tests', function () {

    before( function() {

    });

    after(() => {

    });



    it('execute read assembyl.cs', function(done: Mocha.Done) {
        this.timeout(1000);
    
        let tp = path.join(__dirname, 'AssemblyTests.js');
        let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
    
        tr.run();
        console.log(tr.succeeded);
        assert.equal(tr.succeeded, true, 'should not failed');
    
    
        done();
    });


    it('execute read csproj', function(done: Mocha.Done) {
        this.timeout(1000);
    
        let tp = path.join(__dirname, 'csProjectTests.js');
        let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
    
        tr.run();
        console.log(tr.succeeded);
        assert.equal(tr.succeeded, true, 'should not failed');
       
        done();
    });

    // it('execute read tests', function(done: Mocha.Done) {
    //     this.timeout(1000);
    
    //     let tp = path.join(__dirname, 'readtests.js');
    //     let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
    
    //     tr.run();
    //     console.log(tr.succeeded);
    //     assert.equal(tr.succeeded, true, 'should not failed');
        
    //     done();
    // });
});

