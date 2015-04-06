(function(a){"use strict";var b=this,c=b.SpeechRecognition||b.webkitSpeechRecognition||b.mozSpeechRecognition||b.msSpeechRecognition||b.oSpeechRecognition;if(!c)return b.annyang=null,a;var d,e,f=[],g={start:[],error:[],end:[],result:[],resultMatch:[],resultNoMatch:[],errorNetwork:[],errorPermissionBlocked:[],errorPermissionDenied:[]},h=0,i=!1,j="font-weight: bold; color: #00f;",k=!1,l=/\s*\((.*?)\)\s*/g,m=/(\(\?:[^)]+\))\?/g,n=/(\(\?)?:\w+/g,o=/\*\w+/g,p=/[\-{}\[\]+?.,\\\^$|#]/g,q=function(a){return a=a.replace(p,"\\$&").replace(l,"(?:$1)?").replace(n,function(a,b){return b?a:"([^\\s]+)"}).replace(o,"(.*?)").replace(m,"\\s*$1?\\s*"),new RegExp("^"+a+"$","i")},r=function(a){a.forEach(function(a){a.callback.apply(a.context)})},s=function(){t()||b.annyang.init({},!1)},t=function(){return d!==a};b.annyang={init:function(l,m){m=m===a?!0:!!m,d&&d.abort&&d.abort(),d=new c,d.maxAlternatives=5,d.continuous="http:"===b.location.protocol,d.lang="en-US",d.onstart=function(){r(g.start)},d.onerror=function(a){switch(r(g.error),a.error){case"network":r(g.errorNetwork);break;case"not-allowed":case"service-not-allowed":e=!1,r((new Date).getTime()-h<200?g.errorPermissionBlocked:g.errorPermissionDenied)}},d.onend=function(){if(r(g.end),e){var a=(new Date).getTime()-h;1e3>a?setTimeout(b.annyang.start,1e3-a):b.annyang.start()}},d.onresult=function(a){if(k)return i&&b.console.log("Speech heard, but annyang is paused"),!1;r(g.result);for(var c,d=a.results[a.resultIndex],e=0;e<d.length;e++){c=d[e].transcript.trim(),i&&b.console.log("Speech recognized: %c"+c,j);for(var h=0,l=f.length;l>h;h++){var m=f[h].command.exec(c);if(m){var n=m.slice(1);return i&&(b.console.log("command matched: %c"+f[h].originalPhrase,j),n.length&&b.console.log("with parameters",n)),f[h].callback.apply(this,n),r(g.resultMatch),!0}}}return r(g.resultNoMatch),!1},m&&(f=[]),l.length&&this.addCommands(l)},start:function(c){k=!1,s(),c=c||{},e=c.autoRestart!==a?!!c.autoRestart:!0,c.continuous!==a&&(d.continuous=!!c.continuous),h=(new Date).getTime();try{d.start()}catch(f){i&&b.console.log(f.message)}},abort:function(){e=!1,t&&d.abort()},pause:function(){k=!0},resume:function(){b.annyang.start()},debug:function(a){i=arguments.length>0?!!a:!0},setLanguage:function(a){s(),d.lang=a},addCommands:function(a){var c,d;s();for(var e in a)if(a.hasOwnProperty(e)){if(c=b[a[e]]||a[e],"function"!=typeof c)continue;d=q(e),f.push({command:d,callback:c,originalPhrase:e})}i&&b.console.log("Commands successfully loaded: %c"+f.length,j)},removeCommands:function(b){return b===a?void(f=[]):(b=Array.isArray(b)?b:[b],void(f=f.filter(function(a){for(var c=0;c<b.length;c++)if(b[c]===a.originalPhrase)return!1;return!0})))},addCallback:function(c,d,e){if(g[c]!==a){var f=b[d]||d;"function"==typeof f&&g[c].push({callback:f,context:e||this})}}}}).call(this);

annyang.addCallback('errorPermissionBlocked', function(){ checkConnectivity("denied"); });
annyang.addCallback('errorPermissionDenied', function(){ checkConnectivity("denied"); });
annyang.addCallback('errorNetwork', function(){ checkConnectivity("error"); });
annyang.addCallback('start', function(){ checkConnectivity("ok"); });

var enabledMicrophone = document.getElementById('enable-microphone');
var enabledHotwording = document.getElementById('enable-hotwording');

// check if annyang allowed
function checkConnectivity(status){
    enabledMicrophone.innerHTML = 'If you see the following message, please click on "Allow" to proceed.<br /><img src="img/allow-mic.png" /><br /><br />If you\'ve explicitly denied permission, please <span class="content-btn" id="mic-button">Enable microphone</span>';
    if(typeof status === "undefined"){
        annyang.start();
        annyang.abort();
    }
    else {        
        if(status == "ok") enabledMicrophone.innerHTML = '<span class="content-btn" id="mic-button">Disable microphone</span>';
        else if(status == "error") enabledMicrophone.innerHTML = "No current network connectivity. Please ensure you have an Internet connection to proceed";
        else enabledMicrophone.innerHTML = 'If you see the following message, please click on "Allow" to proceed.<br /><img src="img/allow-mic.png" /><br /><br />If you\'ve explicitly denied permission, please <span class="content-btn" id="mic-button">Enable microphone</span>';
    }   
}
checkConnectivity();

// event listener
document.body.addEventListener('click', function(e){
    if(e.target.id == "mic-button"){
        enabledMicrophone.innerHTML = '<span class="content-btn" id="mic-button-reconnect">Check connectivity</span>';
        e.target.id = "mic-button-reconnect";
        chrome.tabs.create({url: 'chrome://settings/contentExceptions#media-stream'});  
    }
    else if(e.target.id == "mic-button-reconnect"){
        checkConnectivity();
    }
});