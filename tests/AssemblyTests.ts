import ma = require('azure-pipelines-task-lib/mock-answer');
import tmrm = require('azure-pipelines-task-lib/mock-run');
import path = require('path');

let taskPath = path.join(__dirname, '..', 'index.js');
let tmr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);

tmr.setInput('projectfile', '.\\tests\\samples\\AssemblyInfo.cs');
tmr.setInput('increaseMajor', 'false');
tmr.setInput('increaseMinor', 'false');
tmr.setInput('increasePatch', 'false');
tmr.setInput('increaseBuild', 'true');

tmr.run();