var url = require('url');
var http = require('http');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var fs = require('fs');
var log = hexo.log;
//var watch = require('watch');
//var rHiddenFile = /^_|\/_|[~%]$/;

//var sourceDir = hexo.source_dir;
/*
watch.watchTree(sourceDir, {
        ignoreDotFiles: true,
        interval: 1000,
        filter: function(src){
          return rHiddenFile.test(src.substring(sourceDir.length + 1));
        }
      },function(xx,xxx){
        console.log(xx);
      });
*/
var updateGoogleAnalyticsFile = function() {
    var cp = require('child_process');
    console.log('同步七牛存储...');
    //exec可以像spawn一样使用
    var ls = cp.exec('qrsync/qrsync qrsync/qn.json', {} /*options, [optional]*/ );
    
    ls.stdout.on('data', function(data) {
        console.log(data);
    });

    ls.stderr.on('data', function(data) {
        console.error(data);
    });

    ls.on('exit', function(code) {
        if (code == 0) {
            console.log('同步七牛存储成功');
        } else {
            console.error('同步七牛存储成功');
        }
    });
};
/*
hexo.on('ready', function() {
    log.i('监听cdn文件夹..');
    updateGoogleAnalyticsFile();
    fs.watch('source/cdn', function(event, filename) {
        updateGoogleAnalyticsFile();
        console.log('event is: ' + event);
        if (filename) {
            console.log('filename provided: ' + filename);
        } else {
            console.log('filename not provided');
        }
    });
});
*/
