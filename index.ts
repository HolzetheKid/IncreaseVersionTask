import tl = require('azure-pipelines-task-lib/task');
import fs from "fs";
import * as vr from './readWriteVersion'
import * as utils from './utils'

async function run() {
    try {
      
        var config = utils.readConfig();

        if (config?.file == '') {

            console.log("projectPath not set")
            tl.setResult(tl.TaskResult.Failed, 'project file not set');
                    
            return;
        }
        
        console.log("read version from" + config?.file)
        var version = vr.read(config?.file!)

        console.log("increase version");
        if(config?.increaseMajor && version?.major!= undefined) {
            version.major = version.major+1
        }
        if(config?.increaseMinor && version?.minor!= undefined) {
            version.major = version.minor+1
        }

        if(config?.increasePatch && version?.patch!= undefined) {
            version.major = version.patch+1
        }

        if(config?.increaseMajor && version?.major!= undefined) {
            version.major = version.major+1
        }

        console.log("write new  version");
        vr.write(config?.file!, version!)

    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, (err as Error).message);
    }
}

run();

