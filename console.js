/**
 * 通过拦截consoel.log和console.error来实现打印日志功能
 */
var consoleDebug = {
  init: function (){
    var t = this;
    if(location.href.indexOf('consoledebug')>=0){
      window.onload = function(){
        t.bind()
      };
      var style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML="body{margin:0;padding:0}.debuggerWrap{position:fixed;top:0;right:0;left:0;overflow:hidden;background:#000;opacity:.7;z-index:99999;color:#fff}.debuggerWrap p{padding:0;margin:0;word-break:break-all}.debuggerWrap .debuggerWrap-head{text-align:right}.debuggerWrap .debuggerWrap-head span{margin-right:14px}.debuggerWrap .debuggerWrap-content{padding:10px;height:260px;overflow-y:auto;font-size:14px}.debuggerWrap .debuggerWrap-content .console-title{margin-right:10px}.debuggerWrap .debuggerWrap-content .console-log{color:#fff}.debuggerWrap .debuggerWrap-content .console-log .console-title{color:#02a5fd}.debuggerWrap .debuggerWrap-content .console-error{color:#f00}";
      document.getElementsByTagName('HEAD').item(0).appendChild(style);
    }
  },
  bind: function (){
    var t = this;
    document.querySelector('.debugger-hide').addEventListener('click', function(){
      document.querySelector('.debuggerWrap-content').hidden = true;
    })
    document.querySelector('.debugger-show').addEventListener('click', function(){
      document.querySelector('.debuggerWrap-content').hidden = false;
    })
    document.querySelector('.debugger-clear').addEventListener('click', function(){
      document.querySelector('.debuggerWrap-content').innerHTML = '';
    })
    this.rewrite()
  },
  rewrite: function(){
    var t = this;
    var log = console.log;
    console.log = function(text) {
      if(typeof text == 'object'){
        text = JSON.stringify(text);
      }
      log(text);
      t.log(text, 'log');
    }
    var error = console.error;
    console.error = function(text) {
      if(typeof text == 'object'){
        text = JSON.stringify(text);
      }
      error(text);
      t.log(text, 'error');
    }
    console.log('开启调试模式');
  },
  log: function(text, type){
    var P = document.createElement('P');
    P.className = type == 'log' ? 'console-log' : 'console-error';
    P.innerHTML = new Date().toLocaleTimeString() +(type == 'log' ? ' [log] ' : ' [error] ') + text;
    var $content = document.querySelector('.debuggerWrap-content');
    $content.append(P);
    $content.scrollTop = $content.scrollHeight;
  }
}
consoleDebug.init();
// window.onload = function(){
//   consoleDebug.init();
// }

