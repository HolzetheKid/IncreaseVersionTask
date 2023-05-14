import tl = require('azure-pipelines-task-lib/task');
import fs = require('fs');

 export function readConfig() : config |undefined{
    var result: config = {        }
   
    result.file = tl.getInput('projectfile', true);;
    
 
    var increaseMajorStr  = tl.getInput('increaseMajor', true);
    var increaseMinorStr  = tl.getInput('increaseMinor', true);
    var increaseBuildStr  = tl.getInput('increasePatch', true);
    var increasePatchStr  = tl.getInput('increaseBuild', true);

    result.increaseMajor = Boolean(increaseMajorStr);
    result.increaseMinor = Boolean(increaseMinorStr);
    result.increasePatch = Boolean(increasePatchStr);    
    result.increaseBuild = Boolean(increaseBuildStr);

    return result;
}


export interface config {
    file?: string
    increaseMajor?: boolean
    increaseMinor?: boolean
    increasePatch?: boolean
    increaseBuild?: boolean
}


