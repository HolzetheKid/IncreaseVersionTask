"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tmrm = require("azure-pipelines-task-lib/mock-run");
const path = require("path");
let taskPath = path.join(__dirname, '..', 'index.js');
let tmr = new tmrm.TaskMockRunner(taskPath);
tmr.setInput('projectfile', '.\\tests\\samples\\WpfApp2.csproj');
tmr.setInput('samplestring', 'human2');
tmr.run();
