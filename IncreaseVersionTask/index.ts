import tl = require('azure-pipelines-task-lib/task');
import fs from "fs";
import * as vr from './readWriteVersion'
import * as utils from './utils'

async function run() {
    try {
      
        console.log('======================================================');
        console.log(" Working directory:"+ process.cwd());
        console.log("---config:---");
        console.log("   increase major:" + config?.increaseMajor);
        console.log("   increase minor:" + config?.increaseMinor);
        console.log("   increase patch:" + config?.increasePatch);
        console.log("   increase build:" + config?.increaseBuild);
        console.log("   project file:" + config?.file);
        console.log('======================================================');

        var config = utils.readConfig();

        if (config?.file == '') {

            console.log("projectPath not set")
            tl.setResult(tl.TaskResult.Failed, 'project file not set');
                    
            return;
        }
      
        console.log("---read version from" + config?.file+ "---")
        var version = vr.read(config?.file!)
        console.log("------");
        
   

               
        if(config?.increaseMajor && version?.major!= undefined) {
            console.log("increase major ");
            var numberValue: number = +version.major;
            console.log("numbervalue "+ numberValue);
            numberValue = numberValue + 1
            version.major = numberValue.toString()
        }

        if(config?.increaseMinor && version?.minor!= undefined) {
            console.log("increase minor ");
            var numberValue: number = +version.minor;
            numberValue = numberValue + 1
            version.minor = numberValue.toString();
        }

        if(config?.increasePatch && version?.patch!= undefined) {
           
            console.log("increase patch");
            var numberValue: number = +version.patch;
            numberValue = numberValue + 1
            version.patch = numberValue.toString();
        }

        if(config?.increaseBuild && version?.build!= undefined) {
            console.log("increase build ");
            var numberValue: number = +version.build;
            numberValue = numberValue + 1
            version.build = numberValue.toString();
        }

        console.log("write new  version");
        vr.write(config?.file!, version!)

    }
    catch (err) {

        console.log(err)
        console.log((err as Error).message)
        tl.setResult(tl.TaskResult.Failed, (err as Error).message);
    }
}

run();

