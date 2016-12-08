'use strict';

import gulp from 'gulp';
import rootConfig from 'unchained_ui/tools/tasks/__config';
import appConfig from './tools/tasks/__config';
import gulpTasks from 'unchained_ui/gulpfile.babel';


var config = gulpTasks.mergeConfigs(rootConfig, appConfig);
// Load each custom task
gulpTasks.tasks.forEach((task) => {
  task(gulp, config);
});