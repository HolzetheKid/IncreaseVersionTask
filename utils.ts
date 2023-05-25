import tl = require('azure-pipelines-task-lib/task');
import fs = require('fs');

 export function readConfig() : config |undefined{
    var result: config = {        }
   
    result.file = tl.getInput('projectfile', true);;
    
 
    var increaseMajorStr  = tl.getInput('increaseMajor', true);
    var increaseMinorStr  = tl.getInput('increaseMinor', true);
    var increaseBuildStr  = tl.getInput('increaseBuild', true);
    var increasePatchStr  = tl.getInput('increasePatch', true);

    result.increaseMajor = booleanify(increaseMajorStr);
    result.increaseMinor = booleanify(increaseMinorStr);
    result.increasePatch = booleanify(increasePatchStr);    
    result.increaseBuild = booleanify(increaseBuildStr);

    return result;
}


export interface config {
    file?: string
    increaseMajor?: boolean
    increaseMinor?: boolean
    increasePatch?: boolean
    increaseBuild?: boolean
}

//https://webtips.dev/solutions/convert-string-to-boolean-in-typescript
const booleanify = (value: string|undefined): boolean => {
    const truthy: string[] = [
        'true',
        'True',
        '1'
    ]


    if(value == undefined) return false;
    return truthy.includes(value)
}